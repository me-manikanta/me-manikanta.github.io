import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Meta tags for better favicon support */}
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="theme-color" content="#111827" />

        {/* RSS feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Manikanta Inugurthi — Blog"
          href="/feed.xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
