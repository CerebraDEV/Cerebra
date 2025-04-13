'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">CEREBRA</h3>
            <p className="text-gray-400 text-sm">
              Decentralized AI training platform powered by blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nft/collection" className="text-gray-400 hover:text-white text-sm">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/mint" className="text-gray-400 hover:text-white text-sm">
                  Mint
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cerebra.work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/CerebraDEV/Cerebra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/cerebra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} CEREBRA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 