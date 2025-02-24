import NotionBlocks from '@/components/notions/NotionBlocks'
import { getBlocks, getProfile } from '@/services/notion'
import Image from 'next/image'

export const revalidate = 86400

export default async function AboutPage() {
  const blocksApi = getBlocks(process.env.NOTION_ABOUT_PAGE_ID!, [])
  const profileApi = getProfile(process.env.NOTION_ABOUT_PAGE_ID!)
  const [blocks, profile] = await Promise.all([blocksApi, profileApi])

  return (
    <main className="mx-auto max-w-[710px] px-4 lg:px-0">
      <Image
        src={profile?.thumbnail ?? ''}
        alt="profile thumbnail"
        width={100}
        height={100}
        className="mb-5 mt-10 h-32 w-32 rounded-2xl"
        priority
      />
      <h2 className="text-2xl font-bold">안수경 | 프론트엔드 개발자</h2>
      <NotionBlocks blocks={blocks} />
    </main>
  )
}
