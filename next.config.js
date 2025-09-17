/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // important for local dev
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "my-strapi-app.onrender.com", // <-- replace with your deployed Strapi domain
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
