import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  content: string;
};

const MARKDOWN_STYLE =
  "prose-h2:underline prose-a:text-purple-500 prose-pre:p-2 prose-pre:m-2 prose-h4:text-purple-700";

export default function MarkdownViewer({ content }: Props) {
  return (
    <Markdown
      className={`prose lg:prose-xl max-w-none ${MARKDOWN_STYLE}`}
      rehypePlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={vscDarkPlus}
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
        img: (image) => (
          <Image
            src={image.src || ""}
            alt={image.alt || ""}
            width={500}
            height={350}
            className="w-3/6"
          />
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
