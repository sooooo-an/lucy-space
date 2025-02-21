import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionBlockApiType = PartialBlockObjectResponse | BlockObjectResponse
export type NotionBlockType = BlockObjectResponse
