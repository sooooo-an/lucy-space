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
    <article className="container px-2">
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
