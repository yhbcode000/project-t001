import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Hello World',
  description: 'Full-stack Hello World with Next.js, FastAPI, GSAP, Capacitor, Electron, Axum, and monitoring.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
