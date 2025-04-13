#!/bin/bash

# CEREBRA Project Setup Script
echo "Starting CEREBRA project setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL and try again."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file from example
echo "Creating .env file..."
cp .env.example .env

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

# Build the project
echo "Building the project..."
npm run build

# Start the development server
echo "Starting the development server..."
echo "CEREBRA is now running at http://localhost:3000"
npm run dev 