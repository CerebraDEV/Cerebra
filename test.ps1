# CEREBRA Test Script
Write-Host "Starting CEREBRA test process..." -ForegroundColor Green

# 1. Run Hardhat tests
Write-Host "Running smart contract tests..." -ForegroundColor Yellow
npx hardhat test

# 2. Run Next.js tests
Write-Host "Running frontend tests..." -ForegroundColor Yellow
npm test

# 3. Run linting
Write-Host "Running linting..." -ForegroundColor Yellow
npm run lint

# 4. Run type checking
Write-Host "Running type checking..." -ForegroundColor Yellow
npm run type-check

# 5. Run all tests with coverage
Write-Host "Running all tests with coverage..." -ForegroundColor Yellow
npm run test:coverage

Write-Host "Test process completed!" -ForegroundColor Green
Write-Host "Please check the console for any test failures or errors." -ForegroundColor Yellow 