import { getAllPosts } from "@/services/blog";
import React from "react";

export default async function PostsPage() {
  const posts = await getAllPosts();
  console.log(posts);
  return <div>PostsPage</div>;
}
