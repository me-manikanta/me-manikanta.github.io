import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return <Header />;
}

export default MyApp;
