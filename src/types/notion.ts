import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  GetPageResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  PartialDatabaseObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionBlockApiType = PartialBlockObjectResponse | BlockObjectResponse
export type NotionBlockType = BlockObjectResponse

/** DB */
export type DatabasePageResponseType =
  | GetPageResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

export type PageResponseType = PageObjectResponse

export type NotionContentType = {
  icon: string | null
  cover: string | null
  blocks: NotionBlockType[]
  title: RichTextItemResponse[]
}
