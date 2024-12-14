# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source
COPY . .

# Build the app (for production)
RUN npm run build

# Check if build output is correct
RUN ls -l dist/

# Stage 2: Production runtime
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm install 

# Copy built app from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3001

# Command to run the app
CMD ["node", "dist/main.js"]