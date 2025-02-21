import '../styles/globals.css'
import localFont from 'next/font/local'
import Header from '@/components/ui/Header'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { METADATA } from '@/utils/metadata'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata = METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${pretendard.className} text-text-primary antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID!} />
      <body className="bg-background">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
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
