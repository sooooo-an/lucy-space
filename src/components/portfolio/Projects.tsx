import SectionLayout from '@/layouts/SectionLayout'
import React from 'react'

import { PROJECTS } from '@data/project'

import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <SectionLayout bgColor="bg-section-2" title="Projects">
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} isMargin={!!(idx % 2)} color={colors[idx]} />
        ))}
      </ul>
    </SectionLayout>
  )
}

const colors = ['bg-prj-mint', 'bg-prj-pink', 'bg-prj-blue']
