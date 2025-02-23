import { NotionBlockType } from '@/types/notion'
import React from 'react'
import NotionHeading3 from './NotionHeading3'
import NotionParagraph from './NotionParagraph'
import NotionHeading2 from './NotionHeading2'
import NotionBulletedListItem from './NotionBulletedListItem'
import NotionImage from './NotionImage'

type Props = {
  block: NotionBlockType
}

export default function NotionBlock({ block }: Props) {
  switch (block.type) {
    case 'heading_2':
      return <NotionHeading2 richText={block.heading_2.rich_text} />
    case 'heading_3':
      return <NotionHeading3 richText={block.heading_3.rich_text} />
    case 'paragraph':
      return <NotionParagraph richText={block.paragraph.rich_text} />
    case 'divider':
      return <hr />
    case 'bulleted_list_item':
      return <NotionBulletedListItem richText={block.bulleted_list_item.rich_text} />
    case 'image':
      return <NotionImage image={block.image} />
    default:
      return null
  }
}
