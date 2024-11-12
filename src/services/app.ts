import path from "path";
import { readFile } from "fs/promises";
import { AppInfoResponseType } from "@/types/app";
import { BuilderType } from "@/types/builder";

export const getAppInfo = async (): Promise<AppInfoResponseType> => {
  const filePath = path.join(process.cwd(), "data", "app.json");
  return readFile(filePath, "utf-8").then(JSON.parse);
};

export const getAppBuilder = async (): Promise<{
  channelLayer: BuilderType;
  taskModal: BuilderType;
  rightPanel: BuilderType;
}> => {
  const filePath = path.join(process.cwd(), "data", "builder.json");
  return readFile(filePath, "utf-8").then(JSON.parse);
};
