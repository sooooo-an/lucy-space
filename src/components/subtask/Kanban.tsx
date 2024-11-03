"use client";

import React, { useState } from "react";
import TaskList from "./TaskList";
import CreateTaskInput from "./CreateTaskInput";
import { useAuth } from "@/contexts/AuthContext";
import AddIcon from "../ui/icons/AddIcon";
import { useLoginModal } from "@/contexts/LoginModalContext";
import { BoardData } from "@/types/task";

type Props = {
  board: BoardData;
};

export default function Kanban({ board: { title, tasks } }: Props) {
  const { user } = useAuth();
  const [isCreateTaskInput, toggleCreateTaskInput] = useState(false);
  const { onOpen } = useLoginModal();

  const onClickAddTask = () => {
    if (!user) {
      onOpen();
      return;
    }

    toggleCreateTaskInput(true);
  };

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
      <TaskList />

      {isCreateTaskInput ? (
        <CreateTaskInput />
      ) : (
        <button
          onClick={onClickAddTask}
          className="bg-white flex w-full p-2 text-gray-400 items-center justify-center rounded-lg my-2 shadow-sm border border-gray-100"
        >
          <AddIcon />
        </button>
      )}
    </article>
  );
}
