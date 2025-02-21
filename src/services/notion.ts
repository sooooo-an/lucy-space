import { NotionBlockApiType, NotionBlockType } from '@/models/notion'
import { Client } from '@notionhq/client'

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

const notion = new Client({ auth: process.env.NOTION_SECRET })

const getPageBlocks = async (pageId: string, cursor?: string, size = 100) => {
  return notion.blocks.children.list({
    block_id: pageId,
    page_size: size,
    start_cursor: cursor || undefined,
  })
}

const isBlockObjectResponse = (block: NotionBlockApiType): block is NotionBlockType => {
  return 'type' in block
}
