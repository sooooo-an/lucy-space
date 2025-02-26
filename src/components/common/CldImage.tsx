'use client'

import { CldImage as CloudinaryImage } from 'next-cloudinary'

type props = {
  src: string
  width: number
  height: number
  className: string
  alt: string
}

export default function CldImage(props: props) {
  return (
    <CloudinaryImage
      crop="limit"
      quality="auto"
      format="webp"
      sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
      {...props}
    />
  )
}
