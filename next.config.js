/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.VERCEL === '1' ? '' : '/portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
