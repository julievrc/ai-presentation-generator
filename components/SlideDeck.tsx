'use client'

interface Slide {
  title: string
  bullets: string[]
}

interface SlideDeckProps {
  slides: Slide[]
  onDownload: () => void
  isDownloading: boolean
}

export default function SlideDeck({ slides, onDownload, isDownloading }: SlideDeckProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Pitch Deck Preview
        </h2>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Generating...
            </>
          ) : (
            <>
              📄 Download PPTX
            </>
          )}
        </button>
      </div>

      <div className="grid gap-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {slide.title}
                </h3>
                <ul className="space-y-2">
                  {slide.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Generating PPTX...
            </>
          ) : (
            <>
              📄 Download Complete Presentation
            </>
          )}
        </button>
      </div>
    </div>
  )
}