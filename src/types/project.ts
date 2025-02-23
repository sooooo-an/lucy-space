import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export type ProjectType = {
  path: string
  thumbnail: string
  github: string
  url: string
  title: RichTextItemResponse[]
  description: RichTextItemResponse[]
}
