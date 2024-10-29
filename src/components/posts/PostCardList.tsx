import React from "react";
import { Post } from "@/types/post";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

export default function PostCardList({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </ul>
  );
}
