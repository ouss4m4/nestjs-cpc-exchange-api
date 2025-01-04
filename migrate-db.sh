#!/bin/sh

# Wait for the database to be ready
until nc -z dbsql 3306; do
  echo "Waiting for the database connection..."
  sleep 2
done

# Run your seed script
# npm run build
npm run migration:generate
npm run migration:run
# node dist/db/seed-data/countrySeeder.js
# Start the app
npm run start:prod
