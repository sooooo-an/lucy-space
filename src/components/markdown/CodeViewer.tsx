import React from 'react'
import { ExtraProps } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CodeViewer(
  props: React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & ExtraProps
) {
  const { children, className, ...rest } = props
  const match = /language-(\w+)(?:\s*{([\d,-]+)})?/.exec(className || '')

  const highlightLines = match?.[2]
    ? match[2].split(',').flatMap((range) => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number)
          return Array.from({ length: end - start + 1 }, (_, i) => start + i)
        }
        return [Number(range)]
      })
    : []

  return match ? (
    <SyntaxHighlighter
      {...rest}
      language={match[1]}
      style={oneDark}
      ref={undefined}
      wrapLongLines
      lineProps={(lineNumber) => ({
        style: {
          backgroundColor: highlightLines.includes(lineNumber)
            ? 'rgba(154, 205, 50, 0.1)'
            : 'transparent',
        },
      })}
      wrapLines
      showLineNumbers
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      {...rest}
      className="rounded-md border-slate-800 bg-gray-300 p-[1.5px] font-mono text-sm font-semibold text-text-primary dark:bg-gray-700"
    >
      {children}
    </code>
  )
}
