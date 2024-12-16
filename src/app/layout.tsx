import type { Metadata } from 'next'
import '../styles/globals.css'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'Lucy.Space.',
  description: "Lucy's Development Blog",
}

const pretendard = localFont({
  src: '../../data/fonts/PretendardVariable.woff2',
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
      <body className="bg-background">
        <ThemeProvider>
          <Header />
        </ThemeProvider>
        <main className="flex items-center justify-center">
          <div className="container flex">{children}</div>
        </main>
      </body>
      <GoogleAnalytics gaId={process.env.FIREBASE_MEASUREMENT_ID!} />
    </html>
  )
}
