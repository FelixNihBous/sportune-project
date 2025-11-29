/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Use the wildcard character (*) for the hostname
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Other Next.js configurations...
};

export default nextConfig;
