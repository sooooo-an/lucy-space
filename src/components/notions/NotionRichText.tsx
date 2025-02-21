import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import NotionText from './NotionText'

type Props = {
  data: RichTextItemResponse
}

export default function NotionRichText({ data }: Props) {
  switch (data.type) {
    case 'text':
      return <NotionText text={data.text} bold={data.annotations.bold} />
  }
}
// [
//   {
//     type: 'text',
//     text: { content: 'ETC', link: null },
//     annotations: {
//       bold: false,
//       italic: false,
//       strikethrough: false,
//       underline: false,
//       code: false,
//       color: 'default'
//     },
//     plain_text: 'ETC',
//     href: null
//   }
// ]
