// Generates out/feed.xml (RSS 2.0) at build time (postbuild).
// Blog posts only, sorted newest-first, with excerpt-level descriptions.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://me-manikanta.github.io";
const SITE_NAME = "Manikanta Inugurthi";
const SITE_DESCRIPTION =
  "Thoughts on software development, tech insights, and learnings from my journey.";
const AUTHOR_EMAIL = "mani.inugurthi+hi@gmail.com";
const OUT_DIR = "out";
const BLOG_DIR = "blogs";

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\{%[\s\S]*?%\}/g, " ")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(markdown, maxLen = 200) {
  const text = toPlainText(markdown);
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLen).trim()}…`;
}

const posts = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const { data, content } = matter(
      fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    );
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || file,
      description: data.description || excerpt(content),
      date: data.date ? new Date(data.date) : null,
    };
  })
  .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

const lastBuildDate = new Date().toUTCString();

const items = posts
  .map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = post.date ? post.date.toUTCString() : lastBuildDate;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${AUTHOR_EMAIL} (${escapeXml(SITE_NAME)})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${escapeXml(SITE_NAME)})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "feed.xml"), xml);
console.log(`✓ feed.xml written with ${posts.length} items`);
