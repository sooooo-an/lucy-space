import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'
import React from 'react'

type Props = {
  text: TextRichTextItemResponse['text']
  bold: boolean
}

export default function NotionText({ text, bold }: Props) {
  if (text.link) {
    return (
      <Link className={`${bold ? 'font-bold' : ''} underline`} href={text.link.url}>
        {text.content}
      </Link>
    )
  }

  return <span className={`${bold ? 'font-bold' : ''}`}>{text.content}</span>
}
