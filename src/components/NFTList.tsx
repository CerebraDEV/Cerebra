import { useContractRead } from 'wagmi';
import { CEREBRA_NFT } from '@/lib/web3';
import { NFTDisplay } from './NFTDisplay';
import { Skeleton } from './ui/skeleton';
import { cn } from '../lib/utils';

interface NFTListProps {
  tokenIds: number[];
  className?: string;
}

export function NFTList({ tokenIds, className }: NFTListProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {tokenIds.map((tokenId) => (
        <NFTDisplay key={tokenId} tokenId={tokenId} />
      ))}
    </div>
  );
}

// Loading state component
export function NFTListSkeleton({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
} 