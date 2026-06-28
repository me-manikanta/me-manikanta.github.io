import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
} from "./siteConfig";

const SAME_AS = [
  "https://twitter.com/me_manikanta",
  "https://github.com/me-manikanta",
  "https://www.linkedin.com/in/manikantainugurthi/",
];

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    sameAs: SAME_AS,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  image?: string;
  tags?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    image: absoluteUrl(post.image || DEFAULT_OG_IMAGE),
    ...(post.datePublished
      ? { datePublished: post.datePublished, dateModified: post.datePublished }
      : {}),
    ...(post.tags && post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  };
}
