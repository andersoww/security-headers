import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

function csp(req, res) {
  const nonce = `nonce-${Buffer.from(uuid()).toString("base64")}`;
  const isProduction = process.env.NODE_ENV === "production";
  const devScriptPolicy = ["unsafe-eval"]; // NextJS uses react-refresh in dev
  res.headers.append(
    "Content-Security-Policy",
    [
      ["default-src", "self", nonce],
      ["script-src", "self", nonce].concat(isProduction ? [] : devScriptPolicy),
      ["connect-src", "self", nonce],
      ["img-src", "self", nonce],
      ["style-src", "self", nonce],
      ["base-uri", "self", nonce],
      ["form-action", "self", nonce],
    ].reduce((prev, [directive, ...policy]) => {
      return `${prev}${directive} ${policy
        .filter(Boolean)
        .map((src) => `'${src}'`)
        .join(" ")};`;
    }, "")
  );
}

export const middleware = (req: NextResponse) => {
  const res = NextResponse.next();
  csp(req, res);
  return res;
};
