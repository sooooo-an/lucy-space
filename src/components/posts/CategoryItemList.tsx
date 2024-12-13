import React from "react";
import Link from "next/link";
import { CategoryData } from "@/types/post";

type Props = {
  categories: CategoryData;
  category: string;
};

export default function CategoryItemList({ categories, category }: Props) {
  return (
    <ul>
      {categories[category].map(({ path, title }) => (
        <li key={path} className="pb-1">
          <Link
            href={`/posts/${path}`}
            className="font-normal text-sm block text-text-secondary truncate hover:text-text-primary"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
