import { render, screen } from '@testing-library/react';
import { NFTList } from '../NFTList';
import { useContractRead } from 'wagmi';
import { NFTDisplay } from '../NFTDisplay';

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useContractRead: jest.fn(),
}));

// Mock NFTDisplay component
jest.mock('../NFTDisplay', () => ({
  NFTDisplay: jest.fn(() => <div data-testid="mock-nft-display" />),
}));

describe('NFTList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    (useContractRead as jest.Mock).mockReturnValue({ data: undefined });
    render(<NFTList />);
    
    // Should show 3 loading skeletons
    const loadingSkeletons = screen.getAllByTestId('mock-nft-display');
    expect(loadingSkeletons).toHaveLength(3);
  });

  it('should show NFTs when totalSupply is available', () => {
    (useContractRead as jest.Mock).mockReturnValue({ data: BigInt(5) });
    render(<NFTList />);
    
    // Should render 5 NFT displays
    const nftDisplays = screen.getAllByTestId('mock-nft-display');
    expect(nftDisplays).toHaveLength(5);
  });

  it('should show empty state when no NFTs exist', () => {
    (useContractRead as jest.Mock).mockReturnValue({ data: BigInt(0) });
    render(<NFTList />);
    
    expect(screen.getByText('No NFTs found')).toBeInTheDocument();
  });
}); 