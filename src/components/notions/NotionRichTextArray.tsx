import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import NotionRichText from './NotionRichText'

type Props = {
  list: RichTextItemResponse[]
}

export default function NotionRichTextArray({ list }: Props) {
  return (
    <>
      {list.map((data) => (
        <NotionRichText data={data} key={data.plain_text} />
      ))}
    </>
  )
}
