import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SlideSynth',
  description: 'Transform your ideas into professional pitch decks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}