import ProjectList from '@/components/projects/ProjectList'
import { getProject } from '@/services/project'

export const revalidate = 86400

export default async function page() {
  const projects = await getProject(process.env.NOTION_PROJECT_DATABASE_ID!)
  // const list = projects.map((item) => ({
  //   ...item,
  //   thumbnail: `/api/image-proxy?url=${encodeURIComponent(item.thumbnail)}`,
  // }))

  return (
    <main className="pt-5">
      <div className="container mx-auto mb-5 px-4 md:px-0">
        <ProjectList list={projects} />
      </div>
    </main>
  )
}
