import React from 'react'
import ProjectCardItem from './ProjectCardItem'
import { ProjectType } from '@/types/project'

type Props = {
  list: ProjectType[]
}
export default function ProjectList({ list }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <ProjectCardItem item={item} key={item.path} />
      ))}
    </ul>
  )
}
