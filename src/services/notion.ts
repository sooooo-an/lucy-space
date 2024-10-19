import { convertFromNotion } from "@/app/utils/converter";
import { isNotionClientError, Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getBlocksFromPage = async (pageId: string) => {
  try {
    let cursor = null;
    let hasMore = true;
    const blocks = [];

    while (hasMore) {
      const { next_cursor, has_more, results } = await getBlocks(
        pageId,
        cursor
      );
      cursor = next_cursor;
      hasMore = has_more;
      const childrenResults = await getChildrenBlocks(filteredBlocks(results));
      blocks.push(...convertFromNotion(childrenResults));
    }

    return blocks;
  } catch (error) {
    if (isNotionClientError(error)) {
      throw {
        code: error.code,
      };
    }
  }
};

const getChildrenBlocks = async (
  blocks: BlockObjectResponse[]
): Promise<BlockObjectResponse[]> => {
  const arr = [];
  for (const block of blocks) {
    arr.push(block);
    if (block.has_children) {
      const { results } = await getBlocks(block.id);
      const children = await getChildrenBlocks(filteredBlocks(results));
      arr.push(...children);
    }
  }
  return arr;
};

const filteredBlocks = (
  blocks: (PartialBlockObjectResponse | BlockObjectResponse)[]
) => blocks.filter((block): block is BlockObjectResponse => "type" in block);

export const getBlocks = async (
  pageId: string,
  cursor: null | string = null
) => {
  return notion.blocks.children.list({
    block_id: pageId,
    ...(cursor ? { start_cursor: cursor } : {}),
  });
};
