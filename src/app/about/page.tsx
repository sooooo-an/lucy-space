import NotionBlocks from '@/components/notions/NotionBlocks'
import { getNotionContents } from '@/services/notion'
import NotFound from '../not-found'
import ContentLayout from '@/layouts/ContentLayout'

export const revalidate = 3600

export default async function AboutPage() {
  const data = await getNotionContents(process.env.NOTION_ABOUT_PAGE_ID!)

  if (!data) {
    return NotFound()
  }

  const { blocks, title, icon, cover } = data

  return (
    <ContentLayout cover={cover} icon={icon} title={title}>
      <NotionBlocks blocks={blocks} />
    </ContentLayout>
  )
}
