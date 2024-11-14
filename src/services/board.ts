import { KanbanData } from "@/types/task";
import { readFile } from "fs/promises";
import path from "path";

export const getBoards = async () => {
  const filePath = path.join(process.cwd(), "data", "boards.json");
  return readFile(filePath, "utf-8").then<KanbanData[]>(JSON.parse);
};
