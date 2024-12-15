# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
# Build the app (for production)
RUN npm run build

# Copy the application source
COPY . .

# Expose port
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main.js"]