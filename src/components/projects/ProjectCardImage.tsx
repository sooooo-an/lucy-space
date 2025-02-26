import { CldImage } from 'next-cloudinary'
import React from 'react'

type Props = {
  thumbnail: string | undefined
}

export default function ProjectCardImage({ thumbnail }: Props) {
  return (
    <div className="relative overflow-hidden">
      {thumbnail && (
        <CldImage
          src={thumbnail}
          width={250}
          height={200}
          alt="project-thumbnail"
          className="h-64 w-full rounded-tl-lg rounded-tr-lg transition-transform duration-300 ease-in-out hover:scale-110"
        />
      )}
    </div>
  )
}
