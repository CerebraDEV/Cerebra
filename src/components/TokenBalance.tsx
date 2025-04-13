import { useState, ChangeEvent } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { CEREBRA_TOKEN_ABI } from '../lib/web3';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

export function TokenBalance() {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const { data: balance, isLoading: isLoadingBalance } = useContractRead({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: CEREBRA_TOKEN_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  const { write: transfer, data: transferData } = useContractWrite({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: CEREBRA_TOKEN_ABI,
    functionName: 'transfer',
  });

  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: transferData?.hash,
  });

  const handleTransfer = () => {
    if (!recipient || !amount) return;
    transfer({
      args: [recipient as `0x${string}`, BigInt(amount)],
    });
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  if (!address) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please connect your wallet to view your balance</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Your Balance</h2>
        {isLoadingBalance ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <p className="text-2xl font-bold">
            {balance ? Number(balance) / 1e18 : 0} CEREBRA
          </p>
        )}
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Transfer Tokens</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
              Recipient Address
            </label>
            <Input
              id="recipient"
              type="text"
              value={recipient}
              onChange={handleRecipientChange}
              placeholder="0x..."
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.0"
              className="mt-1"
            />
          </div>
          <Button
            onClick={handleTransfer}
            disabled={!recipient || !amount || isConfirming}
            className="w-full"
          >
            {isConfirming ? 'Confirming...' : 'Transfer'}
          </Button>
        </div>
      </div>
    </div>
  );
} 