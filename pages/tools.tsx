import React, { useState } from "react";
import { ExternalLink, Wrench, Filter } from "lucide-react";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
}

const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    url: "https://jsonformatter.curiousconcept.com/",
    category: "Development"
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    url: "https://www.base64encode.org/",
    category: "Encoding"
  },
  {
    name: "RegEx Tester",
    description: "Test and debug regular expressions",
    url: "https://regex101.com/",
    category: "Development"
  },
  {
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes",
    url: "https://coolors.co/",
    category: "Design"
  },
  {
    name: "Can I Use",
    description: "Browser compatibility tables for web technologies",
    url: "https://caniuse.com/",
    category: "Web Development"
  },
  {
    name: "Excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams",
    url: "https://excalidraw.com/",
    category: "Design"
  },
  {
    name: "LeetCode Test Case Generator",
    description: "Generate test cases for LeetCode problems with custom inputs",
    url: "/tools/leetcode-generator",
    category: "Development"
  }
];

function ToolCard({ tool }: { tool: Tool }) {
  const isExternal = tool.url.startsWith('http');
  
  const cardContent = (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tool.name}
            </h3>
            {isExternal && <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {tool.description}
          </p>
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded">
            {tool.category}
          </span>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={tool.url}>
      {cardContent}
    </Link>
  );
}

export default function Tools() {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Tools
          </h1>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          A curated collection of useful tools and resources that I use regularly for development, design, and productivity.
        </p>
        
        {/* Filter Section */}
        <div className="w-full mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? "All" : category)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tools Grid */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
