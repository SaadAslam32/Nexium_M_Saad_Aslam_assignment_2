// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 This disables blocking build on lint errors
  },
};

module.exports = nextConfig;
