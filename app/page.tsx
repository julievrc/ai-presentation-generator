'use client'

import { useState } from 'react'
import UploadArea from '../components/UploadArea'
import SlideDeck from '../components/SlideDeck'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useSlideGeneration } from '../hooks/useSlideGeneration'

export default function Home() {
  const [currentInput, setCurrentInput] = useState<File | string | null>(null)
  
  const {
    slides,
    isLoading,
    isDownloading,
    error,
    sourceContent,
    generateSlides,
    downloadPPTX,
    clearError,
    reset,
  } = useSlideGeneration()

  const handleFileSelect = async (file: File) => {
    setCurrentInput(file)
    await generateSlides(file)
  }

  const handleTextSubmit = async (text: string) => {
    setCurrentInput(text)
    await generateSlides(text)
  }

  const handleDownload = async () => {
    if (currentInput) {
      await downloadPPTX(currentInput)
    }
  }

  const handleStartOver = () => {
    setCurrentInput(null)
    reset()
  }

  const handleRetry = async () => {
    if (currentInput) {
      await generateSlides(currentInput)
    }
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 SlideSynth
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into professional pitch decks. Upload a voice note or text memo, 
            and get a structured 10-slide presentation in seconds.
          </p>
        </header>

        {error && (
          <div className="mb-8">
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
              onRetry={currentInput ? handleRetry : undefined}
            />
          </div>
        )}

        {isLoading && (
          <LoadingSpinner message="Analyzing your content and generating slides..." />
        )}

        {!isLoading && slides.length === 0 && (
          <UploadArea
            onFileSelect={handleFileSelect}
            onTextSubmit={handleTextSubmit}
            isLoading={isLoading}
          />
        )}

        {!isLoading && slides.length > 0 && (
          <div className="space-y-8">
            <SlideDeck
              slides={slides}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
            
            <div className="text-center">
              <button
                onClick={handleStartOver}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                ← Start over with new content
              </button>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Built with Next.js and Tailwind CSS. 
            Backend powered by FastAPI and OpenAI.
          </p>
        </footer>
      </div>
    </main>
  )
}