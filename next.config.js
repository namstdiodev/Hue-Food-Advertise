/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // distDir: "build",
  // // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
