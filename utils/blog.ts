import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugifyTag } from "./posts";

const BLOGS_DIR = "blogs";

export type PostFrontMatter = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  category?: string;
  thumbnailUrl?: string;
  [key: string]: unknown;
};

export type Post = {
  slug: string;
  frontMatter: PostFrontMatter;
};

/** Read all posts' frontmatter, sorted by date (most recent first). */
export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOGS_DIR);
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.split(".")[0],
      frontMatter: data as PostFrontMatter,
    };
  });

  posts.sort((a, b) => {
    const timeA = new Date(a.frontMatter.date ?? "").getTime();
    const timeB = new Date(b.frontMatter.date ?? "").getTime();
    return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
  });

  return posts;
}

/** Unique tag labels across all posts, paired with their slug. */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontMatter.tags ?? []) {
      const slug = slugifyTag(tag);
      const existing = counts.get(slug);
      if (existing) existing.count += 1;
      else counts.set(slug, { tag, count: 1 });
    }
  }
  return Array.from(counts.entries())
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** All posts that carry the given tag (matched by slug), most recent first. */
export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((post) =>
    (post.frontMatter.tags ?? []).some((t) => slugifyTag(t) === tagSlug)
  );
}

/** A lightweight post reference for related/adjacent navigation. */
export type PostLink = {
  slug: string;
  title: string;
  date: string | null;
};

function toPostLink(post: Post): PostLink {
  return {
    slug: post.slug,
    title: post.frontMatter.title,
    date: post.frontMatter.date ?? null,
  };
}

/**
 * For a given post slug, compute up to `limit` related posts plus the
 * chronologically previous/next posts. Related posts are ranked by shared-tag
 * count, then recency; when there aren't enough tag matches, the most recent
 * other posts fill the remaining slots. Posts are date-sorted (newest first),
 * so "prev" is the older neighbour and "next" is the newer one.
 */
export function getRelatedAndAdjacent(
  slug: string,
  limit = 3
): { related: PostLink[]; prev: PostLink | null; next: PostLink | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { related: [], prev: null, next: null };

  const current = posts[index];
  const currentTags = new Set(
    (current.frontMatter.tags ?? []).map((t) => slugifyTag(t))
  );

  const newer = index > 0 ? posts[index - 1] : null; // sorted newest-first
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  const others = posts.filter((p) => p.slug !== slug);
  const scored = others
    .map((post, i) => {
      const shared = (post.frontMatter.tags ?? []).filter((t) =>
        currentTags.has(slugifyTag(t))
      ).length;
      return { post, shared, order: i };
    })
    .sort((a, b) => b.shared - a.shared || a.order - b.order);

  const related = scored.slice(0, limit).map(({ post }) => toPostLink(post));

  return {
    related,
    prev: older ? toPostLink(older) : null,
    next: newer ? toPostLink(newer) : null,
  };
}
