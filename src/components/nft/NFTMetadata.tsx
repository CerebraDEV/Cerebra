import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface NFTMetadataProps {
  tokenURI: string;
  className?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Record<string, any>;
}

export function NFTMetadata({ tokenURI, className = '' }: NFTMetadataProps) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenURI) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let data: NFTMetadata;

        // Handle data URLs
        if (tokenURI.startsWith('data:')) {
          const base64Data = tokenURI.split(',')[1];
          const jsonString = atob(base64Data);
          data = JSON.parse(jsonString);
        } 
        // Handle HTTP URLs
        else if (tokenURI.startsWith('http')) {
          const response = await fetch(tokenURI);
          if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.statusText}`);
          }
          data = await response.json();
        } 
        // Handle IPFS URLs
        else if (tokenURI.startsWith('ipfs://')) {
          const ipfsHash = tokenURI.replace('ipfs://', '');
          const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
          const response = await fetch(ipfsUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch IPFS metadata: ${response.statusText}`);
          }
          data = await response.json();
        } 
        // Handle other formats
        else {
          throw new Error('Unsupported token URI format');
        }

        setMetadata(data);
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        setError('Failed to load NFT metadata');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenURI]);

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
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
    );
  }

  if (error || !metadata) {
    return (
      <div className={`bg-red-50 p-4 rounded-lg ${className}`}>
        <p className="text-red-800">{error || 'Failed to load NFT metadata'}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-2xl font-bold text-gray-900">{metadata.name}</h1>
      <p className="text-gray-500">{metadata.description}</p>
      
      {metadata.attributes && Object.keys(metadata.attributes).length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attributes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(metadata.attributes).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{key}</h4>
                <p className="mt-1 text-sm text-gray-900 break-all">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 