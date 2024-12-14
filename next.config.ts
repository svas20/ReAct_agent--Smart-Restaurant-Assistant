import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude faiss-node from client-side bundles
      config.resolve.alias['faiss-node'] = false;
    }
    return config;
  },
  serverExternalPackages: ['faiss-node'], // Mark faiss-node as a server-only dependency
};

export default nextConfig;
