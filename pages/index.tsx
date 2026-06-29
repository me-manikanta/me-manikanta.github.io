import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";
import { ExternalLink } from "../components/ExternalLink";
import { Avatar } from "../components/Avatar";
import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";
import { personJsonLd, websiteJsonLd } from "../utils/structuredData";
import { getAllPosts, Post } from "../utils/blog";
import config, { components } from "../markdoc.config";

interface HomeProps {
  bioContent: string;
  latestPosts: Post[];
}

const Home: NextPage<HomeProps> = ({ bioContent, latestPosts }) => {
  const ast = Markdoc.parse(bioContent);
  const mdContent = Markdoc.transform(ast, config);

  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
      <SEO jsonLd={[personJsonLd(), websiteJsonLd()]} />
      <div className="flex flex-col-reverse sm:flex-row items-start mb-16">
        <div className="flex flex-col sm:pr-8">
          <h1
            className="text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white"
          >
            Manikanta Inugurthi
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Senior Software Engineer at{" "}
            <span className="font-semibold">Microsoft</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-8">
            Software Engineer 🧑‍💻 | Tech Blogger 📝 | Coffee Lover{" "}
            <span className="text-4xl">&#9749;</span>
          </p>
        </div>
        <div className="relative mb-8 sm:mb-0 mx-auto sm:mr-0">
          <div className="block sm:hidden">
            <Avatar
              alt="Manikanta Inugurthi"
              src="/assets/selfie.png"
              size={100}
            />
          </div>
          <div className="hidden sm:block">
            <Avatar
              alt="Manikanta Inugurthi"
              src="/assets/selfie.png"
              size={200}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="mb-8 prose dark:prose-dark leading-6">
          {Markdoc.renderers.react(mdContent, React, { components })}
        </div>
      </div>

      {latestPosts.length > 0 && (
        <div className="w-full mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Latest writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              All posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {latestPosts.map(({ frontMatter, slug }) => (
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
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const bioPath = path.join("meta", "bio.md");
  const bioFile = fs.readFileSync(bioPath, "utf8");
  const { content: bioContent } = matter(bioFile);

  const latestPosts = getAllPosts().slice(0, 3);

  return {
    props: {
      bioContent,
      latestPosts,
    },
  };
};

export default Home;
