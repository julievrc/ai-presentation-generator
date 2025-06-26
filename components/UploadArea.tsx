'use client'

import { useState, useRef } from 'react'

interface UploadAreaProps {
  onFileSelect: (file: File) => void
  onTextSubmit: (text: string) => void
  isLoading: boolean
}

export default function UploadArea({ onFileSelect, onTextSubmit, isLoading }: UploadAreaProps) {
  const [textInput, setTextInput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const validFile = files.find(file => 
      file.type.startsWith('audio/') || 
      file.type === 'text/plain' || 
      file.type === 'text/markdown'
    )
    
    if (validFile) {
      onFileSelect(validFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInput.trim()) {
      onTextSubmit(textInput.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="space-y-4">
          <div className="text-4xl">🎤</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Audio or Text File
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Drop files here or click to browse
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.m4a,.wav,.txt,.md,audio/*,text/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-400">
            Supports: MP3, M4A, WAV, TXT, MD
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">or</span>
        </div>
      </div>

      <form onSubmit={handleTextSubmit} className="space-y-4">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Type or paste your memo
          </label>
          <textarea
            id="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Describe your business idea, product concept, or startup pitch..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!textInput.trim() || isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Slides
        </button>
      </form>
    </div>
  )
}