import Link from "next/link";
import { SnippetMatter } from "../utils/types";

export default function SnippetCard({
  title,
  description,
  slug,
  logo,
}: SnippetMatter) {
  return (
    <Link href={`/snippets/${slug}`}>
      <div className="border border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900">
        <img
          alt={title}
          height={32}
          width={32}
          src={logo}
          className="rounded-full"
        />
        <h3 className="text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
