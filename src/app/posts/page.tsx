import FilterablePost from "@/components/posts/FilterablePost";
import { getAllPosts } from "@/services/blog";
import React from "react";

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return <FilterablePost posts={posts} categories={categories} />;
}
