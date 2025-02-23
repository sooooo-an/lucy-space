import Image from 'next/image'
import React from 'react'

type Props = {
  thumbnail: string
}

export default function ProjectCardImage({ thumbnail }: Props) {
  return (
    <Image
      src={thumbnail}
      width={250}
      height={200}
      alt="project-thumbnail"
      className="w-full rounded-tl-lg rounded-tr-lg"
      priority
    />
  )
}
