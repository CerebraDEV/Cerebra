import { useState } from 'react';
import { NFTCard } from './NFTCard';

interface MintingStepsProps {
  onComplete: () => void;
  onCancel: () => void;
  nftMetadata: {
    name: string;
    description: string;
    imageUrl: string;
  };
  formData: {
    memoryHash: string;
    transformationHash: string;
    tokenURI: string;
    royaltyPercentage: string;
  };
  isLoading: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function MintingSteps({
  onComplete,
  onCancel,
  nftMetadata,
  formData,
  isLoading,
  isConfirming,
  isSuccess,
  error,
}: MintingStepsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const attributes = {
    memoryHash: formData.memoryHash,
    transformationHash: formData.transformationHash,
    royaltyPercentage: parseInt(formData.royaltyPercentage, 10),
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= currentStep
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="mt-8">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Step 1: Memory Hash</h3>
            <p className="text-sm text-gray-500">
              Enter the memory content and generate a hash for your NFT.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-700">Memory Hash:</p>
              <p className="mt-1 text-sm text-gray-900 break-all">{formData.memoryHash || 'Not generated yet'}</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Step 2: Transformation Hash</h3>
            <p className="text-sm text-gray-500">
              Enter the transformation content and generate a hash for your NFT.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-700">Transformation Hash:</p>
              <p className="mt-1 text-sm text-gray-900 break-all">{formData.transformationHash || 'Not generated yet'}</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Step 3: NFT Metadata</h3>
            <p className="text-sm text-gray-500">
              Review your NFT metadata and token URI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <NFTCard
                  name={nftMetadata.name}
                  description={nftMetadata.description}
                  imageUrl={nftMetadata.imageUrl}
                  attributes={attributes}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Token URI:</p>
                  <p className="mt-1 text-xs text-gray-900 break-all">{formData.tokenURI || 'Not generated yet'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Royalty Percentage:</p>
                  <p className="mt-1 text-sm text-gray-900">{formData.royaltyPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Step 4: Confirm Minting</h3>
            <p className="text-sm text-gray-500">
              Review all details and confirm to mint your NFT.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <NFTCard
                    name={nftMetadata.name}
                    description={nftMetadata.description}
                    imageUrl={nftMetadata.imageUrl}
                    attributes={attributes}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Minting Price:</p>
                    <p className="mt-1 text-lg font-bold text-indigo-600">0.01 ETH</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Memory Hash:</p>
                    <p className="mt-1 text-xs text-gray-900 break-all">{formData.memoryHash}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Transformation Hash:</p>
                    <p className="mt-1 text-xs text-gray-900 break-all">{formData.transformationHash}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Token URI:</p>
                    <p className="mt-1 text-xs text-gray-900 break-all">{formData.tokenURI}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Royalty Percentage:</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.royaltyPercentage}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Success message */}
      {isSuccess && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            Successfully minted your NFT! You can view it in your collection.
          </p>
        </div>
      )}

      {/* Loading state */}
      {(isLoading || isConfirming) && (
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={isLoading || isConfirming}
          className={`
            px-4 py-2 rounded-md text-sm font-medium
            ${currentStep === 1
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-indigo-600 hover:text-indigo-700'
            }
            ${isLoading || isConfirming ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </button>
        <button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !formData.memoryHash) ||
            (currentStep === 2 && !formData.transformationHash) ||
            (currentStep === 3 && !formData.tokenURI) ||
            isLoading ||
            isConfirming
          }
          className={`
            px-4 py-2 rounded-md text-sm font-medium text-white
            ${currentStep === totalSteps
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-600 hover:bg-gray-700'
            }
            ${(currentStep === 1 && !formData.memoryHash) ||
              (currentStep === 2 && !formData.transformationHash) ||
              (currentStep === 3 && !formData.tokenURI) ||
              isLoading ||
              isConfirming
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }
          `}
        >
          {currentStep === totalSteps
            ? isLoading
              ? 'Preparing...'
              : isConfirming
              ? 'Confirming...'
              : isSuccess
              ? 'Minted!'
              : 'Mint NFT'
            : 'Next'}
        </button>
      </div>
    </div>
  );
} 