import cn from "classnames";
import Link from "next/link";
import useDelayedRender from "../hooks/DelayedRenderer";
import { useState, useEffect } from "react";
import styles from "../styles/mobile-menu.module.css";
import { MenuItems } from "../data/MenuData";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        className={cn(styles.burger, "fixed bottom-6 left-6 z-50")}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            "flex flex-col fixed",
            "bg-white dark:bg-gray-800",
            "text-gray-900 dark:text-gray-100",
            isMenuRendered && styles.menuRendered
          )}
        >
          {MenuItems.map((menuItem) => (
            <li
              key={menuItem.href}
              className="border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm font-semibold"
              style={{
                transitionDelay: menuItem.transitionDelay,
              }}
            >
              <Link className="flex w-auto pb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href={menuItem.href}>
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-6 w-6 absolute text-white"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-6 w-6 absolute text-white"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
