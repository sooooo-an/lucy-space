import PostCardList from '@/components/blog/PostCardList'
import { getAllPosts } from '@/services/blog'
import React from 'react'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return <PostCardList posts={posts} />
}
