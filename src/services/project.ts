import { DatabasePageResponseType, PageResponseType } from '@/types/notion'
import { getBlocks, getCoverURL, getDatabase } from './notion'
import { ProjectType } from '@/types/project'

export const getProject = async (dbId: string): Promise<ProjectType[]> => {
  try {
    const data = await getDatabase(dbId, {
      sorts: [{ property: 'date', direction: 'descending' }],
      filter: {
        property: 'status',
        select: {
          equals: 'end',
        },
      },
    })
    return data.results.filter(isPageObjectResponse).map(convertProject)
  } catch (err) {
    console.error(err)
    throw new Error('노션 데이터베이스를 불러오는데 에러가 발생했습니다')
  }
}

export const getProjectDetail = async (projectId: string) => {
  return getBlocks(projectId, [])
}

const isPageObjectResponse = (page: DatabasePageResponseType): page is PageResponseType => {
  return 'properties' in page && page.object === 'page'
}

const convertProject = (res: PageResponseType): ProjectType => {
  const { id, cover, properties } = res

  const getProperty = <K extends keyof PageResponseType['properties'], T>(
    key: K,
    type: PageResponseType['properties'][K]['type'],
    defaultValue: T
  ) => {
    const property = properties[key]

    if (isPropertyType<{ type: typeof type } & Record<typeof type, T>>(property, type)) {
      return property?.[type] ?? defaultValue
    }

    return defaultValue
  }

  return {
    path: id,
    thumbnail: getCoverURL(cover),
    github: getProperty('github', 'url', ''),
    url: getProperty('url', 'url', ''),
    title: getProperty('Name', 'title', []),
    description: getProperty('description', 'rich_text', []),
  }
}

const isPropertyType = <T extends { type: string }>(
  property: unknown,
  type: string
): property is T => {
  return !!property && (property as T).type === type
}
