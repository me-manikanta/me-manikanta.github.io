import type { AppProps } from "next/app";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapperNormal}>
      <div className={`${styles.page} ${styles.home}`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
