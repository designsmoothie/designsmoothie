import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vkevvwmysuggbnkjdfis.supabase.co",
      },
    ],
  },
};

export default nextConfig;