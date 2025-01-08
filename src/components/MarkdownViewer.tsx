'use client'

import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import CodeViewer from './markdown/CodeViewer'
import ImageViewer from './markdown/ImageViewer'
import '@/styles/typography.css'

type Props = {
  content: string
  className?: string
}

export default function MarkdownViewer({ content, className }: Props) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: {
              className: ['no-underline'],
            },
            content: () => [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['mr-3 text-text-secondary hover:text-text-primary'] },
                children: [{ type: 'text', value: '#' }],
              },
            ],
          },
        ],
        rehypeCodeTitles,
        rehypeRaw,
      ]}
      className={`prose:max-w-none prose prose-neutral leading-4 dark:prose-invert lg:prose-xl ${className}`}
      components={{
        code: CodeViewer,
        img: ImageViewer,
        pre: ({ children }) => <>{children}</>,
      }}
    >
      {content}
    </Markdown>
  )
}
