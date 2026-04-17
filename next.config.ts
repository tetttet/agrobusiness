import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* www.pexels.com */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pexels.com",
        port: "",
        pathname: "/scl/fi/**",
      },
    ],
  },
};

export default nextConfig;
