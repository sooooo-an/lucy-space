import PostContent from '@/components/posts/PostContent'
import PostRightPanel from '@/components/posts/PostRightPanel'
import { getAllPosts, getPostData } from '@/services/blog'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: {
    path: string
  }
}

export async function generateMetadata({ params: { path } }: Props): Promise<Metadata> {
  const { title, description, category: keywords } = await getPostData(path)
  return {
    title,
    description,
    keywords,
  }
}

export default async function PostPage({ params: { path } }: Props) {
  const post = await getPostData(path)
  const { thumbnail, title, contact } = post

  return (
    <div className="flex">
      <article className="block w-full">
        <Image
          className="h-auto max-h-[600px] rounded-lg"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={960}
          height={540}
        />
        <PostContent post={post} />
      </article>
      <aside className="hidden w-1/4 flex-shrink-0 xl:block">
        <PostRightPanel contact={contact} date={post.date} />
      </aside>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.path,
  }))
}
