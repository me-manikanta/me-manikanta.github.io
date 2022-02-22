import type { AppProps } from "next/app";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapperNormal}>
      <div className={`${styles.page} ${styles.home}`}>
        <header className={`${styles.headerHome} ${styles.animated}`}>
          <Component {...pageProps} />
        </header>
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
