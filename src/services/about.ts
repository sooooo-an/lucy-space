import { AboutType } from "@/types/about";
import { readFile } from "fs/promises";
import path from "path";

export const getAbout = async () => {
  const filePath = path.join(process.cwd(), "data", "about.json");
  return readFile(filePath, "utf-8").then<AboutType>(JSON.parse);
};
