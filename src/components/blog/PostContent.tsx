import React from 'react'
import { PostData } from '@/types/post'
import MarkdownViewer from './MarkdownViewer'

type Props = {
  post: PostData
}

export default function PostContent({ post }: Props) {
  const { content } = post
  return <MarkdownViewer content={content} />
}
