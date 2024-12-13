import React from 'react'
import { Post } from '@/types/post'
import PostCard from './PostCard'

type Props = {
  posts: Post[]
}

export default function PostCardList({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
