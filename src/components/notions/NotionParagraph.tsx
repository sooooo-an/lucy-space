import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import NotionRichText from './NotionRichText'

type Props = {
  richText: RichTextItemResponse[]
}

export default function NotionParagraph({ richText }: Props) {
  if (!richText.length) {
    return <div className="py-3" />
  }

  return (
    <p className="text-sm">
      {richText.map((data) => (
        <NotionRichText data={data} key={data.plain_text} />
      ))}
    </p>
  )
}
