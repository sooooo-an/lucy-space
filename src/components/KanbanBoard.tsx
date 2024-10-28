import React from "react";
import Kanban from "./Kanban";

export default function KanbanBoard() {
  return (
    <section className="flex flex-1 gap-8 overflow-x-auto p-4">
      <Kanban title="Backlog Tasks" />
      <Kanban title="To Do Tasks" />
      <Kanban title="In Process" />
      <Kanban title="Done" />
    </section>
  );
}
