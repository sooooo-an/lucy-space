import { Post, PostData, CategoryData } from '@/types/post'
import { readFile } from 'fs/promises'
import path from 'path'

const FRONT_MATTER_REGEX = /^---\n([\s\S]+?)\n---/
const CONTACT_REGEX = /### 목차([\s\S]*?)---/g

export const getAllPosts = async () => {
  const filePath = path.join(process.cwd(), 'data', 'blog', 'posts.json')
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
}

export const getPostData = async (fileName: string): Promise<PostData> => {
  const filePath = path.join(process.cwd(), 'data', 'blog', `${fileName}.md`)
  const posts = await getAllPosts()
  const post = posts.find((post) => post.path === fileName)

  if (!post) {
    throw new Error('Post not found')
  }

  const content = await readFile(filePath, 'utf-8')
  const contact = CONTACT_REGEX.exec(content)

  return {
    ...post,
    content: content.replace(FRONT_MATTER_REGEX, '').replace(CONTACT_REGEX, ''),
    contact: contact?.[1] ?? '',
  }
}

export const getCategoryData = async (): Promise<CategoryData> => {
  const posts = await getAllPosts()

  return posts.reduce((acc: CategoryData, { category, title, path }) => {
    acc[category] = acc[category] || []
    acc[category].push({ title, path })
    return acc
  }, {})
}
