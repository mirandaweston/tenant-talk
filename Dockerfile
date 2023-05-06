# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json files for the API
COPY api/package*.json ./api/

# Install API dependencies
RUN cd api && npm install

# Copy the rest of the API code
COPY api ./api

# Copy the app package and package-lock.json files for the frontend
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the frontend source code
COPY frontend/src ./frontend/src

# Copy the public directory from API to frontend
COPY api/public ./frontend/public

# Set the working directory to the frontend directory
WORKDIR /app/frontend

# Build the frontend application without running linting
RUN npm run build

# Expose the port on which your Vue.js application runs
EXPOSE 8080

# Define the command to start the Vue.js application
CMD ["npm", "run", "serve"]
