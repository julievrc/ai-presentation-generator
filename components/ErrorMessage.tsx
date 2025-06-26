'use client'

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
  onRetry?: () => void
}

export default function ErrorMessage({ message, onDismiss, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-red-400 text-xl">⚠️</div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">
              Something went wrong
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {message}
            </p>
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-red-100 text-red-800 px-3 py-1 text-sm rounded hover:bg-red-200"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={onDismiss}
                className="text-red-600 text-sm hover:text-red-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}