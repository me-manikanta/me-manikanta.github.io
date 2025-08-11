import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";
import { useState, useEffect } from "react";
import { MenuItems } from "../data/MenuData";

const NavItem = ({ href, text }: any) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-1 text-sm text-gray-400 hover:text-gray-200 transition-colors whitespace-nowrap"
      >
        {text}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? "text-gray-200"
          : "text-gray-400 hover:text-gray-200",
        "block py-1 text-sm transition-colors whitespace-nowrap"
      )}
    >
      {text}
    </NextLink>
  );
};

export const Sidebar = () => {
  return (
    <nav className="flex flex-col space-y-2 text-right">
      {MenuItems.map((menuItem) => (
        <NavItem
          key={menuItem.href}
          href={menuItem.href}
          text={menuItem.title}
        />
      ))}
    </nav>
  );
};
