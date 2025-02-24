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
    <div className="rounded-lg border-border bg-prj-blue p-2 shadow-md">
      <Link href={`projects/${path}`}>{/* <ProjectCardImage thumbnail={thumbnail} /> */}</Link>
      <ProjectCardContent github={github} title={title} url={url} description={description} />
    </div>
  )
}
