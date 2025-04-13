'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Provider } from '@/lib/web3'
import { Navigation } from '@/components/ui/Navigation'
import { Footer } from '@/components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEREBRA - Transform Your Memories into Sci-Fi Experiences',
  description: 'Transform your personal memories into immersive sci-fi experiences using cutting-edge AI and blockchain technology.',
  keywords: 'CEREBRA, AI, blockchain, NFT, sci-fi, memories, transformation',
  authors: [{ name: 'CEREBRA' }],
  creator: 'CEREBRA',
  publisher: 'CEREBRA',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.cerebra.work',
    title: 'CEREBRA - Transform Your Memories into Sci-Fi Experiences',
    description: 'Transform your personal memories into immersive sci-fi experiences using cutting-edge AI and blockchain technology.',
    siteName: 'CEREBRA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEREBRA - Transform Your Memories into Sci-Fi Experiences',
    description: 'Transform your personal memories into immersive sci-fi experiences using cutting-edge AI and blockchain technology.',
    creator: '@Cerebra_X',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  )
} 