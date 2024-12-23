import type { Metadata } from 'next'

export const METADATA: Metadata = {
  title: 'Lucy.Space',
  description: 'Lucy의 개발 블로그',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Lucy.Space',
    description: 'Lucy의 개발 블로그',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://lucy-an.space',
    siteName: 'Lucy.Space',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lucy.Space',
      },
    ],
  },
}
