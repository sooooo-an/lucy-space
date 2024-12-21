import PostContent from '@/components/PostContent'
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
    title,
    description,
    keywords,
  }
}

export default async function PostPage({ params: { path } }: Props) {
  const post = await getPostData(path)
  const { thumbnail, title, contact } = post

  return (
    <PostDetailLayout postContact={contact} postCreated={post.date}>
      <article className="block w-full pb-10">
        <Image
          className="h-auto max-h-[600px] rounded-lg"
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
