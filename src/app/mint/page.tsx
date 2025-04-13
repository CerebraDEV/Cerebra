'use client';

import { useState, useRef } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { CEREBRA_NFT } from '@/lib/web3';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { parseEther } from 'viem';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { generateHash, isValidHash, fileToDataURL, generateTokenURI, isValidTokenURI } from '@/lib/utils';
import { MintingSteps } from '@/components/nft/MintingSteps';

export default function MintPage() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    memoryHash: '',
    transformationHash: '',
    tokenURI: '',
    royaltyPercentage: '0',
  });
  const [memoryInput, setMemoryInput] = useState('');
  const [transformationInput, setTransformationInput] = useState('');
  const [nftMetadata, setNftMetadata] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSteps, setShowSteps] = useState(false);

  const { write, data: hash } = useContractWrite({
    ...CEREBRA_NFT,
    functionName: 'mintNFT',
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: hash?.hash,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'memoryHash' || name === 'transformationHash' || name === 'tokenURI' || name === 'royaltyPercentage') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNftMetadata(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGenerateMemoryHash = () => {
    if (!memoryInput) {
      setError('Please enter memory content');
      return;
    }
    const hash = generateHash(memoryInput);
    setFormData(prev => ({
      ...prev,
      memoryHash: hash,
    }));
  };

  const handleGenerateTransformationHash = () => {
    if (!transformationInput) {
      setError('Please enter transformation content');
      return;
    }
    const hash = generateHash(transformationInput);
    setFormData(prev => ({
      ...prev,
      transformationHash: hash,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const dataUrl = await fileToDataURL(file);
      setPreviewImage(dataUrl);
      setNftMetadata(prev => ({
        ...prev,
        imageUrl: dataUrl,
      }));
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Failed to process the image file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTokenURI = () => {
    if (!nftMetadata.name || !nftMetadata.description || !nftMetadata.imageUrl) {
      setError('Please fill in all NFT metadata fields');
      return;
    }

    const attributes = {
      memoryHash: formData.memoryHash,
      transformationHash: formData.transformationHash,
      royaltyPercentage: parseInt(formData.royaltyPercentage, 10),
    };

    const tokenURI = generateTokenURI(
      nftMetadata.name,
      nftMetadata.description,
      nftMetadata.imageUrl,
      attributes
    );

    setFormData(prev => ({
      ...prev,
      tokenURI,
    }));
  };

  const handleMint = async () => {
    if (!CEREBRA_NFT.address) {
      setError('Contract address not configured');
      return;
    }

    // Validate inputs
    if (!formData.memoryHash || !formData.transformationHash || !formData.tokenURI) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate hashes
    if (!isValidHash(formData.memoryHash) || !isValidHash(formData.transformationHash)) {
      setError('Invalid hash format. Please generate valid hashes.');
      return;
    }

    // Validate token URI
    if (!isValidTokenURI(formData.tokenURI)) {
      setError('Invalid token URI. Please generate a valid token URI.');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      write?.({
        args: [
          formData.memoryHash,
          formData.transformationHash,
          formData.tokenURI,
          BigInt(formData.royaltyPercentage),
        ],
        value: parseEther('0.01'),
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      setError('Failed to mint NFT. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartMinting = () => {
    setShowSteps(true);
  };

  const handleCancelMinting = () => {
    setShowSteps(false);
  };

  if (!CEREBRA_NFT.address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Contract Not Configured</h1>
          <p className="text-gray-500">The NFT contract address has not been configured. Please check your environment variables.</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mint Your NFT</h1>
          <p className="text-gray-500 mb-6">Connect your wallet to mint a new NFT</p>
          <button
            onClick={() => open()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (showSteps) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mint Your NFT</h1>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <MintingSteps
              onComplete={handleMint}
              onCancel={handleCancelMinting}
              nftMetadata={nftMetadata}
              formData={formData}
              isLoading={isLoading}
              isConfirming={isConfirming}
              isSuccess={isSuccess}
              error={error}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mint Your NFT</h1>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">NFT Details</h2>
              <p className="text-gray-500">
                Mint a new NFT from the CEREBRA collection. Each NFT is unique and represents a piece of digital art.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="memoryInput" className="block text-sm font-medium text-gray-700">
                  Memory Content
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="memoryInput"
                    value={memoryInput}
                    onChange={(e) => setMemoryInput(e.target.value)}
                    className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter memory content"
                  />
                  <button
                    onClick={handleGenerateMemoryHash}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Generate Hash
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="memoryHash" className="block text-sm font-medium text-gray-700">
                  Memory Hash *
                </label>
                <input
                  type="text"
                  id="memoryHash"
                  name="memoryHash"
                  value={formData.memoryHash}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Generated memory hash"
                  required
                />
              </div>

              <div>
                <label htmlFor="transformationInput" className="block text-sm font-medium text-gray-700">
                  Transformation Content
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="transformationInput"
                    value={transformationInput}
                    onChange={(e) => setTransformationInput(e.target.value)}
                    className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter transformation content"
                  />
                  <button
                    onClick={handleGenerateTransformationHash}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Generate Hash
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="transformationHash" className="block text-sm font-medium text-gray-700">
                  Transformation Hash *
                </label>
                <input
                  type="text"
                  id="transformationHash"
                  name="transformationHash"
                  value={formData.transformationHash}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Generated transformation hash"
                  required
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">NFT Metadata</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      NFT Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={nftMetadata.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter NFT name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={nftMetadata.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter NFT description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      NFT Image *
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload Image
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      {previewImage && (
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img src={previewImage} alt="NFT Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleGenerateTokenURI}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Generate Token URI
                    </button>
                  </div>

                  <div>
                    <label htmlFor="tokenURI" className="block text-sm font-medium text-gray-700">
                      Token URI *
                    </label>
                    <input
                      type="text"
                      id="tokenURI"
                      name="tokenURI"
                      value={formData.tokenURI}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Generated token URI"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="royaltyPercentage" className="block text-sm font-medium text-gray-700">
                  Royalty Percentage
                </label>
                <input
                  type="number"
                  id="royaltyPercentage"
                  name="royaltyPercentage"
                  value={formData.royaltyPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter royalty percentage (0-100)"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Price</p>
                <p className="text-2xl font-bold text-indigo-600">0.01 ETH</p>
              </div>
              <button
                onClick={handleStartMinting}
                disabled={isLoading || isConfirming}
                className={`
                  px-6 py-2 rounded-lg text-white font-medium
                  ${isLoading || isConfirming
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }
                  transition-colors
                `}
              >
                Continue to Mint
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {isSuccess && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">
                  Successfully minted your NFT!{' '}
                  <Link href="/nft/collection" className="text-indigo-600 hover:text-indigo-700 underline">
                    View your collection
                  </Link>
                </p>
              </div>
            )}

            {(isLoading || isConfirming) && (
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 