/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appwrite.keithw.dev",
      },
    ],
  },
};

export default nextConfig;
