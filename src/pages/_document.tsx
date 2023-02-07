import { generateCsp } from "@/utils/generate";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const [csp, nonce] = generateCsp();

  return (
    <Html lang="pt">
      <Head nonce={nonce}>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
