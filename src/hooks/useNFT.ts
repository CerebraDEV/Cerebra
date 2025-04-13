import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { CEREBRA_NFT } from '@/lib/web3';
import { useState, useEffect } from 'react';
import { parseEther } from 'viem';

export function useNFT() {
  const { address } = useAccount();
  const [mintAmount, setMintAmount] = useState('1');
  const [isMinting, setIsMinting] = useState(false);
  const [userNFTs, setUserNFTs] = useState<Array<{
    tokenId: string;
    tokenURI: string;
    owner: string;
  }>>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);

  // Read platform fee
  const { data: platformFee } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'getPlatformFee',
  }) as { data: bigint | undefined };

  // Read balance of
  const { data: balanceOf } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  }) as { data: bigint | undefined };

  // Mint function
  const { data: mintData, write: mint } = useContractWrite({
    ...CEREBRA_NFT,
    functionName: 'mintNFT',
  });

  // Wait for mint transaction
  const { isLoading: isMintLoading } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  // Handle mint
  const handleMint = async () => {
    if (!mint || !platformFee) return;
    
    try {
      setIsMinting(true);
      const amount = BigInt(mintAmount);
      const value = (platformFee * amount) / BigInt(10000); // Convert basis points to actual value
      
      await mint({
        args: ['', '', '', BigInt(0)], // Empty strings for memoryHash and transformationHash, 0 for royalty
        value,
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsMinting(false);
    }
  };

  // Read token URI
  const { data: tokenURI } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'tokenURI',
    args: [BigInt(0)], // First token
  });

  // Fetch user's NFTs
  const fetchUserNFTs = async () => {
    if (!address || !balanceOf) return;
    
    setIsLoadingNFTs(true);
    try {
      // In a real application, you would use events or a subgraph to get all tokens
      // For now, we'll use a simple approach to get tokens by index
      const nfts = [];
      const balance = Number(balanceOf);
      
      for (let i = 0; i < balance; i++) {
        // This is a simplified approach - in a real app you'd use tokenOfOwnerByIndex
        // or events to get the actual token IDs
        const tokenId = i.toString();
        
        // For now, we'll use mock data since we can't dynamically call contract methods in this way
        // In a real application, you would use a subgraph or events to get all tokens
        nfts.push({
          tokenId,
          tokenURI: `https://example.com/token/${tokenId}`,
          owner: address,
        });
      }
      
      setUserNFTs(nfts);
    } catch (error) {
      console.error('Error fetching user NFTs:', error);
    } finally {
      setIsLoadingNFTs(false);
    }
  };

  // Fetch NFTs when address or balance changes
  useEffect(() => {
    if (address && balanceOf) {
      fetchUserNFTs();
    }
  }, [address, balanceOf]);

  return {
    platformFee,
    balanceOf,
    tokenURI,
    mintAmount,
    setMintAmount,
    isMinting: isMinting || isMintLoading,
    handleMint,
    canMint: !!mint && !!platformFee,
    userNFTs,
    isLoadingNFTs,
    fetchUserNFTs,
  };
} 