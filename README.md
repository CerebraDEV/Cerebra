# CEREBRA

<div align="center">
  <img src="https://raw.githubusercontent.com/CerebraDEV/Cerebra/main/public/logo.svg" alt="CEREBRA" width="200" height="200" />
  <h1>CEREBRA</h1>
  <p>Transform your memories into extraordinary sci-fi experiences</p>
  <p>
    <a href="https://www.cerebra.work" target="_blank">
      <img src="https://img.shields.io/badge/website-cerebra.work-blue?style=flat-square" alt="Website" />
    </a>
    <a href="https://x.com/Cerebra_X" target="_blank">
      <img src="https://img.shields.io/badge/twitter-@Cerebra__X-1D9BF0?style=flat-square&logo=twitter" alt="Twitter" />
    </a>
    <a href="https://github.com/CerebraDEV/Cerebra/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-Proprietary-red?style=flat-square" alt="License" />
    </a>
  </p>
</div>

Transform your personal memories into immersive sci-fi experiences using cutting-edge AI and blockchain technology.

## Project Structure

```
cerebra/
├── src/                      # Source code
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   └── ...            # Other pages
│   ├── components/         # React components
│   │   ├── nft/           # NFT-related components
│   │   └── ui/            # UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── test/              # Test files
├── public/                 # Static files
│   ├── assets/            # Static assets
│   │   ├── images/        # Image files
│   │   └── fonts/         # Font files
│   └── logo.svg           # CEREBRA logo
├── contracts/             # Smart contracts
│   ├── CerebraNFT.sol     # NFT contract
│   └── test/             # Contract tests
├── scripts/               # Scripts
│   ├── setup/            # Setup scripts
│   ├── deploy/           # Deployment scripts
│   └── test/            # Test scripts
├── docs/                 # Documentation
│   ├── api/             # API documentation
│   └── guides/          # User guides
├── prisma/               # Database schema
└── config/              # Configuration files
    ├── hardhat.config.js # Hardhat config
    ├── tailwind.config.js # Tailwind config
    └── tsconfig.json    # TypeScript config
```

## Vision

CEREBRA is more than a platform - it's a gateway to transform your personal memories into extraordinary sci-fi narratives. Every memory holds an undiscovered sci-fi world, and CEREBRA opens the door to that universe.

## Core Features

- **AI-Powered Memory Analysis**: 
  - Advanced AI models for identifying key elements and emotional tones in memory fragments
  - Sophisticated sci-fi element injection algorithms
  - Memory coherence engine for connecting fragments into complete narratives

- **Multimedia Generation System**:
  - Integrated text, image, and video generation
  - Emotion-based visual style matching
  - Dedicated sci-fi world-building maintenance

- **Blockchain Integration**:
  - On-chain verification of original memories and sci-fi transformations
  - NFT-based memory artwork protection
  - Distributed storage for permanent preservation

- **Privacy-First Design**:
  - Multi-layer encryption for sensitive content
  - Granular privacy controls
  - Ethical review mechanisms

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma, PostgreSQL
- **AI/ML**: OpenAI API, Custom AI Models
- **Blockchain**: Ethereum, IPFS
- **Authentication**: NextAuth.js
- **Storage**: AWS S3, IPFS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key
- Ethereum wallet (for Web3 features)
- OAuth credentials (Google, GitHub)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:CerebraDEV/Cerebra.git
   cd cerebra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/cerebra"
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # Blockchain
   NEXT_PUBLIC_CONTRACT_ADDRESS="your-contract-address"
   NEXT_PUBLIC_ALCHEMY_API_KEY="your-alchemy-api-key"
   
   # Storage
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="your-aws-region"
   AWS_BUCKET_NAME="your-bucket-name"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Code Style
- ESLint and Prettier are configured for consistent code formatting
- TypeScript for type safety
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

### Testing
- Jest and React Testing Library for testing
- Run tests with `npm test`
- Run tests in watch mode with `npm test:watch`

### Database
- Prisma for type-safe database access
- Run migrations with `npx prisma migrate dev`
- Generate Prisma client with `npx prisma generate`

### AI Integration
- OpenAI API with custom prompts
- Configure AI models in `src/lib/ai.ts`
- Test AI features with `npm run test:ai`

### Blockchain
- Web3.js for Ethereum integration
- Configure blockchain settings in `src/lib/web3.ts`
- Test blockchain features with `npm run test:web3`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Links

- Website: https://www.cerebra.work
- Twitter: https://x.com/Cerebra_X
- GitHub: https://github.com/CerebraDEV/Cerebra

## Roadmap

### Phase 1: Memory Sci-fi Foundation (2024 Q2-Q3)
- Token fair launch
- Single memory fragment transformation
- Basic image and text conversion
- Initial sci-fi style library

### Phase 2: Multimedia Expansion (2024 Q4-2025 Q1)
- Video memory transformation
- Multi-memory narrative system
- Personal sci-fi universe builder

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/CerebraDEV/Cerebra/blob/main/LICENSE) file for details.

## Contact

For any inquiries about the CEREBRA project, please visit our website at https://www.cerebra.work 