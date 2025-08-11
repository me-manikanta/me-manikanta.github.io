import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "../components/AnimatedTitle";
import { ExternalLink } from "../components/ExternalLink";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row items-start mb-16">
        <div className="flex flex-col pr-8">
          <AnimatedTitle />
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Software Engineer II in Machine Translation team at{" "}
            <span className="font-semibold">Microsoft</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-8">
            Software Engineer 🧑‍💻 | Tech Blogger 📝 | Coffee Lover{" "}
            <span className="text-4xl">&#9749;</span>
          </p>
        </div>
        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Manikanta Inugurthi"
            height={176}
            width={176}
            src="/assets/selfie.jpeg"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="w-full">
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2 className="text-gray-200">Bio</h2>
          <p className="text-gray-400">
            Hey I am Mani. I work as an ML Ops Engineer at{" "}
            <ExternalLink href="https://www.microsoft.com/">Microsoft</ExternalLink>, where I
            and my team help in building translation models.
          </p>
          <p className="text-gray-400">
            Graduated from Birla Institute of Technology, Mesra with a B.E. in
            Information Technology.
          </p>
          
          <h2 className="text-gray-200">Links</h2>
          <ul className="text-gray-400">
            <li>
              Twitter:{" "}
              <ExternalLink href="https://twitter.com/me_manikanta">
                @me_manikanta
              </ExternalLink>
            </li>
            <li>
              GitHub:{" "}
              <ExternalLink href="https://github.com/me-manikanta">
                @me-manikanta
              </ExternalLink>
            </li>
            <li>
              LinkedIn:{" "}
              <ExternalLink href="https://www.linkedin.com/in/manikantainugurthi/">
                manikantainugurthi
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
