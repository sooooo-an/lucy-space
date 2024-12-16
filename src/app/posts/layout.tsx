import React from 'react'
import { Metadata } from 'next'
import { getCategoryData } from '@/services/blog'
import PostLayout from '@/layouts/PostLayout'

export const metadata: Metadata = {
  title: {
    default: 'Lucy.Space.',
    template: 'Lucy.Space. | %s',
  },
  description: 'Lucy.Space. 개발 블로그',
  icons: {
    icon: '../data/favicon.ico',
  },
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getCategoryData()
  return <PostLayout categories={categories}>{children}</PostLayout>
}
