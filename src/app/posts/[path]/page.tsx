import PostContent from "@/components/posts/PostContent";
import PostRightPanel from "@/components/posts/PostRightPanel";
import { getAllPosts, getPostData } from "@/services/blog";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    path: string;
  };
};

export async function generateMetadata({
  params: { path },
}: Props): Promise<Metadata> {
  const { title, description, category: keywords } = await getPostData(path);
  return {
    title,
    description,
    keywords,
  };
}

export default async function PostPage({ params: { path } }: Props) {
  const post = await getPostData(path);
  const { thumbnail, title, contact } = post;

  return (
    <div className="flex">
      <article className="block w-full">
        <Image
          className="rounded-lg max-h-[600px] h-auto"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={960}
          height={540}
        />
        <PostContent post={post} />
      </article>
      <aside className="basis-1/5 flex-shrink-0 hidden lg:block">
        <PostRightPanel contact={contact} date={post.date} />
      </aside>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
