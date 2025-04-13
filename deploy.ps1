# CEREBRA Deployment Script
Write-Host "Starting CEREBRA deployment process..." -ForegroundColor Green

# 1. Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
npm install @web3modal/wagmi @web3modal/ethereum wagmi viem @wagmi/chains
npm install @nomicfoundation/hardhat-toolbox dotenv

# 2. Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=your_token_contract_address
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
"@ | Out-File -FilePath .env -Encoding UTF8
    Write-Host "Please update the .env file with your actual values" -ForegroundColor Red
}

# 3. Compile smart contracts
Write-Host "Compiling smart contracts..." -ForegroundColor Yellow
npx hardhat compile

# 4. Deploy contracts (if on testnet)
Write-Host "Deploying contracts to Sepolia testnet..." -ForegroundColor Yellow
npx hardhat run scripts/deploy.js --network sepolia

# 5. Build the Next.js application
Write-Host "Building Next.js application..." -ForegroundColor Yellow
npm run build

# 6. Start the development server
Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev

Write-Host "Deployment process completed!" -ForegroundColor Green
Write-Host "Please check the console for any errors and update the .env file with the deployed contract addresses." -ForegroundColor Yellow 