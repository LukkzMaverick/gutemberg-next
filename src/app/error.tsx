'use client'

import { useRouter } from 'next/navigation'

export default function Error({}: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
      <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
        <button 
          onClick={() => router.push('/')} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
  );
}
