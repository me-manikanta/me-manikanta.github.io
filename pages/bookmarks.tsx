import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { Bookmarks as BookmarksData } from "../data/Bookmarks";
import SEO from "../components/SEO";

export default function Bookmarks() {
  const allTags = Array.from(
    new Set(BookmarksData.flatMap((bookmark) => bookmark.tags || []).sort())
  );

  const [selectedTag, setSelectedTag] = useState("All");

  const filteredBookmarks =
    selectedTag === "All"
      ? BookmarksData
      : BookmarksData.filter((bookmark) =>
          bookmark.tags?.includes(selectedTag)
        );

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Bookmarks"
        description="A collection of interesting links, tools, and resources I've found on the web."
        noindex
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Bookmark className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Bookmarks
          </h1>
        </div>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          A collection of interesting links, tools, and resources I&apos;ve found on
          Web.
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
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? "All" : tag)
                  }
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

        <div className="w-full">
          <ul className="space-y-4">
            {filteredBookmarks.map((bookmark, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <span className="mr-2">•</span>
                    {bookmark.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
