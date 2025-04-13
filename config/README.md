# Configuration

This directory contains configuration files for the CEREBRA platform.

## Configuration Files

- `hardhat.config.js` - Hardhat configuration for smart contract development
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Environment Variables

The platform uses various environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cerebra"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Blockchain
NEXT_PUBLIC_CONTRACT_ADDRESS="your-contract-address"
NEXT_PUBLIC_ALCHEMY_API_KEY="your-alchemy-api-key"

# Storage
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="your-aws-region"
AWS_BUCKET_NAME="your-bucket-name"
```

## Configuration Guidelines

1. **Environment-Specific Config**
   - Use `.env` files for environment variables
   - Keep sensitive data out of version control
   - Use different configs for development/production

2. **Security**
   - Never commit sensitive data
   - Use environment variables for secrets
   - Implement proper access controls

3. **Maintenance**
   - Keep dependencies updated
   - Document configuration changes
   - Follow semantic versioning

## Usage

1. **Development Setup**
   ```bash
   # Copy example environment file
   cp .env.example .env

   # Update environment variables
   nano .env
   ```

2. **Build Configuration**
   ```bash
   # Build with development config
   npm run dev

   # Build with production config
   npm run build
   ```

3. **Configuration Validation**
   ```bash
   # Validate TypeScript config
   npm run type-check

   # Lint configuration
   npm run lint
   ``` 