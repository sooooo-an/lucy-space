import React from "react";
import { PostData } from "@/types/post";
import MarkdownViewer from "./MarkdownViewer";
import { parseDate } from "@/app/utils/date";

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, date, content } = post;
  return (
    <section className="py-4">
      <h1 className="text-4xl font-bold pb-1">{title}</h1>
      <p className="text-sm text-gray-400">{parseDate(date)}</p>
      <div className="w-44 border-2 border-purple-600 mt-4 mb-8" />
      <MarkdownViewer content={content} />
    </section>
  );
}
