export type Task = {
  id: string;
  title: string;
  deadline?: Date;
  assigneeId: string;
  subtasks?: string[];
  todos?: number;
  kanbanId: string;
};

export const enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export type KanbanData = {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: string[];
};
