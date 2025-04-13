'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useContractRead } from 'wagmi';
import { CEREBRA_NFT } from '@/lib/web3';
import { NFTCard } from '@/components/nft/NFTCard';
import { NFTMetadata } from '@/components/nft/NFTMetadata';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { formatAddress } from '@/lib/utils';

interface PageProps {
  params: {
    tokenId: string;
  };
}

export default function NFTPage({ params }: PageProps) {
  const { tokenId } = params;
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Read token URI
  const { data: tokenURI, isError: isTokenURIError } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });

  // Read owner
  const { data: owner, isError: isOwnerError } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });

  // Process NFT data from the blockchain
  useEffect(() => {
    if (isConnected && tokenURI && owner) {
      setIsLoading(true);
      
      try {
        // In a real application, you would fetch the metadata from the tokenURI
        // For now, we'll use placeholder data
        setImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop');
      } catch (error) {
        console.error('Error processing NFT data:', error);
        setError('Failed to load NFT data');
      } finally {
        setIsLoading(false);
      }
    } else if (isConnected && !isLoading) {
      // Check if there was an error reading from the blockchain
      if (isTokenURIError || isOwnerError) {
        setError('NFT not found or you don\'t have permission to view it');
        setIsLoading(false);
      }
    }
  }, [isConnected, tokenId, tokenURI, owner, isTokenURIError, isOwnerError]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">NFT Details</h1>
          <p className="text-gray-500 mb-6">Connect your wallet to view NFT details</p>
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/nft/collection"
            className="text-indigo-600 hover:text-indigo-700 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Collection
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="pt-4 border-t border-gray-200">
                <Skeleton className="h-6 w-1/4 mb-2" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        ) : !tokenURI || !owner ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 mb-2">NFT Not Found</h3>
            <p className="text-gray-500 mb-6">The NFT you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link
              href="/nft/collection"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Collection
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="NFT"
                  className="w-full h-full object-cover"
                />
              ) : (
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
              )}
            </div>
            <div className="p-6">
              <NFTMetadata tokenURI={tokenURI as string} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Token ID</h3>
                  <p className="text-gray-900">#{tokenId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Owner</h3>
                  <p className="text-gray-900">{formatAddress(owner as string)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 