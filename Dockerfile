# Use Node.js base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code to the container
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to run in dev and prod
CMD ["npm", "run", "start:dev"]  