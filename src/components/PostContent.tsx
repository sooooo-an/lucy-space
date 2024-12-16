import React from 'react'
import { PostData } from '@/types/post'
import MarkdownViewer from './MarkdownViewer'

type Props = {
  post: PostData
}

export default function PostContent({ post }: Props) {
  const { title, content } = post
  return (
    <>
      <h1 className="py-7 text-4xl font-bold text-text-primary">{title}</h1>
      <MarkdownViewer content={content} />
    </>
  )
}
