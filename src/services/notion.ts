import { NotionBlockApiType, NotionBlockType, NotionContentType } from '@/types/notion'
import { Client } from '@notionhq/client'
import {
  GetPageResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'

export const getNotionContents = async (pageId: string): Promise<NotionContentType | null> => {
  try {
    const [page, blocks] = await Promise.all([getPage(pageId), getBlocks(pageId, [])])

    if (isPageObjectResponse(page)) {
      const { icon, properties, cover } = page
      return {
        icon: getThumbnailURL(icon),
        cover: getThumbnailURL(cover),
        blocks,
        title: properties.Name.type === 'title' ? properties.Name.title : [],
      }
    }

    return null
  } catch (err) {
    console.error(err)
    throw new Error('노션 페이지를 불러오는데 에러가 발생했습니다')
  }
}

export const getBlocks = async (
  pageId: string,
  results: NotionBlockApiType[],
  cursor?: string
): Promise<NotionBlockType[]> => {
  try {
    const data = await getPageBlocks(pageId, cursor)
    const newResults = [...results, ...data.results]
    if (data.next_cursor) {
      return getBlocks(pageId, newResults, data.next_cursor)
    }

    return newResults.filter(isBlockObjectResponse)
  } catch {
    throw new Error('노션 블록을 불러오는데 에러가 발생했습니다')
  }
}

export const getProfile = async (pageId: string) => {
  try {
    const data = await getPage(pageId)

    if (isPageObjectResponse(data)) {
      const { icon, properties } = data
      return {
        thumbnail: getThumbnailURL(icon),
      }
    }
  } catch {
    throw new Error('노션 페이지를 불러오는데 에러가 발생했습니다')
  }
}

const getThumbnailURL = (icon: PageObjectResponse['icon']) => {
  switch (icon?.type) {
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

export const getDatabase = (dbId: string, options?: QueryDatabaseParameters) => {
  return notion.databases.query({
    database_id: dbId,
    sorts: [{ property: 'date', direction: 'descending' }],
  })
}
