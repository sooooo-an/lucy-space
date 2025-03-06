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
  return <CloudinaryImage crop="limit" quality="auto" format="auto" priority {...props} />
}
