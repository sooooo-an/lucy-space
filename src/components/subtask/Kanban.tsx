"use client";

import React, { useState } from "react";
import TaskList from "./TaskList";
import CreateTaskInput from "./CreateTaskInput";
import { useAuth } from "@/contexts/AuthContext";
import AddIcon from "../ui/icons/AddIcon";
import PortalModal from "../ui/PortalModal";
import LoginModal from "../auth/LoginModal";

type Props = {
  title: string;
  // color: string;
  // tasks: Task[];
};

export default function Kanban({ title }: Props) {
  const { user } = useAuth();
  const [isShow, setIsShow] = useState(false);

  return (
    <article className="w-[300px] p-2 flex-shrink-0 flex-grow-0 flex-auto">
      <div className="flex gap-4 mb-8">
        <h3 className="font-semibold">{title}</h3>
        <span className="w-6 h-6 rounded-full bg-yellow-400/25 flex items-center justify-center text-xs text-yellow-800 font-bold">
          2
        </span>
      </div>
      <TaskList />
      <button
        onClick={() => setIsShow(true)}
        className="bg-white flex w-full p-2 text-gray-400 items-center justify-center rounded-lg my-2 shadow-sm border border-gray-100"
      >
        <AddIcon />
      </button>

      {isShow && user && <CreateTaskInput />}
      {isShow && !user && (
        <PortalModal>
          <LoginModal onClose={() => setIsShow(false)} />
        </PortalModal>
      )}
    </article>
  );
}
