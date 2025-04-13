import { useAccount, useConnect } from 'wagmi';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  if (isConnected && address) {
    return (
      <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
        Connected to {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    );
  }

  return (
    <button
      onClick={() => connect()}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
} 