import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Md. Ismail Bhuiyan | DevOps & Linux System Administrator | Dhaka',
  description: 'DevOps & Linux System Administrator with 5 years of experience in CI/CD, Docker, Kubernetes, Jenkins, and DevSecOps. Based in Dhaka, Bangladesh.',
  keywords: 'DevOps Engineer Bangladesh, Linux System Administrator, Jenkins, Docker, Kubernetes, CI/CD, DevSecOps, Dhaka, Md Ismail Bhuiyan',
  authors: [{ name: 'Md. Ismail Bhuiyan' }],
  openGraph: {
    title: 'Md. Ismail Bhuiyan | DevOps & Linux System Administrator',
    description: 'DevOps Engineer with 5 years of experience in automation, CI/CD, containerization, and secure infrastructure management.',
    url: 'https://md-ismail-bhuiyan-cv.vercel.app/',
    siteName: 'Md. Ismail Bhuiyan CV',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Md. Ismail Bhuiyan | DevOps Engineer',
    description: 'DevOps & Linux System Administrator with 5 years of experience.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://md-ismail-bhuiyan-cv.vercel.app/',
  },
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