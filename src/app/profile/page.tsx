'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Please sign in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center space-x-6">
            {session.user?.image && (
              <div className="relative h-24 w-24">
                <Image
                  src={session.user.image}
                  alt={session.user?.name || 'Profile picture'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{session.user?.name || 'Anonymous User'}</h1>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-primary-600"
                      defaultChecked
                    />
                    <span className="ml-2">Receive updates about your memories</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Privacy</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-primary-600"
                      defaultChecked
                    />
                    <span className="ml-2">Make memories private by default</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Memories</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Transformations</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 