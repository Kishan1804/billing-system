import React, { useState } from 'react'
import LoadingScreen from '../components/common/LoadingScreen'

const Contact = () => {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <LoadingScreen />
  }
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Contact Us</h1>
            <p className="mt-1 text-gray-400">Detail your message</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact