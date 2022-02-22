import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  return (
    <>
      <h1>404 | Page Not Found</h1>
      <h2>Here's a "Dad Joke" for you</h2>
      <DadJoke />
    </>
  );
};

const DadJoke = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    fetchJoke().then((res) => setJoke(res.joke));
  }, []);

  return <>{joke}</>;
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
    return joke;
  } catch (error: any) {
    console.error(`ERROR \n${error.message}`);
  }
};

export default Page;
