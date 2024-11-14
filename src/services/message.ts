import { writeFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

export const getAllMessage = async () => {
  const filePath = path.join(process.cwd(), "data", "message.json");
  return readFile(filePath, "utf-8").then<string[]>(JSON.parse);
};

export const sendMessage = async (newMessage: string) => {
  const message = await getAllMessage();
  message.push(newMessage);
  const json = JSON.stringify(message, null, 2);
  writeFileSync(path.join(process.cwd(), "data", "message.json"), json);
  return newMessage;
};
