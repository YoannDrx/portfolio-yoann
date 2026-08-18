import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["playwright-core", "puppeteer-core", "@sparticuz/chromium-min"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/download/pressay",
        destination:
          "https://github.com/YoannDrx/pressay/releases/download/v2.0.0-beta.1/Pressay.dmg",
        permanent: false,
      },
      {
        source: "/download/pressay/appcast.xml",
        destination: "https://yoanndrx.github.io/pressay/appcast.xml",
        permanent: true,
      },
      {
        source: "/download/whisper",
        destination: "/download/pressay",
        permanent: false,
      },
      {
        source: "/download/whisper/appcast.xml",
        destination: "https://yoanndrx.github.io/pressay/appcast.xml",
        permanent: true,
      },
      {
        source: "/fr/projects/whisper",
        destination: "/fr/projects/pressay",
        permanent: false,
      },
      {
        source: "/en/projects/whisper",
        destination: "/en/projects/pressay",
        permanent: false,
      },
    ];
  },
  async headers() {
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
            value: "strict-origin-when-cross-origin",
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
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
