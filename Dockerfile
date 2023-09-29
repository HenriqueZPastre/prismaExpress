# Base image
FROM node:18-alpine

# Define working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
#RUN npm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run migrate
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "./dist/app.js"]