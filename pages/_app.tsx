import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Sidebar } from "../components/Sidebar";
import { ComponentProps, ReactNode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="dark">
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row md:gap-16">
            <main
              id="skip"
              className="flex-1 max-w-4xl"
            >
              <Component {...pageProps} />
            </main>
            
            {/* Desktop/Tablet sidebar - right side */}
            <aside className="hidden md:block md:w-48 md:flex-shrink-0 mt-8 md:mt-0">
              <div className="md:sticky md:top-8">
                <Sidebar />
              </div>
            </aside>
          </div>
          
          {/* Mobile sidebar - below content */}
          <aside className="md:hidden mt-8">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
