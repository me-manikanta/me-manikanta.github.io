import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";

const Blogs = (props) => {
  const { blogPosts } = props;
  return (
    <div>
      {blogPosts.map((blogPost, index) => {
        const { frontMatter, slug } = blogPost;
        return (
          <Link href={`blog/${slug}`} key={index}>
            <h1>{frontMatter.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Blogs;

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
