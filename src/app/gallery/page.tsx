'use client'

import { useEffect, useState } from 'react'
import { MemoryCard } from '@/components/MemoryCard'

interface Memory {
  id: string
  title: string
  content: string
  type: 'text' | 'image'
  createdAt: string
  transformations: Array<{
    id: string
    style: string
    content: string
    imageUrl?: string
  }>
}

export default function GalleryPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMemories = async () => {
    try {
      const response = await fetch('/api/memories')
      if (!response.ok) throw new Error('Failed to fetch memories')
      const data = await response.json()
      setMemories(data)
    } catch (error) {
      console.error('Error fetching memories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Memory Gallery</h1>
      {memories.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">No memories found. Start by uploading one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              id={memory.id}
              title={memory.title}
              content={memory.content}
              type={memory.type}
              createdAt={memory.createdAt}
              transformations={memory.transformations}
              onTransform={fetchMemories}
            />
          ))}
        </div>
      )}
    </div>
  )
} 