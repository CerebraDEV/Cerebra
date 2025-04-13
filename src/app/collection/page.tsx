'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { CEREBRA_NFT } from '../../lib/web3';
import Link from 'next/link';
import { Skeleton } from '../../components/ui/skeleton';

export default function CollectionPage() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: balance } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  useEffect(() => {
    const fetchTokenIds = async () => {
      if (!address || !balance) return;
      
      setIsLoading(true);
      try {
        // In a real implementation, we would fetch all token IDs owned by the user
        // For now, we'll just create a dummy array based on the balance
        const ids = Array.from({ length: Number(balance) }, (_, i) => i);
        setTokenIds(ids);
      } catch (error) {
        console.error('Error fetching token IDs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenIds();
  }, [address, balance]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your NFT Collection</h1>
          <p className="text-gray-500 mb-6">Connect your wallet to view your NFTs</p>
          <button
            onClick={() => open()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your NFT Collection</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Skeleton className="w-full aspect-square" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : tokenIds.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No NFTs Found</h2>
          <p className="text-gray-500 mb-6">You don&apos;t own any NFTs yet.</p>
          <Link
            href="/mint"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Mint Your First NFT
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tokenIds.map((tokenId) => (
            <Link
              key={tokenId}
              href={`/nft/${tokenId}`}
              className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100">
                {/* In a real implementation, we would fetch and display the NFT image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  NFT #{tokenId}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">NFT #{tokenId}</h3>
                <p className="text-sm text-gray-500">View details</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 