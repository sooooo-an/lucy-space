import FilterablePost from "@/components/FilterablePost";
import { getAllPosts } from "@/services/blog";
import React from "react";

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <div className="flex flex-col container">
      <FilterablePost posts={posts} categories={categories} />
    </div>
  );
}
