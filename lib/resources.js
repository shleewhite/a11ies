import fs from "fs";
import path from "path";

import { getMarkdownMeta, getMarkdownAsHTML } from "./helpers";

const resourcesDirectory = path.join(process.cwd(), "resources");

export function getAllResourceData() {
  const fileNames = fs.readdirSync(resourcesDirectory);
  const allResourceData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(resourcesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = getMarkdownMeta(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allResourceData.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA > titleB) return 1;
    if (titleA < titleB) return -1;
    return 0;
  });
}

export function getAllResourceIds() {
  const fileNames = fs.readdirSync(resourcesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getResourceData(id) {
  const fullPath = path.join(resourcesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = getMarkdownMeta(fileContents);
  const contentHtml = await getMarkdownAsHTML(matterResult.content);

  return {
    id,
    contentHtml: contentHtml.toString(),
    ...matterResult.data,
  };
}
