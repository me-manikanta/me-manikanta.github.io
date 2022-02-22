import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Timeline, Event } from "../components/Timeline";
import { data } from "../data/TimelineEvents";
import HeaderStyles from "../styles/Header.module.css";

const About: NextPage = () => {
  return (
    <>
      <Details />
      <Timeline>
        {data.map((datum, index) => (
          <Event key={index} {...datum} />
        ))}
      </Timeline>
      <Footer />
    </>
  );
};

const Details = () => {
  return (
    <>
      <h1 className={HeaderStyles.title}>About Me</h1>
      <p>
        Hi! My name is Mani and I&apos;m a Full Stack Developer. I live in
        Hyderabad, India
        <span role="img" aria-label="Philippines">
          {" "}
          🇮🇳
        </span>
        .
      </p>
      <p>
        My passion is to build softwares to solve practical problems along side
        understanding the human side of software development. In the words of{" "}
        <a href="https://blog.codinghorror.com/about-me">Jeff Atwood</a>{" "}
        "Computers are fascinating machines, but they're mostly a reflection of
        the people using them... you have to study the people <em>behind </em>
        the software, too."
      </p>
    </>
  );
};

export default About;
