import React from 'react'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionRichText from './NotionRichText'

type Props = {
  richText: RichTextItemResponse[]
}

export default function NotionHeading2({ richText }: Props) {
  return (
    <h2 className="pt-4 text-2xl font-bold">
      {richText.map((data) => (
        <NotionRichText key={data.plain_text} data={data} />
      ))}
    </h2>
  )
}
