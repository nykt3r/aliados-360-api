#!/bin/sh

echo "Running migrations..."
npm run migrate:up

echo "Running seeds..."
npm run seed:partners

echo "Starting API..."
npm run start