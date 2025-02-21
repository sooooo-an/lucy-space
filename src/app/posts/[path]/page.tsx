import PostContent from '@/components/blog/PostContent'
import PostDetailLayout from '@/layouts/PostDetailLayout'
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
    title: `Lucy.Space. | ${title}`,
    description,
    keywords,
  }
}

export default async function PostPage({ params: { path } }: Props) {
  const post = await getPostData(path)
  const { thumbnail, title, contact } = post

  return (
    <PostDetailLayout postContact={contact} postCreated={post.date}>
      <article className="block w-full md:p-12">
        <h2 className="pb-10 text-5xl font-bold leading-tight">{title}</h2>
        <Image
          className="mb-10 h-auto max-h-[600px] rounded-lg"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={960}
          height={540}
          priority
        />
        <PostContent post={post} />
      </article>
    </PostDetailLayout>
  )
}
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(({ path }) => ({ path }))
}
