import fs from "fs";
import matter from "gray-matter";
import path from "path";
import SnippetCard from "../components/SnippetCard";

export default function Snippets({ snippets }: any) {
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Snippets
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Some handy code snippets/commands
        </p>
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {snippets.map((snippet: any) => (
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
