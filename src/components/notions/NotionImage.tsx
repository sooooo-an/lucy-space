import { getCoverURL, getOptimizedImage } from '@/services/notion'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import CldImage from '../common/CldImage'

type Props = {
  image: ImageBlockObjectResponse['image']
}

export default async function NotionImage({ image }: Props) {
  const imageUrl = getCoverURL(image)
  const url = await getOptimizedImage(imageUrl, image.toString())

  if (!url) {
    return null
  }

  return <CldImage src={url} alt={url} width={800} height={400} className="w-full" />
}
