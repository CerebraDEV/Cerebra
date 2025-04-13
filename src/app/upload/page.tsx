'use client'

import { useRouter } from 'next/navigation'
import { UploadMemory } from '@/components/UploadMemory'

export default function UploadPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Upload Memory</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <UploadMemory
            onUpload={async (memory) => {
              const response = await fetch('/api/memories', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(memory),
              })

              if (!response.ok) {
                throw new Error('Failed to upload memory')
              }

              router.push('/gallery')
            }}
          />
        </div>
      </div>
    </div>
  )
} 