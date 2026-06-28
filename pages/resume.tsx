import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import type { GetStaticProps, NextPage } from "next";
import config, { components } from "../markdoc.config";
import SEO from "../components/SEO";

interface ResumeProps {
  content: string;
}

const ResumePage: NextPage<ResumeProps> = ({ content }) => {
  const ast = Markdoc.parse(content);
  const mdContent = Markdoc.transform(ast, config);

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Resume"
        description="Resume of Manikanta Inugurthi — Senior Software Engineer at Microsoft."
        noindex
      />
      <div className="flex flex-col justify-center max-w-3xl mx-auto mb-16">
        <div className="w-full prose prose-h1:text-center dark:prose-dark leading-6">
          {Markdoc.renderers.react(mdContent, React, { components })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resumePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "Resume.md"
  );
  const file = fs.readFileSync(resumePath, "utf8");
  const { content } = matter(file);

  return {
    props: {
      content,
    },
  };
};

export default ResumePage;
