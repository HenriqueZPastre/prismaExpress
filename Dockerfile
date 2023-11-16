# Base image
FROM node:16-alpine

# Define working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json package-lock.json ./
# Install dependencies
ENV NODE_ENV=teste

RUN npm ci
#RUN npm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .
COPY ./prisma prisma
# Build the TypeScript code
RUN npm run build
RUN npx prisma generate

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "node", "./dist/app.js" ]

