# Use the official Node.js 23 Alpine image
FROM node:23-alpine3.20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Set environment variables
ENV PORT 5173

# Run the web service on container startup.
CMD [ "npm", "run", "dev" ]
