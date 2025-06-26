'use client'

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message = "Processing your content..." }: LoadingSpinnerProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center py-12">
      <div className="space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl">🎯</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">
            Creating your pitch deck
          </h3>
          <p className="text-sm text-gray-500">
            {message}
          </p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}