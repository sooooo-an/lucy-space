export type Task = {
  id: string;
  title: string;
  deadline: string;
  assignner: string[];
  subtasks: string[];
  todos: number;
};

export type TaskData = Task & {};
