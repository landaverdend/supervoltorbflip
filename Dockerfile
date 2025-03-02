# Use Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and serve package
RUN npm install && npm install -g serve

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3002

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3002"]