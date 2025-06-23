import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
  },
   // Ignore TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
