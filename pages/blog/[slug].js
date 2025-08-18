import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";
import config, { components } from "../../markdoc.config";

const Blog = (props) => {
  const { frontMatter, content } = props;

  const ast = Markdoc.parse(content);
  const mdContent = Markdoc.transform(ast, config);
  return (
    <>
      <div className="w-full prose dark:prose-dark mx-auto">
        <h1 className="text-center mb-1">{frontMatter.title}</h1>
        {/* Todo to show date and other metadta here */}
        <hr className="mt-4" />
        {Markdoc.renderers.react(mdContent, React, { components })}
      </div>
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

  // const ast = Markdoc.parse(content);
  // const mdContent = Markdoc.transform(ast /* config */);

  return { props: { frontMatter, slug, content } };
};
