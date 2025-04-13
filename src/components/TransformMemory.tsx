'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TransformMemoryProps {
  memoryId: string
  onTransform: () => void
}

const sciFiStyles = [
  'cyberpunk',
  'space-opera',
  'time-travel',
  'alien-contact',
  'post-apocalyptic',
  'bio-punk',
  'steampunk',
]

export function TransformMemory({ memoryId, onTransform }: TransformMemoryProps) {
  const [selectedStyle, setSelectedStyle] = useState(sciFiStyles[0])
  const [isLoading, setIsLoading] = useState(false)

  const handleTransform = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memoryId,
          style: selectedStyle,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to transform memory')
      }

      onTransform()
    } catch (error) {
      console.error('Error transforming memory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Sci-Fi Style</label>
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          {sciFiStyles.map((style) => (
            <option key={style} value={style}>
              {style.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTransform}
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            <span>Transforming...</span>
          </div>
        ) : (
          'Transform Memory'
        )}
      </motion.button>
    </div>
  )
} 