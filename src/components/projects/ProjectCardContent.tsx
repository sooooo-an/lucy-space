import { ProjectType } from '@/types/project'
import React from 'react'
import NotionRichTextArray from '../notions/NotionRichTextArray'
import ProjectCardLinks from './ProjectCardLinks'

type Props = Omit<ProjectType, 'thumbnail' | 'path'>

export default function ProjectCardContent({ title, description, github, url }: Props) {
  return (
    <div className="relative min-h-[150px] p-2">
      <p className="pb-1 font-semibold">{title && <NotionRichTextArray list={title} />}</p>
      <span className="text-sm">{description && <NotionRichTextArray list={description} />}</span>
      {(github || url) && <ProjectCardLinks github={github} url={url} />}
    </div>
  )
}
