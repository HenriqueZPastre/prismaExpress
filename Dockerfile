# Base image
FROM node:16-alpine

# Define working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci
#RUN npm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the application

ENTRYPOINT ["./entrypoint.sh"]
CMD [ "node", "./dist/app.js" ]

