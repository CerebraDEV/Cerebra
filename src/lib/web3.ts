'use client';

import React from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, sepolia } from '@wagmi/chains'
import type { Chain } from '@wagmi/chains'
import type { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import type { Config } from 'wagmi'
import { QueryClient } from '@tanstack/react-query'

// Configure chains
const chains: [Chain, ...Chain[]] = [mainnet, sepolia]

// Create query client
const queryClient = new QueryClient()

// Create wagmi config
const config = defaultWagmiConfig({
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  metadata: {
    name: 'CEREBRA',
    description: 'Decentralized AI Training Platform',
    url: 'https://cerebra.ai',
    icons: ['/images/logo.svg'],
  },
}) as Config

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Inter, sans-serif',
    '--w3m-accent': '#6366f1',
  },
})

// Web3Provider component
interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return React.createElement(WagmiConfig, { config }, children);
}

// Contract ABIs
export const CEREBRA_NFT_ABI = [
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPlatformFee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'memoryHash', type: 'string' },
      { name: 'transformationHash', type: 'string' },
      { name: 'tokenURI', type: 'string' },
      { name: 'royaltyPercentage', type: 'uint256' }
    ],
    name: 'mintNFT',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// Contract configurations
export const CEREBRA_NFT = {
  address: process.env.NEXT_PUBLIC_CEREBRA_NFT_ADDRESS as `0x${string}`,
  abi: CEREBRA_NFT_ABI,
} as const;

export const CEREBRA_TOKEN = {
  address: process.env.NEXT_PUBLIC_CEREBRA_TOKEN_ADDRESS as `0x${string}`,
  abi: [
    {
      inputs: [{ name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const,
} as const;