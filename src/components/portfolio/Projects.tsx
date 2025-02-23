import SectionLayout from '@/layouts/SectionLayout'
import { getProject } from '@/services/project'
import ProjectList from '@/components/projects/ProjectList'
import React from 'react'

export default async function Projects() {
  const projects = await getProject(process.env.NOTION_PROJECT_DATABASE_ID!)

  return (
    <SectionLayout bgColor="bg-section-2" title="Projects">
      <ProjectList list={projects} />
    </SectionLayout>
  )
}
