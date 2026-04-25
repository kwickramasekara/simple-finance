/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appwrite.keithw.me",
      },
    ],
  },
};

export default nextConfig;
