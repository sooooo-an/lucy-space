import type { Metadata } from 'next'

export const METADATA: Metadata = {
  title: 'Lucy.Space',
  description: '5년차 프론트엔드 포트폴리오',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Lucy.Space',
    description: '5년차 프론트엔드 포트폴리오',
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
