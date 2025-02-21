import { NotionBlockType } from '@/models/notion'
import React from 'react'
import NotionBlock from './NotionBlock'

type Props = {
  blocks: NotionBlockType[]
}
export default function NotionBlocks({ blocks }: Props) {
  return (
    <article className="flex flex-col gap-1 py-10">
      {blocks.map((block) => (
        <NotionBlock block={block} key={block.id} />
      ))}
    </article>
  )
}
