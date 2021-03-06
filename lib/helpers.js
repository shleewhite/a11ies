import remark from "remark";
import html from "remark-html";
import matter from "gray-matter";

export function getMarkdownMeta(md) {
  return matter(md);
}

export async function getMarkdownAsHTML(md) {
  const processedContent = await remark().use(html).process(md);
  return processedContent.toString();
}

export function getFirstFocusable(el) {
  const focusable = el.querySelectorAll(
    "button, [href], input, select, textarea"
  );
  return focusable[0];
}
