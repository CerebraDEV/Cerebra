# CEREBRA Project Setup Script
Write-Host "Starting CEREBRA project setup..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed. Please install Node.js 18+ and try again." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm is not installed. Please install npm and try again." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is installed
try {
    $psqlVersion = psql --version
    Write-Host "PostgreSQL version: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "PostgreSQL is not installed. Please install PostgreSQL and try again." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Create .env file from example
Write-Host "Creating .env file..." -ForegroundColor Yellow
Copy-Item -Path .env.example -Destination .env -Force

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

# Start the development server
Write-Host "Starting the development server..." -ForegroundColor Green
Write-Host "CEREBRA is now running at http://localhost:3000" -ForegroundColor Cyan
npm run dev 