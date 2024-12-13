export type Post = {
  title: string
  description: string
  date: string
  category: string
  path: string
  thumbnail: string
}

export type PostData = Post & {
  content: string
  contact: string
}

export type CategoryData = {
  [key: string]: CategoryType[]
}

type CategoryType = { title: string; path: string }
