'use client'

import Link from 'next/link'
import React from 'react'
import { ProjectType } from '@/types/project'

import ProjectCardImage from './ProjectCardImage'
import ProjectCardContent from './ProjectCardContent'

type Props = {
  item: ProjectType
}

export default function ProjectCardItem({ item }: Props) {
  const { path, github, thumbnail, title, url, description } = item
  return (
    <Link href={`projects/${path}`}>
      <div className="rounded-lg border-border bg-prj-blue p-2 shadow-md">
        <ProjectCardImage thumbnail={thumbnail} />
        <ProjectCardContent github={github} title={title} url={url} description={description} />
      </div>
    </Link>
  )
}
