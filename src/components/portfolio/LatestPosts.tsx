import SectionLayout from '@/layouts/SectionLayout'
import { getLatestPosts } from '@/services/blog'
import React from 'react'
import PostCardList from '../blog/PostCardList'

export default async function LatestPosts() {
  const posts = await getLatestPosts()
  return (
    <SectionLayout title="Latest Posts" bgColor="bg-section-3">
      <PostCardList posts={posts} />
    </SectionLayout>
  )
}
