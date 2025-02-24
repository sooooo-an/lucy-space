'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  thumbnail: string
  priority?: boolean
}

export default function ProjectCardImage({ thumbnail, priority }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div className="relative overflow-hidden">
      {isLoading && <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-300"></div>}
      <Image
        src={thumbnail}
        width={250}
        height={200}
        alt="project-thumbnail"
        className="h-64 w-full rounded-tl-lg rounded-tr-lg transition-transform duration-300 ease-in-out hover:scale-110"
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  )
}
