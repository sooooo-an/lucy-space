import Image from 'next/image'
import React from 'react'
import { ExtraProps } from 'react-markdown'

export default function ImageViewer(
  image: React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement> &
    ExtraProps
) {
  const isVideo = image.src?.match(/.mov$/)
  if (isVideo) {
    return (
      <video controls>
        <track kind="captions" />
        <source src={image.src || ''} type="video/mp4" />
      </video>
    )
  }

  return (
    <Image
      src={image.src || ''}
      alt={image.alt || ''}
      width={300}
      height={350}
      className="w-full"
    />
  )
}
