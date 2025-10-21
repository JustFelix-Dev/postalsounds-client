import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stunning-cactus-ffe5506078.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
