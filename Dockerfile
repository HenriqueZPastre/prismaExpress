# Base image
FROM node:16-alpine

# Define working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json package-lock.json ./
# Install dependencies

RUN npm ci
#RUN npm install --frozen-lockfile
ENV NODE_ENV=teste


# Copy the rest of the application code to the working directory
COPY . .

COPY entry.sh /
RUN chmod 777 /entry.sh

# Build the TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application

COPY        docker-entrypoint.sh /
ENTRYPOINT  ["/docker-entrypoint.sh"]

