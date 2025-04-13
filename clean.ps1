# CEREBRA Clean Script
Write-Host "Starting CEREBRA clean process..." -ForegroundColor Green

# 1. Remove node_modules
Write-Host "Removing node_modules..." -ForegroundColor Yellow
if (Test-Path node_modules) {
    Remove-Item -Recurse -Force node_modules
}

# 2. Remove .next directory
Write-Host "Removing .next directory..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
}

# 3. Remove cache directories
Write-Host "Removing cache directories..." -ForegroundColor Yellow
if (Test-Path .hardhat) {
    Remove-Item -Recurse -Force .hardhat
}
if (Test-Path cache) {
    Remove-Item -Recurse -Force cache
}

# 4. Remove package-lock.json
Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json
}

# 5. Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Clean process completed!" -ForegroundColor Green
Write-Host "You can now run deploy.ps1 to start fresh." -ForegroundColor Yellow 