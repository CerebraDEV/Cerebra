# Smart Contracts

This directory contains the smart contracts for the CEREBRA platform.

## Contracts

- `CerebraNFT.sol` - Main NFT contract for memory tokenization
- `CerebraMarket.sol` - NFT marketplace contract
- `CerebraToken.sol` - Platform utility token contract

## Development

1. **Prerequisites**
   - Hardhat
   - OpenZeppelin contracts
   - Ethers.js

2. **Testing**
   ```bash
   npx hardhat test
   ```

3. **Deployment**
   ```bash
   npx hardhat run scripts/deploy/deploy.ts --network [network]
   ```

## Security

- All contracts are audited by [Security Firm]
- Follow best practices for smart contract development
- Implement access control and security measures

## Contract Addresses

### Mainnet
- CerebraNFT: `[address]`
- CerebraMarket: `[address]`
- CerebraToken: `[address]`

### Testnet (Sepolia)
- CerebraNFT: `[address]`
- CerebraMarket: `[address]`
- CerebraToken: `[address]`

## Documentation

For detailed contract documentation, see `/docs/api/contracts/` 