/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    LOCATION: process.env.LOCAL,
    GRANT_TYPE: process.env.GRANT_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    SERVICE_TYPE: process.env.SERVICE_TYPE,
    PICKUP_TYPE: process.env.PICKUP_TYPE,
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
