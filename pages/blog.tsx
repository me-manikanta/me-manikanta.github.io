import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import Image from "next/image";

export default function Blog({ blogPosts }: any) {
  return (
    <div className={"flex flex-col justify-center items-center py-16"}>
      {blogPosts.map((blogPost: any, index: number) => {
        const { frontMatter, slug } = blogPost;
        const { title, date, description } = frontMatter;
        return (
          <>
            <Link href={`blog/${slug}`} key={index}>
              <div
                className={
                  "flex justify-between items-center md:px-12 w-full max-w-2xl mb-8 cursor-pointer"
                }
              >
                <div>
                  <h1
                    className={
                      "mt-8 mb-4 text-xl font-bold tracking-tight text-black dark:text-white"
                    }
                  >
                    {title}
                  </h1>
                  <p className={"text-gray-600 dark:text-gray-400"}>
                    {description}
                  </p>
                  <p className={"text-gray-500 mt-3"}>{date}</p>
                </div>
                {frontMatter.thumbnailUrl && (
                  <Image
                    src={frontMatter.thumbnailUrl}
                    alt={"blog-pic"}
                    className={"h-24 w-24 md:h-40 md:w-40 rounded-2xl"}
                  />
                )}
              </div>
            </Link>
            <hr className="w-full lg:w-1/4 border-1 border-gray-200 dark:border-gray-800 mb-8" />
          </>
        );
      })}
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
