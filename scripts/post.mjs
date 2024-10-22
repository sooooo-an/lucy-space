import { writeFileSync, readFileSync, readdirSync } from "fs";
import path from "path";

const FRONT_MATTER_REGEX = /^---\n([\s\S]+?)\n---/;
const NEW_LINE_REGEX = /\n/g;
const SPECIAL_CHARACTERS_REGEX = /[*#\-`]/g;

const extractFrontMatter = (content, fileName) => {
  const match = content.match(FRONT_MATTER_REGEX);
  const description =
    content
      .replace(FRONT_MATTER_REGEX, "")
      .replace(NEW_LINE_REGEX, " ")
      .replace(SPECIAL_CHARACTERS_REGEX, "")
      .trim()
      .substring(0, 100) + "...";

  const initialValue = {
    title: fileName,
    description,
    date: "" || new Date().toISOString(),
    category: "",
    path: fileName,
    thumbnail: "",
  };

  if (match && match[1]) {
    return match[1].split("\n").reduce((acc, line) => {
      const [key, value] = line.split(":").map((str) => str.trim());
      return { ...acc, ...(key && value ? { [key]: value } : {}) };
    }, initialValue);
  }
  return initialValue;
};

const saveAsJson = (data, outputPath) => {
  const json = JSON.stringify(data, null, 2);
  writeFileSync(outputPath, json, "utf-8");
  console.log(`Saved as ${outputPath}`);
};

const processMarkdownFiles = (markdownFiles, jsonOutputPath) => {
  const results = [];

  for (const filePath of markdownFiles) {
    const content = readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath);
    const frontMatter = extractFrontMatter(content, fileName);
    if (frontMatter) {
      results.push(frontMatter);
    } else {
      console.error(`Failed to extract front matter from ${filePath}`);
    }
  }

  saveAsJson(results, jsonOutputPath);
};

const convertMarkdownToJSON = () => {
  const markdownPath = path.join(process.cwd(), "blog", "posts");
  const markdownFiles = readdirSync(markdownPath)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => path.join(markdownPath, file));

  const jsonOutputPath = path.join(process.cwd(), "blog", "posts.json");
  processMarkdownFiles(markdownFiles, jsonOutputPath);
};

convertMarkdownToJSON();
