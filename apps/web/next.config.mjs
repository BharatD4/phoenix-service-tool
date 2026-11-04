/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@phoenix/db"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

