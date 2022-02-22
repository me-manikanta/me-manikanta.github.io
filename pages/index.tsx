import type { NextPage } from "next";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Email";
import ResumeIcon from "@mui/icons-material/DocumentScanner";
import InstagramIcon from "@mui/icons-material/Instagram";
import MoonIcon from "@mui/icons-material/DarkMode";
import SunIcon from "@mui/icons-material/LightMode";
import TwitterIcon from "@mui/icons-material/Twitter";

import styles from "../styles/Home.module.css";
import { useTheme } from "next-themes";
import { SocialLink } from "../components/SocialLink";

const Home: NextPage = () => {
  return (
    <>
      <header className={`${styles.headerHome} ${styles.animated}`}>
        <About />
        <Social />
      </header>
    </>
  );
};

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <SunIcon role="button" onClick={() => console.log("Clicked")} />;
    } else {
      return <MoonIcon role="button" onClick={() => setTheme("dark")} />;
    }
  };

  return <>{renderThemeChanger()}</>;
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
      <SocialLink
        title="GitHub"
        link="https://github.com/me-manikanta"
        Icon={GitHubIcon}
      />
      <SocialLink
        title="LinkedIn"
        link="https://www.linkedin.com/in/manikantainugurthi/"
        Icon={LinkedInIcon}
      />
      <SocialLink
        title="Instagram"
        link="https://www.instagram.com/_me_manikanta/"
        Icon={InstagramIcon}
      />
      <SocialLink
        title="Twitter"
        link="https://twitter.com/me_manikanta"
        Icon={TwitterIcon}
      />
      <SocialLink
        title="E-mail"
        link="mailto:mani.inugurthi@gmail.com"
        Icon={MailIcon}
      />
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        data-title="Resume"
        href="/assets/resume.pdf"
      >
        <ResumeIcon className={styles.icon} />
      </a>
    </div>
  );
};
export default Home;
