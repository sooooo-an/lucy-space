import type { Metadata } from 'next'
import '../styles/globals.css'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: '루씨 블로그',
  description: '루씨의 개발 블로그',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '루씨 블로그',
    description: '루씨의 개발 블로그',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://lucy-an.space',
    siteName: '루씨 블로그',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: '루씨 블로그',
      },
    ],
  },
}

const pretendard = localFont({
  src: '/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pretendard.className} lg:text-md text-sm antialiased`}>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID!} />
      <body className="bg-background">
        <Header />
        <main className="flex items-center justify-center">
          <div className="container flex">{children}</div>
        </main>
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId={process.env.FIREBASE_MEASUREMENT_ID!} />
    </html>
  )
}
