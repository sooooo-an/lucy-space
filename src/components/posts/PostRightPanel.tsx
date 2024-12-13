import React from 'react'
import MarkdownViewer from '@/components/common/MarkdownViewer'
import { parseDate } from '@/utils/date'

type Props = {
  date: string
  contact: string
}

export default function PostRightPanel({ date, contact }: Props) {
  return (
    <div className="sticky top-20 px-4">
      <time className="text-sm text-gray-400">created: {parseDate(date)}</time>
      {contact && (
        <div className="pt-8">
          <p className="mb-2 font-bold text-text-primary">목차</p>
          <MarkdownViewer content={contact} className="contact" />
        </div>
      )}
    </div>
  )
}
