import Link from "next/link";
import Image from "next/image";
import { SnippetMatter } from "../utils/types";

export default function SnippetCard({
  title,
  description,
  slug,
  logo,
  tags,
}: SnippetMatter) {
  return (
    <Link href={`/snippets/${slug}`}>
      <div className="border border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-3">
          <Image
            alt={title}
            height={32}
            width={32}
            src={logo}
            className="rounded-full"
          />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-400">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
