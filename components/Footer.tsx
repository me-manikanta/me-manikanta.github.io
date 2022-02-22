import HeartIcon from "@mui/icons-material/Favorite";
import styles from "../styles/Home.module.css";

export const Footer = () => {
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
