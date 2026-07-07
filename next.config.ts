import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Old build paths → canonical sitemap URLs (SEO-locked).
      { source: "/platform/ztna", destination: "/zero-trust-network-access", permanent: true },
      { source: "/platform/sso", destination: "/zero-trust-features/single-sign-on", permanent: true },
      { source: "/features/device-binding", destination: "/zero-trust-features/device-binding", permanent: true },
    ];
  },
};

export default nextConfig;
