/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
