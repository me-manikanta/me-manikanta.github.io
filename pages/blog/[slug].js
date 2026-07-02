import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";
import config, { components } from "../../markdoc.config";
import SEO from "../../components/SEO";
import { excerpt, toISODate, readingTimeMinutes } from "../../utils/posts";
import { blogPostingJsonLd } from "../../utils/structuredData";
import { getRelatedAndAdjacent } from "../../utils/blog";
import Link from "next/link";

const Blog = (props) => {
  const { frontMatter, slug, content, related } = props;

  const ast = Markdoc.parse(content);
  const mdContent = Markdoc.transform(ast, config);
  const description = frontMatter.description || excerpt(content);
  const ogImage = frontMatter.ogImage || frontMatter.thumbnailUrl;
  const datePublished = frontMatter.date
    ? toISODate(frontMatter.date)
    : undefined;
  const readTime = readingTimeMinutes(content);
  return (
    <>
      <SEO
        title={frontMatter.title}
        description={description}
        type="article"
        image={ogImage}
        publishedTime={datePublished}
        tags={frontMatter.tags}
        jsonLd={blogPostingJsonLd({
          title: frontMatter.title,
          description,
          slug,
          datePublished,
          image: ogImage,
          tags: frontMatter.tags,
        })}
      />
      <div className="w-full prose dark:prose-dark mx-auto">
        <h1 className="text-center mb-1">{frontMatter.title}</h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-0">
          {readTime} min read
          {frontMatter.date && (
            <>
              {" · "}
              <time dateTime={datePublished}>{frontMatter.date}</time>
            </>
          )}
        </p>
        <hr className="mt-4" />
        {Markdoc.renderers.react(mdContent, React, { components })}
      </div>

      {related.length > 0 && (
        <div className="w-full max-w-3xl mx-auto mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">
            Other blogs you might like
          </h2>
          <ul className="space-y-2">
            {related.map((post) => (
              <li
                key={post.slug}
                className="flex items-baseline justify-between gap-4"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>
                {post.date && (
                  <span className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const files = fs.readdirSync("blogs");

  const paths = files.map((file) => ({
    params: {
      slug: file.split(".")[0],
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("blogs", slug + ".md"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  const { related } = getRelatedAndAdjacent(slug);

  return { props: { frontMatter, slug, content, related } };
};
