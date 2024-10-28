import { getBlocksFromPage } from "@/services/notion";
import React from "react";

export default async function AboutPage() {
  const blocks = await getBlocksFromPage(
    process.env.NEXT_PUBLIC_NOTION_ABOUT_PAGE_ID || ""
  );

  return (
    <div
      className="flex container flex-col"
      dangerouslySetInnerHTML={{ __html: blocks?.join("") || "" }}
    ></div>
  );
}
