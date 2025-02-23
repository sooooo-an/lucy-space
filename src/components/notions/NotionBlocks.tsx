import { NotionBlockType } from '@/types/notion'
import React from 'react'
import NotionBlock from './NotionBlock'

type Props = {
  blocks: NotionBlockType[]
}
export default function NotionBlocks({ blocks }: Props) {
  return (
    <article className="flex flex-col gap-1 pb-10 pt-5">
      {blocks.map((block) => (
        <NotionBlock block={block} key={block.id} />
      ))}
    </article>
  )
}
