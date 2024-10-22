import PostContent from "@/components/PostContent";
import { getPostData } from "@/services/blog";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    path: string;
  };
};

export default async function PostPage({ params: { path } }: Props) {
  const post = await getPostData(path);
  const { thumbnail, title } = post;

  return (
    <article className="container">
      <Image
        className="rounded-lg w-full h-1/5 max-h-[500px]"
        src={`/images/posts/${thumbnail}`}
        alt={title}
        width={800}
        height={400}
      />
      <PostContent post={post} />
    </article>
  );
}
