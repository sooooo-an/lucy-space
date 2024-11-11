import React from "react";
import Kanban from "./Kanban";
import { KanbanData } from "@/types/task";

type Props = {
  boards: KanbanData[];
};

export default function KanbanBoard({ boards }: Props) {
  return (
    <section className="flex flex-1 gap-8 overflow-x-auto p-4">
      {boards?.map((board) => (
        <Kanban key={board.id} board={board} />
      ))}
    </section>
  );
}
