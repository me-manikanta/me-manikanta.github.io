import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
