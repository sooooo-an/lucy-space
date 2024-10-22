import { Post } from "@/types/post";
import { readFile } from "fs/promises";
import path from "path";

export const getAllPosts = async () => {
  const filePath = path.join(process.cwd(), "blog", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
};
