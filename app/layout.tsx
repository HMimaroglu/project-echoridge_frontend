import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Echo Ridge',
  description: 'AI-powered market fit analysis for your product',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}