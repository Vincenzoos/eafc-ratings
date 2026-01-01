import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'drop-assets.ea.com' },
      { protocol: 'https', hostname: 'cdn.sofifa.net' },
    ],
  },
};

export default nextConfig;
