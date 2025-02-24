/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    formats: ['image/webp'],
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
