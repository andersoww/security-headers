import crypto from "crypto";
import { v4 } from "uuid";

const generateCsp = (): [csp: string, nonce: string] => {
  const production = process.env.NODE_ENV === "production";
  const url = process.env.NEXT_PUBLIC_URL_API;
  const hash = crypto.createHash("sha256");
  hash.update(v4());

  const nonce = `sha256-${hash.digest("base64")}`;

  let csp = ``;
  csp += `default-src 'none';`;
  csp += `base-uri 'self';`;
  csp += `img-src 'self';`;
  csp += `style-src https://fonts.googleapis.com 'unsafe-inline';`;
  csp += `font-src 'self' https://fonts.gstatic.com;`;
  if (!production) {
    csp += `connect-src 'self' ${url?.replace("/v1", "")} ws: ${
      process.env.NEXT_PUBLIC_URL_API_SERVICES
    };`;
  }
  csp += `script-src * data: https://ssl.gstatic.com 'unsafe-inline' 'unsafe-eval';`;

  return [csp, nonce];
};
export { generateCsp };
