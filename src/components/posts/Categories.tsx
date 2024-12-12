"use client";

import { CategoryData } from "@/types/post";
import React, { useState } from "react";
import CategoryItemList from "./CategoryItemList";
import FoldIcon from "../ui/icons/FoldIcon";

type Props = {
  categories: CategoryData;
};

const WEB_CATEGORY_STYLE =
  " lg:flex-shrink-0 lg:basis-1/5 lg:static lg:h-auto lg:bg-transparent";
const MOBILE_CATEGORY_STYLE = "absolute h-full bg-background transition-all";

export default function Categories({ categories }: Props) {
  const [isFolded, setIsOpen] = useState(false);
  return (
    <section
      className={`border-r border-r-border ${WEB_CATEGORY_STYLE} ${MOBILE_CATEGORY_STYLE} ${
        isFolded ? "-left-[259px]" : "left-0"
      }`}
    >
      <ul className="p-3 lg:sticky lg:top-20 static">
        {Object.keys(categories).map((category) => (
          <li
            key={category}
            className="font-semibold mb-4 text-sm text-text-primary"
          >
            <p className="pb-1">{category}</p>
            <CategoryItemList categories={categories} category={category} />
          </li>
        ))}
      </ul>
      <button
        className="absolute -right-6 bg-text-secondary/90 h-20 w-6 rounded-tr-2xl rounded-br-2xl top-1/2 -translate-y-1/2  flex items-center justify-center text-white lg:hidden"
        onClick={() => setIsOpen(!isFolded)}
      >
        <FoldIcon isFolded={isFolded} />
      </button>
    </section>
  );
}
