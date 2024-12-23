import React from 'react'
import { getCategoryData } from '@/services/blog'
import PostLayout from '@/layouts/PostLayout'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getCategoryData()
  return <PostLayout categories={categories}>{children}</PostLayout>
}
