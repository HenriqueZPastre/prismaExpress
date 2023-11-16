# Base image
FROM node:16-alpine

# Define working directory
WORKDIR /app

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" 
# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY package.json package-lock.json ./
# Install dependencies
ENV DATABASE_URL=$DATABASE_URL
RUN npm ci
#RUN npm install --frozen-lockfile
ENV NODE_ENV=teste


# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "node", "./dist/app.js" ]

