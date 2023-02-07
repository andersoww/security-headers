/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const url = process.env.NEXT_PUBLIC_URL_API;
    const ContentSecurityPolicy = `
  default-src 'none';
  script-src * data: https://ssl.gstatic.com 'unsafe-inline' 'unsafe-eval';
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;  
  img-src 'self';
  base-uri 'self';
  connect-src 'self' ${url?.replace("/v1", "")} ws: ${
      process.env.NEXT_PUBLIC_URL_API_SERVICES
    };
`;
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
