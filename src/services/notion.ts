import {
  NotionBlockApiType,
  NotionBlockType,
  NotionContentType,
  PageResponseType,
} from '@/types/notion'
import { Client } from '@notionhq/client'
import {
  GetPageResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { uploadImage } from './cloudinary'

export const getNotionContents = async (pageId: string): Promise<NotionContentType | null> => {
  try {
    const [page, blocks] = await Promise.all([getPage(pageId), getBlocks(pageId, [])])

    if (!isPageObjectResponse(page)) {
      return null
    }

    const title = getTitle(page.properties)
    const icon = await getOptimizedImage(getIconURL(page.icon), `${pageId}_icon`)
    const cover = await getOptimizedImage(getCoverURL(page.cover), `${pageId}_cover`)

    return {
      blocks,
      title,
      icon,
      cover,
    }
  } catch (err) {
    console.error(err)
    throw new Error('노션 페이지를 불러오는데 에러가 발생했습니다')
  }
}

const getTitle = (properties: PageObjectResponse['properties']): RichTextItemResponse[] => {
  const titleProp = properties?.Name || properties?.title
  return titleProp?.type === 'title' ? titleProp.title : []
}

export const getOptimizedImage = async (
  imageUrl: string | null,
  publicId: string
): Promise<string | undefined> => {
  if (!imageUrl) return undefined
  return await uploadImage(imageUrl, publicId)
}

export const getBlocks = async (
  pageId: string,
  results: NotionBlockApiType[],
  cursor?: string
): Promise<NotionBlockType[]> => {
  const data = await getPageBlocks(pageId, cursor)
  const newResults = [...results, ...data.results]
  if (data.next_cursor) {
    return getBlocks(pageId, newResults, data.next_cursor)
  }

  return newResults.filter(isBlockObjectResponse)
}

const getIconURL = (icon: PageObjectResponse['icon']) => {
  if (!icon) return null

  switch (icon.type) {
    case 'file':
      return icon.file.url
    case 'custom_emoji':
      return icon.custom_emoji.url
    case 'emoji':
      return icon.emoji
    case 'external':
      return icon.external.url
    default:
      return null
  }
}

export const getCoverURL = (cover: PageResponseType['cover']) => {
  if (!cover) return null

  switch (cover.type) {
    case 'file':
      return cover.file.url
    case 'external':
      return cover.external.url
    default:
      return null
  }
}

const notion = new Client({ auth: process.env.NOTION_SECRET })

const getPageBlocks = async (pageId: string, cursor?: string, size = 100) => {
  return notion.blocks.children.list({
    block_id: pageId,
    page_size: size,
    start_cursor: cursor || undefined,
  })
}

const isPageObjectResponse = (page: GetPageResponse): page is PageObjectResponse => {
  return 'properties' in page && page.object === 'page'
}

const isBlockObjectResponse = (block: NotionBlockApiType): block is NotionBlockType => {
  return 'type' in block
}

const getPage = async (pageId: string) => {
  return notion.pages.retrieve({
    page_id: pageId,
  })
}

export const getDatabase = (
  dbId: string,
  options?: Omit<QueryDatabaseParameters, 'database_id'>
) => {
  return notion.databases.query({
    database_id: dbId,
    ...options,
  })
}
