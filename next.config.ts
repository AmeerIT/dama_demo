import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.center-phone.com',
        pathname: '/v1/storage/buckets/**',
      },
    ],
  },
};

export default nextConfig;
