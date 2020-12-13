import fs from "fs";
import path from "path";

import { getMarkdownMeta, getMarkdownAsHTML } from "./helpers";

export function getAllDocsData(dir) {
  const directory = path.join(process.cwd(), dir);
  const fileNames = fs.readdirSync(directory);
  const allDocsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = getMarkdownMeta(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allDocsData.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA > titleB) return 1;
    if (titleA < titleB) return -1;
    return 0;
  });
}

export function getAllDocsIds(dir) {
  const directory = path.join(process.cwd(), dir);
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getDocData(id, dir) {
  const directory = path.join(process.cwd(), dir);
  const fullPath = path.join(directory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = getMarkdownMeta(fileContents);
  const contentHtml = await getMarkdownAsHTML(matterResult.content);

  return {
    id,
    contentHtml: contentHtml.toString(),
    ...matterResult.data,
  };
}
