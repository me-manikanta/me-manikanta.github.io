import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          It seems you've found something that used to exist, or you spelled
          something wrong. As you're here, here's a "Dad Joke" for you.
        </p>
        <DadJoke />
        <Link href="/">
          <a className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </>
  );
};

const DadJoke = () => {
  const [joke, setJoke] = useState({
    isLoading: true,
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchJoke().then((res) => setJoke(res!!));
  }, []);

  return (
    <div className="border-dashed border-2 p-2 border-gray-500 text-gray-600 dark:text-gray-400 mb-8 flex flex-col justify-center items-start max-w-2xl mx-auto">
      <span>
        {joke.question}
        {joke.answer == "" ? "" : "?"}
      </span>
      <p>{joke.answer}</p>
    </div>
  );
};

const fetchJoke = async () => {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}, ${response.statusText}`;
      const error = new Error(message);
      throw error;
    }

    const joke = await response.json();
    const questionAndAnswer = joke.joke.split("?");
    return {
      question: questionAndAnswer[0],
      answer: questionAndAnswer[1],
      isLoading: false,
    };
  } catch (error: any) {
    console.error(`ERROR \n${error.message}`);
  }
};

export default NotFoundPage;
