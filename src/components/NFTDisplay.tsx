import { useContractRead } from 'wagmi';
import { CEREBRA_NFT } from '@/lib/web3';
import { Skeleton } from './ui/skeleton';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface NFTDisplayProps {
  tokenId: number;
  className?: string;
}

export function NFTDisplay({ tokenId, className }: NFTDisplayProps) {
  const { data: tokenURI, isLoading: isLoadingURI } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  }) as { data: string | undefined, isLoading: boolean };

  const { data: owner, isLoading: isLoadingOwner } = useContractRead({
    ...CEREBRA_NFT,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  }) as { data: `0x${string}` | undefined, isLoading: boolean };

  const isLoading = isLoadingURI || isLoadingOwner;

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={tokenURI || '/placeholder.png'}
          alt={`NFT #${tokenId}`}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">NFT #{tokenId}</h3>
        <p className="text-sm text-gray-500">
          Owner: {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : 'Unknown'}
        </p>
      </div>
    </div>
  );
} 