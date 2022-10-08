export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);
