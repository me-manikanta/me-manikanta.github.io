import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";

const Blog = (props) => {
  const { frontMatter, content } = props;

  const ast = Markdoc.parse(content);
  const mdContent = Markdoc.transform(ast /* config */);
  return           <div className="w-full mt-4 prose dark:prose-dark max-w-none">{Markdoc.renderers.react(mdContent, React)}</div>;
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
