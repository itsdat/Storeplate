import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "picsum.photos",
        },
        {
          protocol: "https",
          hostname: "cdn.shopify.com",
        },
         {
        protocol: 'http',
        hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        },
        {
          protocol: 'http',
          hostname: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
          pathname: '**',
        },
      ],
      dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
