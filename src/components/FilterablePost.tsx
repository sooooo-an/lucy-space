"use client";

import { Post } from "@/types/post";
import React, { useState } from "react";
import Categories from "./Categories";
import PostCardList from "./PostCardList";

type Props = {
  posts: Post[];
  categories: string[];
};

const ALL_POSTS = "All";

export default function FilterablePost({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <section className="w-full">
      <Categories
        onClick={setSelected}
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
      />

      <PostCardList posts={filtered} />
    </section>
  );
}
