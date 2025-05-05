# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port (5000)
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
