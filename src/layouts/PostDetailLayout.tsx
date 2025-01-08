import React from 'react'
import MarkdownViewer from '@/components/MarkdownViewer'
import { parseDate } from '@/utils/date'

type Props = {
  children: React.ReactNode
  postContact: string
  postCreated: string
}

export default function PostDetailLayout({ children, postContact, postCreated }: Props) {
  return (
    <div className="flex">
      {children}
      <aside className="hidden w-1/4 flex-shrink-0 xl:block">
        <div className="sticky top-20 px-4">
          <time className="text-md text-gray-400">created: {parseDate(postCreated)}</time>
          {postContact && (
            <div className="pt-8">
              <p className="mb-2 font-bold text-text-primary">목차</p>
              <MarkdownViewer content={postContact} className="contact" />
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
