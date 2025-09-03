import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";
import { ExternalLink } from "../components/ExternalLink";
import config, { components } from "../markdoc.config";

interface HomeProps {
  bioContent: string;
}

const Home: NextPage<HomeProps> = ({ bioContent }) => {
  const ast = Markdoc.parse(bioContent);
  const mdContent = Markdoc.transform(ast, config);

  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
      <div className="flex flex-col-reverse sm:flex-row items-start mb-16">
        <div className="flex flex-col pr-8">
          <h1
            className="text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white"
          >
            Manikanta Inugurthi
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Software Engineer II in Machine Translation team at{" "}
            <span className="font-semibold">Microsoft</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-8">
            Software Engineer 🧑‍💻 | Tech Blogger 📝 | Coffee Lover{" "}
            <span className="text-4xl">&#9749;</span>
          </p>
        </div>
        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mx-auto sm:mr-0">
          <Image
            alt="Manikanta Inugurthi"
            height={176}
            width={176}
            src="/assets/selfie.jpg"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-8 prose dark:prose-dark leading-6">
          {Markdoc.renderers.react(mdContent, React, { components })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const bioPath = path.join("meta", "bio.md");
  const bioFile = fs.readFileSync(bioPath, "utf8");
  const { content: bioContent } = matter(bioFile);

  return {
    props: {
      bioContent,
    },
  };
};

export default Home;
