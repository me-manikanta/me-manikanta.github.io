import Head from "next/head";
import { useRouter } from "next/router";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
} from "../utils/siteConfig";

type SEOProps = {
  /** Page title (without the site-name suffix). Omit on the home page to use the full default title. */
  title?: string;
  description?: string;
  /** Relative (e.g. "/assets/og.png") or absolute image URL. */
  image?: string;
  /** Open Graph type. */
  type?: "website" | "article" | "profile";
  /** Override the canonical path. Defaults to the current route. */
  path?: string;
  /** Keep this page out of search engines. */
  noindex?: boolean;
  /** ISO 8601 publish date (articles). */
  publishedTime?: string;
  /** Article tags, emitted as article:tag. */
  tags?: string[];
  /** One or more JSON-LD objects injected as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export default function SEO({
  title,
  description = SITE_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  path,
  noindex = false,
  publishedTime,
  tags,
  jsonLd,
}: SEOProps) {
  const router = useRouter();
  const rawPath = path ?? router.asPath ?? "/";
  const cleanPath = rawPath.split(/[?#]/)[0];
  const canonical =
    cleanPath === "/" ? SITE_URL : `${SITE_URL}${cleanPath.replace(/\/$/, "")}`;

  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_TITLE;
  const ogImage = absoluteUrl(image);
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title ?? SITE_TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" &&
        (tags ?? []).map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? SITE_TITLE} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {TWITTER_HANDLE && (
        <>
          <meta name="twitter:site" content={TWITTER_HANDLE} />
          <meta name="twitter:creator" content={TWITTER_HANDLE} />
        </>
      )}

      {jsonLdItems.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
