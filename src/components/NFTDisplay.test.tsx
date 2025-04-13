import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NFTDisplay } from './NFTDisplay';

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: () => ({
    address: '0x123...abc',
  }),
  useContractRead: () => ({
    data: 'ipfs://QmExample',
  }),
}));

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      image: 'https://example.com/image.jpg',
    }),
  })
) as any;

describe('NFTDisplay', () => {
  it('renders loading state initially', () => {
    render(<NFTDisplay tokenId={1} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders NFT information after loading', async () => {
    render(<NFTDisplay tokenId={1} />);
    // Wait for loading to complete
    await screen.findByAltText('NFT #1');
    expect(screen.getByText('NFT #1')).toBeInTheDocument();
  });
}); 