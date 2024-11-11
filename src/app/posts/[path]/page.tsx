import PostContent from "@/components/posts/PostContent";
import { getPostData } from "@/services/blog";
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
  const { thumbnail, title } = post;

  return (
    <article className="container px-2 flex flex-col">
      <Image
        className="rounded-lg w-full h-2/5 max-h-[600px]"
        src={`/images/posts/${thumbnail}`}
        alt={title}
        width={960}
        height={540}
      />
      <PostContent post={post} />
    </article>
  );
}
