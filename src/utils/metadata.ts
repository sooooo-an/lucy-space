import type { Metadata } from 'next'

export const METADATA: Metadata = {
  title: '프론트엔드 개발자 포트폴리오 | Lucy Space',
  description: '프론트엔드 개발자 안수경의 포트폴리오입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '프론트엔드 개발자 포트폴리오 | Lucy Space',
    description: '프론트엔드 개발자 안수경의 포트폴리오입니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://lucy-an.space',
    siteName: 'Lucy.Space.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lucy.Space.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프론트엔드 개발자 포트폴리오 | Lucy Space',
    description: '프론트엔드 개발자 안수경의 포트폴리오입니다.',
    images: ['/images/logo.png'],
  },
}
