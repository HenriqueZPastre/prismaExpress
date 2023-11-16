#!/bin/sh

# Run database migration
npm run migrate

# Start your Node.js application
exec node ./dist/app.js