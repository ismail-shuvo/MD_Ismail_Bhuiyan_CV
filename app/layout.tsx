import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
