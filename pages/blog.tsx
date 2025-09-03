import fs from "fs";
import matter from "gray-matter";
import path from "path";
import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import BlogCard from "../components/BlogCard";

export default function Blog({ blogPosts }: any) {
  // Extract all unique tags from blog posts
  const allTags = Array.from(
    new Set(
      blogPosts
        .flatMap((post: any) => post.frontMatter.tags || [])
        .sort()
    )
  ) as string[];

  // Extract categories from blog posts (if they exist)
  const allCategories = Array.from(
    new Set(
      blogPosts
        .map((post: any) => post.frontMatter.category)
        .filter(Boolean)
        .sort()
    )
  ) as string[];
  
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const filteredPosts = blogPosts.filter((post: any) => {
    const tagMatch = selectedTag === "All" || (post.frontMatter.tags && post.frontMatter.tags.includes(selectedTag));
    const categoryMatch = selectedCategory === "All" || post.frontMatter.category === selectedCategory;
    return tagMatch && categoryMatch;
  });

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Blog
          </h1>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Thoughts on software development, tech insights, and learnings from my journey.
        </p>
        
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("All")}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  selectedTag === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? "All" : tag)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Category Filter */}
        {allCategories.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  selectedCategory === "All"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                All
              </button>
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? "All" : category)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4">
          {filteredPosts.map((blogPost: any, index: number) => {
            const { frontMatter, slug } = blogPost;
            return (
              <BlogCard
                key={slug}
                title={frontMatter.title}
                description={frontMatter.description}
                slug={slug}
                date={frontMatter.date}
                thumbnailUrl={frontMatter.thumbnailUrl}
                category={frontMatter.category}
                tags={frontMatter.tags}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("blogs");

  const blogPosts = files.map((file) => {
    const markDownWithMeta = fs.readFileSync(path.join("blogs", file));
    const { data: frontMatter } = matter(markDownWithMeta);

    return {
      frontMatter,
      slug: file.split(".")[0],
    };
  });

  return { props: { blogPosts } };
};
