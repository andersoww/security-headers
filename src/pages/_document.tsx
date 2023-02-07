import { generateCsp } from "@/utils/generate";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const [csp, nonce] = generateCsp();

  return (
    <Html lang="pt">
      <Head>
        <meta charSet="utf-8" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
