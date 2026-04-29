import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Md. Ismail Bhuiyan — DevOps Engineer',
  description: 'DevOps & Linux System Administrator with 5 years of experience in automation, CI/CD, and secure infrastructure management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}