import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionRichText from './NotionRichText'

type Props = {
  richText: RichTextItemResponse[]
}

export default function NotionBulletedListItem({ richText }: Props) {
  return (
    <div className="relative flex items-center pl-3 text-sm">
      <span className="absolute left-0 top-2 mr-1 h-1 w-1 rounded-full bg-text-primary"></span>
      {richText.map((data) => (
        <NotionRichText data={data} key={data.plain_text} />
      ))}
    </div>
  )
}
