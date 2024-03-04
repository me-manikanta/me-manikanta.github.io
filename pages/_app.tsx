import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import { ComponentProps, ReactNode } from "react";

type ExistingThemeProviderProps = ComponentProps<typeof ThemeProvider> & {
  children: ReactNode;
};
const ThemeProviderExtended = (props: ExistingThemeProviderProps) => (
  <ThemeProvider {...props} />
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProviderExtended attribute="class">
      <Header />
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
      >
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProviderExtended>
  );
}

export default MyApp;
