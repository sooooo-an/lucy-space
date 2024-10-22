/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/projects/developers-store",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
