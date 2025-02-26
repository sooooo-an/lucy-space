import { NotionBlockType } from '@/types/notion'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from 'next/image'
import React from 'react'

type Props = {
  image: ImageBlockObjectResponse['image']
}

export default function NotionImage({ image }: Props) {
  if (image.type === 'external') {
    return <img src={image.external.url} alt={image.external.url} width={800} height={400} />
  }

  return (
    <img src={image.file.url} alt={image.file.url} width={800} height={400} className="w-full" />
  )
}
