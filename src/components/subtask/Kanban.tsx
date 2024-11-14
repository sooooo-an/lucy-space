"use client";

import React from "react";
import { KanbanData } from "@/types/task";

type Props = {
  board: KanbanData;
};

export default function Kanban({ board: { title, tasks } }: Props) {
  return (
    <article className="w-[300px] p-2 flex-shrink-0 flex-grow-0 flex-auto">
      <div className="flex gap-4 mb-8">
        <h3 className="font-semibold">{title}</h3>
        <span
          className={`relative w-6 h-6 rounded-full  flex items-center justify-center text-xs text-black font-bold bg-yellow-300/40 text-yellow-700`}
        >
          {tasks?.length}
        </span>
      </div>
    </article>
  );
}
