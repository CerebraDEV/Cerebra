'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

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
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.svg"
                    alt="CEREBRA"
                    width={40}
                    height={40}
                    className="w-10 h-10 drop-shadow-lg"
                    priority
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00B4DB] via-[#9933FF] to-[#9966FF] bg-clip-text text-transparent">
                  CEREBRA
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.path)
                      ? 'border-purple-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isConnected ? (
              <button
                onClick={() => open()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#00B4DB] via-[#9933FF] to-[#9966FF] hover:from-[#00A3C4] hover:via-[#8822EE] hover:to-[#8855EE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Connected
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#00B4DB] via-[#9933FF] to-[#9966FF] hover:from-[#00A3C4] hover:via-[#8822EE] hover:to-[#8855EE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
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
            {isConnected ? (
              <button
                onClick={() => open()}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#00B4DB] via-[#9933FF] to-[#9966FF] hover:from-[#00A3C4] hover:via-[#8822EE] hover:to-[#8855EE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Connected
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#00B4DB] via-[#9933FF] to-[#9966FF] hover:from-[#00A3C4] hover:via-[#8822EE] hover:to-[#8855EE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 