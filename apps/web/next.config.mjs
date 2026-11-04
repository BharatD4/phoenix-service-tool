/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@phoenix/db"],
  serverExternalPackages: ["@prisma/client", "prisma"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

