import { $Enums } from "@prisma/client";

export type Task = {
  id: string;
  title: string;
  deadline?: Date;
  assigneeId: string;
  subtasks?: string[];
  todos?: number;
  kanbanId: $Enums.TaskStatus;
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
  status: $Enums.TaskStatus;
  tasks: string[];
};

// id        String   @id @default(cuid())
//   title     String
//   deadline  DateTime
//   content   String?
//   parentId  String?
//   subtasks  Task[]   @relation("TaskToSubtasks")
//   parent    Task?    @relation("TaskToSubtasks", fields: [parentId], references: [id])
//   status    TaskStatus   @default(BACKLOG)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   creator   User     @relation(fields: [creatorId], references: [id])
//   creatorId String
//   board    Board   @relation("BoardToTasks", fields: [boardId], references: [id])
//   boardId  String
