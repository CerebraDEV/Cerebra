import { useState } from 'react';
import { formatAddress } from '@/lib/utils';

interface NFTCardProps {
  name: string;
  description: string;
  imageUrl: string;
  attributes?: Record<string, any>;
  owner?: string;
  tokenId?: string;
  className?: string;
}

export function NFTCard({
  name,
  description,
  imageUrl,
  attributes,
  owner,
  tokenId,
  className = '',
}: NFTCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="aspect-square relative bg-gray-100">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
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
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        
        {attributes && Object.keys(attributes).length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Attributes</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-md p-2">
                  <p className="text-xs font-medium text-gray-500">{key}</p>
                  <p className="text-sm text-gray-900">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {owner && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Owner</p>
            <p className="text-sm font-medium text-gray-900">{formatAddress(owner)}</p>
          </div>
        )}
        
        {tokenId && (
          <div className="mt-1">
            <p className="text-xs text-gray-500">Token ID</p>
            <p className="text-sm font-medium text-gray-900">#{tokenId}</p>
          </div>
        )}
      </div>
    </div>
  );
} 