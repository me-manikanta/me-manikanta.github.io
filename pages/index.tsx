import type { NextPage } from "next";
import LinkedInIcon from "../public/assets/linkedin.svg";
import GitHubIcon from "../public/assets/github.svg";
import MailIcon from "../public/assets/mail.svg";
import ResumeIcon from "../public/assets/resume.svg";
import HeartIcon from "../public/assets/heart.svg";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.wrapperNormal}>
      <div className={`${styles.page} ${styles.home}`}>
        <header className={`${styles.headerHome} ${styles.animated}`}>
          <About />
          <Social />
        </header>
        <Footer />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <a className={styles.link} href="https://github.com/me-manikanta">
        <img
          className={styles.selfie}
          alt="Manikanta Inugurthi"
          src={"/assets/selfie.jpeg"}
        />
      </a>
      <h1 className={styles.title}>Manikanta Inugurthi</h1>
      <h2 className={styles.description}>
        <span className={styles.skills}>Software Engineer</span>
        &nbsp;|&nbsp;
        <span className={styles.skills}>Tech Enthusiast</span>
        &nbsp;|&nbsp;
        <span className={styles.skills}>Coffee Lover</span>
      </h2>
    </>
  );
};

const Social = () => {
  return (
    <div className={styles.connectLinks}>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        data-title="LinkedIn"
        href="https://www.linkedin.com/in/manikantainugurthi/"
      >
        <LinkedInIcon className={styles.icon} />
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        data-title="GitHub"
        href="https://github.com/me-manikanta"
      >
        <GitHubIcon className={styles.icon} />
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        data-title="E-mail"
        href="mailto:mani.inugurthi@gmail.com"
      >
        <MailIcon className={styles.icon} viewBox="0 0 512 512" />
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        data-title="Resume"
        href="/assets/resume.pdf"
      >
        <ResumeIcon className={styles.icon} viewBox="0 0 512 512" />
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footerMain}>
      Made with <HeartIcon className={styles.heart} /> by &nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={styles.authorLink}
        href="http://github.com/me-manikanta"
      >
        Manikanta Inugurthi
      </a>
    </footer>
  );
};

export default Home;
