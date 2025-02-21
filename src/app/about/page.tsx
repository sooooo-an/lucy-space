import NotionBlocks from '@/components/notions/NotionBlocks'
import { getBlocks } from '@/services/notion'

import React from 'react'

export default async function AboutPage() {
  const blocks = await getBlocks(process.env.NOTION_ABOUT_PAGE_ID!, [])

  return (
    <main className="mx-auto max-w-[710px]">
      <NotionBlocks blocks={blocks} />
    </main>
  )
}
