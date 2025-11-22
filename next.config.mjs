/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
