'use client'

import React from 'react'
import GithubIcon from '../icons/GithubIcon'
import LinkIcon from '../icons/LinkIcon'
import Link from 'next/link'

type Props = {
  github: string
  url: string
}

export default function ProjectCardLinks({ github, url }: Props) {
  return (
    <div className="absolute bottom-2 right-2 flex gap-2 text-lg">
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <GithubIcon />
        </Link>
      )}
      {url && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <LinkIcon />
        </Link>
      )}
    </div>
  )
}
