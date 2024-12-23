import '../styles/globals.css'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { METADATA } from '@/utils/metadata'

export const metadata = METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pretendard.className} text-text-primary antialiased`}>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID!} />
      <body className="bg-background">
        <Header />
        <main className="flex h-full min-h-0 flex-col items-center">
          <div className="container flex flex-1">{children}</div>
        </main>
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId={process.env.FIREBASE_MEASUREMENT_ID!} />
    </html>
  )
}

const pretendard = localFont({
  src: '/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})
