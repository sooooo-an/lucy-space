import NotionBlocks from '@/components/notions/NotionBlocks'
import ContentLayout from '@/layouts/ContentLayout'
import { getNotionContents } from '@/services/notion'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: { projectId: string }
}

export default async function ProjectDetailPage({ params: { projectId } }: Props) {
  if (!projectId) {
    notFound()
  }

  const data = await getNotionContents(projectId)

  if (!data) {
    return null
  }

  const { blocks, icon, cover, title } = data

  return (
    <ContentLayout cover={cover} icon={icon} title={title}>
      <NotionBlocks blocks={blocks} />
    </ContentLayout>
  )
}
