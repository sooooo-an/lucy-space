import React from "react";

type Props = {
  title: string;
  date: string;
  list: string[];
};

export default function HistoryBox({ title, date, list }: Props) {
  return (
    <div className="mb-6 relative before:absolute before:w-2 before:h-2 before:rounded before:bg-gray-400 before:-left-7 before:top-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{date}</p>
      <ul className="pl-6 list-disc">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
