import type { NextConfig } from "next";

import { REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    /* Declared in lib/redirects.ts so app/sitemap.ts can exclude the same
       sources. Listing a redirect in the sitemap publishes a 308 as if it
       were a canonical page. */
    return REDIRECTS;
  },
};

export default nextConfig;
