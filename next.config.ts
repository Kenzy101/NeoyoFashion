import type { NextConfig } from "next";

/**
 * The site is entirely static — every route is prerendered, there are no
 * API routes, no server actions and no middleware — so it exports to flat
 * files and can be served from anywhere.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow when the site is
 * served from a sub-directory (GitHub Pages serves it at /NeoyoFashion).
 * Leave it unset for a root domain and everything resolves at "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  // Emits every route as a directory with an index.html, so a plain static
  // host resolves /core without needing rewrite rules.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No image optimiser on a static host. The ingest script already
    // produced responsive AVIF and WebP derivatives ahead of time.
    unoptimized: true,
  },
};

export default nextConfig;
