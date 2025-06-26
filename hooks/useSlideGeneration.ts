'use client'

import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

interface Slide {
  title: string
  bullets: string[]
}

interface SlideResponse {
  slides: Slide[]
  slide_count: number
  source_content: string
}

export function useSlideGeneration() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sourceContent, setSourceContent] = useState<string>('')

  const generateSlides = async (input: File | string) => {
    setIsLoading(true)
    setError(null)
    setSlides([])

    try {
      const formData = new FormData()
      
      if (typeof input === 'string') {
        formData.append('text_content', input)
      } else {
        formData.append('audio_file', input)
      }

      const response = await axios.post<SlideResponse>(
        `${API_BASE_URL}/generate-slides`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000, // 2 minutes timeout
        }
      )

      setSlides(response.data.slides)
      setSourceContent(response.data.source_content)
    } catch (err) {
      console.error('Error generating slides:', err)
      setError(
        axios.isAxiosError(err) && err.response?.data?.detail
          ? err.response.data.detail
          : 'Failed to generate slides. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPPTX = async (input: File | string, filename = 'slidesynth_presentation.pptx') => {
    setIsDownloading(true)
    setError(null)

    try {
      const formData = new FormData()
      
      if (typeof input === 'string') {
        formData.append('text_content', input)
      } else {
        formData.append('audio_file', input)
      }
      formData.append('filename', filename)

      const response = await axios.post(
        `${API_BASE_URL}/generate-pptx`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
          timeout: 120000,
        }
      )

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error downloading PPTX:', err)
      setError(
        axios.isAxiosError(err) && err.response?.data?.detail
          ? err.response.data.detail
          : 'Failed to download presentation. Please try again.'
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const clearError = () => setError(null)
  const reset = () => {
    setSlides([])
    setError(null)
    setIsLoading(false)
    setIsDownloading(false)
    setSourceContent('')
  }

  return {
    slides,
    isLoading,
    isDownloading,
    error,
    sourceContent,
    generateSlides,
    downloadPPTX,
    clearError,
    reset,
  }
}