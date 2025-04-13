'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useNFT } from '@/hooks/useNFT';
import { NFTCard } from '@/components/nft/NFTCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function CollectionPage() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { userNFTs, isLoadingNFTs, balanceOf } = useNFT();
  const [nftData, setNftData] = useState<Array<{
    tokenId: string;
    tokenURI: string;
    owner: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Process NFT data from the blockchain
  useEffect(() => {
    if (isConnected && address && userNFTs.length > 0) {
      setIsLoading(true);
      
      // Use the NFTs from the blockchain
      setNftData(userNFTs);
      setIsLoading(false);
    } else if (isConnected && address && !isLoadingNFTs) {
      // No NFTs found
      setNftData([]);
      setIsLoading(false);
    }
  }, [isConnected, address, userNFTs, isLoadingNFTs]);

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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your NFT Collection</h1>
          <Link
            href="/mint"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Mint New NFT
          </Link>
        </div>

        {isLoading || isLoadingNFTs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        ) : nftData.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No NFTs Found</h3>
            <p className="text-gray-500 mb-6">You don't have any NFTs in your collection yet.</p>
            <Link
              href="/mint"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Mint Your First NFT
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftData.map((nft) => (
              <Link key={nft.tokenId} href={`/nft/${nft.tokenId}`}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square relative bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">Cerebra Memory #{nft.tokenId}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">A digital memory stored on the blockchain</p>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Token ID</p>
                      <p className="text-sm font-medium text-gray-900">#{nft.tokenId}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 