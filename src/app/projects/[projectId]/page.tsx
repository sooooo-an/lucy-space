import NotionBlocks from '@/components/notions/NotionBlocks'
import ContentLayout from '@/layouts/ContentLayout'
import { getNotionContents } from '@/services/notion'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400

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

export function generateStaticParams() {
  return [{ projectId: process.env.LUCY_SPACE_ID! }, { projectId: process.env.FF_ID! }]
}

export async function generateMetadata({ params: { projectId } }: Props): Promise<Metadata> {
  const data = await getNotionContents(projectId)

  const pageTitle =
    data?.title && data.title.length > 0
      ? `${data.title.map((t) => t.plain_text).join(' ')} | Lucy.Space`
      : 'Lucy.Space'
  const pageImage = data?.cover ?? '/images/logo.png'
  const pageIcon = data?.icon ?? '/favicon.ico'

  return {
    metadataBase: new URL('https://lucy-an.space'),
    title: pageTitle,
    description: `${pageTitle} 프로젝트 상세 정보`,
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: pageTitle,
      description: `${pageTitle} 프로젝트의 상세 내용을 확인하세요.`,
      type: 'website',
      url: `https://lucy-an.space/projects/${projectId}`,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: `${pageTitle} 프로젝트의 상세 내용을 확인하세요.`,
      images: [pageImage],
    },
  }
}
