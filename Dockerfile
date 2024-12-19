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

# Stage 2: Production
FROM node:18-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install 
# --only=production

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

COPY migrate-db.sh /usr/src/app/migrate-db.sh
RUN chmod +x /usr/src/app/migrate-db.sh

# Set entrypoint to the migrate-db.sh script
ENTRYPOINT ["/usr/src/app/migrate-db.sh"]
