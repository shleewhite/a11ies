import fs, { read } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const resourcesDirectory = path.join(process.cwd(), 'resources');

export function getAllResourceData() {
  const fileNames = fs.readdirSync(resourcesDirectory)
  const allResourceData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(resourcesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allResourceData.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA > titleB) return 1;
    if (titleA < titleB) return -1;
    return 0;
  })
}

export function getAllResourceIds() {
  const fileNames = fs.readdirSync(resourcesDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getResourceData(id) {
  const fullPath = path.join(resourcesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

