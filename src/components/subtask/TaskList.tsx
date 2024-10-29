import React from "react";

export default function TaskList() {
  return (
    <ul>
      <li>
        <h4>title</h4>
        <span>deadline</span>
      </li>
    </ul>
  );
}

// export type Task = {
//   id: string;
//   title: string;
//   deadline: string;
//   assignner: string[];
//   subtasks: string[];
//   todos: number;
// };
