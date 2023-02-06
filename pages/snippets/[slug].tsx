import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";

const Snippet = (props: any) => {
  const { frontMatter, content } = props;
  const ast = Markdoc.parse(content);
  const mdContent = Markdoc.transform(ast);
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {frontMatter.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {frontMatter.description}
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <img
              alt={frontMatter.title}
              height={48}
              width={48}
              src={frontMatter.logo}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark mx-auto">
          {Markdoc.renderers.react(mdContent, React)}
        </div>
      </article>
    </div>
  );
};

export default Snippet;

export const getStaticPaths = async () => {
  const files = fs.readdirSync("snippets");

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

export function Callout({ children }: any) {
  return <div className="callout">Hello world</div>;
}

export const getStaticProps = async ({ params: { slug } }: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("snippets", slug + ".md"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  return { props: { frontMatter, slug, content } };
};
