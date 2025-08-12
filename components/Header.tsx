import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";
import MobileMenu from "./MobileMenu";
import { MenuItems } from "../data/MenuData";

const NavItem = ({ href, text }: any) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? "font-semibold text-gray-800 dark:text-gray-200"
          : "font-normal text-gray-600 dark:text-gray-400",
        "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
      )}
    >
      <span>{text}</span>
    </NextLink>
  );
};

export const Header = () => {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          {MenuItems.map((menuItem) => (
            <NavItem
              key={menuItem.href}
              href={menuItem.href}
              text={menuItem.title}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};
