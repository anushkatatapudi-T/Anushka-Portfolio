/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH !== undefined ? process.env.NEXT_PUBLIC_BASE_PATH : '/portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
