import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { generateNonce } from "@/utils/generate-nonce";
import { generateCSP } from "@/utils/generateCSP";

interface DocumentProps {
  nonce: string;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const nonce = generateNonce();

    ctx?.res?.setHeader("Content-Security-Policy", generateCSP({ nonce }));

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const additionalProps = { nonce }; // 👈 add this
      const sheetStyles = sheet.getStyleElement();

      const style =
        (sheetStyles &&
          React.Children.map(sheetStyles, (child) =>
            React.cloneElement(child, {
              nonce,
            } as React.StyleHTMLAttributes<HTMLStyleElement>)
          )) ||
        null;
      console.log(additionalProps);

      return {
        ...initialProps,
        ...additionalProps, // 👈 and this!
        styles: (
          <>
            {initialProps.styles}
            {style}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { nonce } = this.props;
    return (
      <Html lang="en-GB">
        <Head>
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = "${nonce}"`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
