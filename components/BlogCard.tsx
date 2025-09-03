import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  thumbnailUrl?: string;
  category?: string;
  tags?: string[];
}

export default function BlogCard({
  title,
  description,
  slug,
  date,
  thumbnailUrl,
  category,
  tags,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group">
        <div className="flex flex-col">
          {thumbnailUrl && (
            <div className="mb-3">
              <Image
                src={thumbnailUrl}
                alt={title}
                width={400}
                height={200}
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {description}
            </p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
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
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {date}
              </span>
              {category && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 rounded">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}