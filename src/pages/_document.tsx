/**
 * Minimal custom _document required to populate the pages-manifest.json
 * so that Next.js 15 can prerender the internal /404 error page correctly.
 *
 * The App Router (src/app/) handles all actual pages; this file only
 * satisfies the Pages Router compatibility shim built into Next.js 15.
 */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
