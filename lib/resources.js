import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const resourcesDirectory = path.join(process.cwd(), 'resources');

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

export function getResourceData(id) {
  const fullPath = path.join(resourcesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

