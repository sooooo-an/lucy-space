import { CategoryData } from "@/types/post";
import React from "react";
import CategoryItemList from "./CategoryItemList";

type Props = {
  categories: CategoryData;
  category: string;
};

export default function CategoryItem({ category, categories }: Props) {
  return (
    <li key={category} className="font-semibold mb-4 text-sm text-text-primary">
      <p className="pb-1">{category}</p>
      <CategoryItemList categories={categories} category={category} />
    </li>
  );
}
