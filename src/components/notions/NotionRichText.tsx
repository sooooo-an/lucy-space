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
