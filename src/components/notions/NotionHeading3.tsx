import React from 'react'
import NotionRichText from './NotionRichText'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

type Props = {
  richText: RichTextItemResponse[]
}

export default function NotionHeading3({ richText }: Props) {
  return (
    <h3 className="pb-1 pt-3 text-xl font-bold">
      {richText.map((data) => (
        <NotionRichText key={data.plain_text} data={data} />
      ))}
    </h3>
  )
}
