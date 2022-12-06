/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    LOCAl: process.env.LOCAL,
    GRANT_TYPE: process.env.GRANT_TYPE,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  async rewrites() {
    return [
      {
        source: "/fedex/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
