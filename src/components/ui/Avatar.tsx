import Image from 'next/image'
import React from 'react'

type Props = {
  image: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  type: 'circle' | 'square'
}

const SIZE_CLASS = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-32 h-32',
} as const

export default function Avatar({ image, alt, size = 'md', type }: Props) {
  return (
    <Image
      src={image}
      alt={alt}
      width={200}
      height={200}
      className={`${SIZE_CLASS[size]} ${
        type === 'square' ? 'rounded-lg' : 'rounded-full'
      } object-cover shadow-sm`}
    />
  )
}
