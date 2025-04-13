import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface UploadMemoryProps {
  onUpload: (memory: { type: string; content: string; title: string }) => Promise<void>
}

export function UploadMemory({ onUpload }: UploadMemoryProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState<'text' | 'image'>('text')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onUpload({ type, content, title })
      router.push('/gallery')
    } catch (error) {
      console.error('Error uploading memory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Memory Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Memory Type</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="text"
                checked={type === 'text'}
                onChange={(e) => setType(e.target.value as 'text' | 'image')}
                className="form-radio text-primary-600"
              />
              <span className="ml-2">Text</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="image"
                checked={type === 'image'}
                onChange={(e) => setType(e.target.value as 'text' | 'image')}
                className="form-radio text-primary-600"
              />
              <span className="ml-2">Image</span>
            </label>
          </div>
        </div>

        {type === 'text' ? (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Memory Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setContent(reader.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="mt-1 block w-full"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Uploading...' : 'Upload Memory'}
        </button>
      </form>
    </motion.div>
  )
} 