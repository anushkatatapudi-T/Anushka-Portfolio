/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
