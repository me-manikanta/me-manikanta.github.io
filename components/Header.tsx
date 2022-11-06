import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";
import { useTheme } from "next-themes";
import MoonIcon from "@mui/icons-material/DarkMode";
import SunIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { useEffect } from "react";

const NavItem = ({ href, text }: any) => {
  const router = useRouter();
  const isActive = router.asPath === href; //TODO: update this condition

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
        )}
      >
        <span>{text}</span>
      </a>
    </NextLink>
  );
};

const ThemeButton = ({ theme, setTheme }: any) => {
  const renderThemeChanger = () => {
    if (theme === "dark") {
      return <SunIcon role="button" onClick={() => setTheme("light")} />;
    } else {
      return <MoonIcon role="button" onClick={() => setTheme("dark")} />;
    }
  };

  return <>{renderThemeChanger()}</>;
};

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="ml-[-0.60rem]">
          <NavItem href="/" text="Home" />
          <NavItem href="/about" text="About" />
          <NavItem href="/blog" text="Blog" />
        </div>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && <ThemeButton theme={resolvedTheme} setTheme={setTheme} />}
        </button>
      </nav>
    </div>
  );
};
