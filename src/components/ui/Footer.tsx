import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/nft/collection" className="text-gray-400 hover:text-gray-500">
            Collection
          </Link>
          <Link href="/mint" className="text-gray-400 hover:text-gray-500">
            Mint
          </Link>
          <a href="https://www.cerebra.work" className="text-gray-400 hover:text-gray-500">
            About
          </a>
          <a href="https://www.cerebra.work/terms" className="text-gray-400 hover:text-gray-500">
            Terms
          </a>
          <a href="https://www.cerebra.work/privacy" className="text-gray-400 hover:text-gray-500">
            Privacy
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} CEREBRA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 