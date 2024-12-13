"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import "../../styles/github-markdown.css";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Props = {
  content: string;
  className?: string;
};

export default function MarkdownViewer({ content, className = "" }: Props) {
  return (
    <div className="markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
        className={className}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={oneDark}
                ref={undefined}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          img: (image) => {
            const isVideo = image.src?.match(/.mov$/);
            if (isVideo) {
              return (
                <video controls>
                  <source src={image.src || ""} type="video/mp4" />
                </video>
              );
            }

            return (
              <Image
                src={image.src || ""}
                alt={image.alt || ""}
                width={300}
                height={350}
                className="w-full"
              />
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
