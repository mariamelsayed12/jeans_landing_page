import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import path from "path";

const withNextIntl = createNextIntlPlugin("./app/i18n.ts");

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/app": path.resolve("./app"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);