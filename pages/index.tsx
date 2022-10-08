import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
      <div className="flex flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            Manikanta Inugurthi
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Software Engineer II in Machine Translation team at{" "}
            <span className="font-semibold">Microsoft</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-8 mb-16">
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
    </div>
  );
};

export default Home;
