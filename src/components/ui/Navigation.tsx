'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { ConnectButton } from '@/components/ConnectButton';

export function Navigation() {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Mint NFT', path: '/mint' },
    { name: 'Collection', path: '/nft/collection' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src="/images/logo.svg"
                  alt="CEREBRA"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">CEREBRA</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/nft/collection"
              className={`text-sm font-medium ${
                isActive('/nft/collection')
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Collection
            </Link>
            <Link
              href="/mint"
              className={`text-sm font-medium ${
                isActive('/mint')
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Mint
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                isActive('/about')
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive(item.path)
                  ? 'bg-purple-50 border-purple-500 text-purple-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
} 