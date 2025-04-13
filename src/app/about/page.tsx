'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About CEREBRA</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              CEREBRA is revolutionizing the way AI models are trained and shared. We believe in creating a decentralized ecosystem where AI developers can contribute their models, earn rewards, and collaborate in a transparent and fair manner.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">AI Model Training</h3>
                <p className="text-gray-300">
                  We provide a platform for training AI models using decentralized computing resources, ensuring privacy and security.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">NFT Marketplace</h3>
                <p className="text-gray-300">
                  Our NFT marketplace allows developers to tokenize and trade their AI models, creating a new asset class.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Community Governance</h3>
                <p className="text-gray-300">
                  Token holders participate in platform governance, ensuring community-driven development.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Rewards System</h3>
                <p className="text-gray-300">
                  Contributors earn rewards through our token economy, incentivizing participation and innovation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-gray-300">Next.js</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔷</div>
                <p className="text-gray-300">Ethereum</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-gray-300">AI/ML</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <p className="text-gray-300">Web3</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We're building the future of decentralized AI. Join us in this journey to revolutionize how AI models are created, shared, and monetized.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/CerebraDEV"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://discord.gg/cerebra"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Discord
              </a>
              <a
                href="https://twitter.com/CerebraAI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Twitter
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
} 