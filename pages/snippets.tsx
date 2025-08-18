import fs from "fs";
import matter from "gray-matter";
import path from "path";
import React, { useState } from "react";
import { Code, Filter } from "lucide-react";
import SnippetCard from "../components/SnippetCard";

export default function Snippets({ snippets }: any) {
  const allTags = Array.from(
    new Set(
      snippets
        .flatMap((snippet: any) => snippet.frontMatter.tags || [])
        .sort()
    )
  ) as string[];
  
  const [selectedTag, setSelectedTag] = useState<string>("All");
  
  const filteredSnippets = selectedTag === "All" 
    ? snippets 
    : snippets.filter((snippet: any) => 
        snippet.frontMatter.tags?.includes(selectedTag)
      );

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Snippets
          </h1>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Some handy code snippets and commands for everyday development tasks.
        </p>
        
        {allTags.length > 0 && (
          <div className="w-full mb-6">
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
        
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {filteredSnippets.map((snippet: any) => (
            <SnippetCard
              key={snippet.slug}
              {...snippet["frontMatter"]}
              slug={snippet.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("snippets");

  const snippets = files.map((file) => {
    const markDownWithMeta = fs.readFileSync(path.join("snippets", file));
    const { data: frontMatter } = matter(markDownWithMeta);

    return {
      frontMatter,
      slug: file.split(".")[0],
    };
  });

  return { props: { snippets } };
};
