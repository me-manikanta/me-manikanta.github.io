import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Header />
    </ThemeProvider>
  );
}

export default MyApp;
