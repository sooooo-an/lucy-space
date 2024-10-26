import React from "react";
import TaskList from "./TaskList";

type Props = {
  title: string;
  // color: string;
  // tasks: Task[];
};

export default function Kanban({ title }: Props) {
  return (
    <article className="w-[300px] p-2 flex-shrink-0 flex-grow-0 flex-auto">
      <div className="flex gap-4 mb-8">
        <h3 className="font-semibold">{title}</h3>
        <span className="w-6 h-6 rounded-full bg-yellow-400/25 flex items-center justify-center text-xs text-yellow-800 font-bold">
          2
        </span>
      </div>
      <TaskList />
    </article>
  );
}
