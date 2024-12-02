# Use Node.js official image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the frontend development server port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
