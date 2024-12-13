import React from "react";
import { Metadata } from "next";
import Categories from "@/components/posts/Categories";
import { CategoryData } from "@/types/post";
import { getCategoryData } from "@/services/blog";

export const metadata: Metadata = {
  title: {
    default: "Lucy.Space.",
    template: "Lucy.Space. | %s",
  },
  description: "Lucy.Space. 개발 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

const ALL_POSTS: CategoryData = {
  All: [{ title: "전체 게시물", path: "/" }],
};

export default async function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategoryData();
  return (
    <>
      <Categories categories={{ ...ALL_POSTS, ...categories }} />
      <section className="p-2 block w-full ">{children}</section>
    </>
  );
}
