// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 88] },
};

export default nextConfig;
