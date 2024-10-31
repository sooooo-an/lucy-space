import React from "react";
import { PostData } from "@/types/post";
import MarkdownViewer from "../common/MarkdownViewer";
import { parseDate } from "@/utils/date";

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, date, content } = post;
  return (
    <section className="py-7">
      <h1 className="text-4xl font-bold pb-1">{title}</h1>
      <p className="text-sm text-gray-400">{parseDate(date)}</p>
      <div className="w-full border-b mt-4 mb-12" />
      <MarkdownViewer content={content} />
    </section>
  );
}
