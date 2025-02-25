import NotionBlocks from '@/components/notions/NotionBlocks'
import ContentLayout from '@/layouts/ContentLayout'
import { getNotionContents } from '@/services/notion'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = {
  params: { projectId: string }
}

export default async function ProjectDetailPage({ params: { projectId } }: Props) {
  if (!projectId) {
    notFound()
  }

  const data = await getNotionContents(projectId)

  if (!data) {
    return notFound()
  }

  const { blocks, icon, cover, title } = data

  return (
    <ContentLayout cover={cover} icon={icon} title={title} isShowBackBtn={true}>
      <NotionBlocks blocks={blocks} />
    </ContentLayout>
  )
}
