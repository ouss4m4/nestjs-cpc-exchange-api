# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy the application source
COPY . .

# Build the app
RUN npm run build
RUN npm run migration:run
# Stage 2: Production
FROM node:18-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]