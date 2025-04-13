'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TransformMemory } from './TransformMemory'

interface Transformation {
  id: string
  style: string
  content: string
  imageUrl?: string
}

interface MemoryCardProps {
  id: string
  title: string
  content: string
  type: 'text' | 'image'
  createdAt: string
  transformations: Transformation[]
  onTransform: () => void
}

export function MemoryCard({
  id,
  title,
  content,
  type,
  createdAt,
  transformations,
  onTransform,
}: MemoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {type === 'image' ? (
          <div className="relative h-48 mb-4">
            <Image src={content} alt={title} fill className="object-cover rounded" />
          </div>
        ) : (
          <p className="text-gray-600 mb-4">{content}</p>
        )}

        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none"
          >
            {isExpanded ? 'Hide Transformations' : 'Show Transformations'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <TransformMemory memoryId={id} onTransform={onTransform} />

            {transformations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Transformations</h3>
                <div className="space-y-4">
                  {transformations.map((transformation) => (
                    <div key={transformation.id} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Style: {transformation.style}</p>
                      {transformation.imageUrl ? (
                        <div className="relative h-48">
                          <Image
                            src={transformation.imageUrl}
                            alt={`${title} - ${transformation.style}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-600">{transformation.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Created: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  )
} 