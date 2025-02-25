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
} from '@notionhq/client/build/src/api-endpoints'

export const getNotionContents = async (pageId: string): Promise<NotionContentType | null> => {
  try {
    const [page, blocks] = await Promise.all([getPage(pageId), getBlocks(pageId, [])])

    if (!isPageObjectResponse(page)) {
      return null
    }

    const { icon, properties, cover } = page
    const title = properties?.Name ? properties?.Name : properties?.title
    return {
      blocks,
      title: title?.type === 'title' ? title?.title : [],
      icon: getIconURL(icon),
      cover: getCoverURL(cover),
    }
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
  const data = await getPageBlocks(pageId, cursor)
  const newResults = [...results, ...data.results]
  if (data.next_cursor) {
    return getBlocks(pageId, newResults, data.next_cursor)
  }

  return newResults.filter(isBlockObjectResponse)
}

const getIconURL = (icon: PageObjectResponse['icon']) => {
  if (!icon) return ''

  let url = ''

  switch (icon.type) {
    case 'file':
      url = icon.file.url
      break
    case 'custom_emoji':
      url = icon.custom_emoji.url
      break
    case 'emoji':
      url = icon.emoji
      break
    case 'external':
      url = icon.external.url
      break
  }

  return url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : ''
}

export const getCoverURL = (cover: PageResponseType['cover']) => {
  if (!cover) return ''

  let url = ''

  switch (cover.type) {
    case 'file':
      url = cover.file.url
      break
    case 'external':
      url = cover.external.url
      break
  }

  return url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : ''
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
