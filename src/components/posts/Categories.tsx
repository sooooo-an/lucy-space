import React from "react";

type Props = {
  onClick: (category: string) => void;
  categories: string[];
  selected: string;
};

export default function Categories({ onClick, categories, selected }: Props) {
  return (
    <ul className="flex gap-4 py-4 flex-wrap">
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => onClick(category)}
            className={`text-lg font-bold ${
              selected === category
                ? "text-purple-600 underline"
                : "text-gray-400"
            }`}
          >
            #{category}
          </button>
        </li>
      ))}
    </ul>
  );
}
