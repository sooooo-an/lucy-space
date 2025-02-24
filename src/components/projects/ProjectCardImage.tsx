'use client'

import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
  thumbnail: string
}

export default function ProjectCardImage({ thumbnail }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div className="relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="h-64 w-full animate-pulse rounded-lg bg-gray-300"></div>
      </div>
      <Image
        src={thumbnail}
        width={250}
        height={200}
        alt="project-thumbnail"
        className={`h-64 w-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        priority
      />
    </div>
  )
}
