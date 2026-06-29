import { Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import BlogCard from "../../../components/BlogCard";
import SEO from "../../../components/SEO";
import { getAllTags, getPostsByTag, Post } from "../../../utils/blog";

type TagPageProps = {
  tag: string;
  tagSlug: string;
  posts: Post[];
};

export default function TagPage({ tag, tagSlug, posts }: TagPageProps) {
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <SEO
        title={`Posts tagged “${tag}”`}
        description={`All articles tagged ${tag} by Manikanta Inugurthi.`}
        path={`/blog/tag/${tagSlug}`}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <TagIcon className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {tag}
          </h1>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} tagged{" "}
          <span className="font-medium">{tag}</span>.{" "}
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← All posts
          </Link>
        </p>

        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4">
          {posts.map(({ frontMatter, slug }) => (
            <BlogCard
              key={slug}
              title={frontMatter.title}
              description={frontMatter.description ?? ""}
              slug={slug}
              date={frontMatter.date ?? ""}
              thumbnailUrl={frontMatter.thumbnailUrl}
              category={frontMatter.category}
              tags={frontMatter.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: getAllTags().map(({ slug }) => ({ params: { tag: slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { tag: string };
}) => {
  const tagSlug = params.tag;
  const posts = getPostsByTag(tagSlug);
  const tag = getAllTags().find((t) => t.slug === tagSlug)?.tag ?? tagSlug;

  return { props: { tag, tagSlug, posts } };
};
