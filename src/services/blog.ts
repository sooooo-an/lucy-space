import { Post, PostData } from "@/types/post";
import { readFile } from "fs/promises";
import path from "path";

const FRONT_MATTER_REGEX = /^---\n([\s\S]+?)\n---/;

export const getAllPosts = async () => {
  const filePath = path.join(process.cwd(), "blog", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
};

export const getPostData = async (fileName: string): Promise<PostData> => {
  const filePath = path.join(process.cwd(), "blog", "posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) {
    throw new Error("Post not found");
  }

  const content = await readFile(filePath, "utf-8");
  return { ...post, content: content.replace(FRONT_MATTER_REGEX, "") };
};
