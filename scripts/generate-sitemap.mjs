// Generates out/sitemap.xml at build time (postbuild) for the static export.
// Only includes indexable pages: home, about, blog, snippets, and all posts.
// tools/bookmarks/resume/404 are intentionally excluded (noindex).
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://me-manikanta.github.io";
const OUT_DIR = "out";

function toISODate(humanDate) {
  if (!humanDate) return undefined;
  const d = new Date(humanDate);
  if (Number.isNaN(d.getTime())) return undefined;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readPosts(dir, urlPrefix) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        loc: `${SITE_URL}${urlPrefix}/${file.replace(/\.md$/, "")}`,
        lastmod: toISODate(data.date),
      };
    });
}

function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readTagUrls(dir) {
  if (!fs.existsSync(dir)) return [];
  const slugs = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
    for (const tag of data.tags ?? []) slugs.add(slugifyTag(tag));
  }
  return Array.from(slugs).map((slug) => ({
    loc: `${SITE_URL}/blog/tag/${slug}`,
    lastmod: today,
  }));
}

const today = toISODate(new Date().toString());

const staticPages = [
  { loc: `${SITE_URL}`, lastmod: today },
  { loc: `${SITE_URL}/about`, lastmod: today },
  { loc: `${SITE_URL}/blog`, lastmod: today },
  { loc: `${SITE_URL}/snippets`, lastmod: today },
];

const urls = [
  ...staticPages,
  ...readPosts("blogs", "/blog"),
  ...readPosts("snippets", "/snippets"),
  ...readTagUrls("blogs"),
];

const body = urls
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), xml);
console.log(`✓ sitemap.xml written with ${urls.length} URLs`);
