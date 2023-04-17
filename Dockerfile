# Base image
FROM node:14-alpine

# Define working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN yarn migrate
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "./dist/app.js"]