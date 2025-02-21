import React from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import MarkdownViewer from '../blog/MarkdownViewer'

export default function AsideViewer(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const { children } = props
  return (
    <aside className="bg-info-light text-info-dark flex gap-4 rounded-md border-2 border-info p-4">
      <span className="mt-1 text-info">
        <FaCircleInfo size={22} />
      </span>
      <div>{children}</div>
    </aside>
  )
}
