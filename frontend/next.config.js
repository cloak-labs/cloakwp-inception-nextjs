const { withCloakWP } = require('@cloakwp/nextjs');

/** @type {import('next').NextConfig} */
module.exports = withCloakWP({
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      // TODO: add production WP URL to allowed image domains using getter function vs. manually adding it
      'localhost',
      'd.pr',
    ],
  },
  async headers() {
    return [
      {
        // enable WordPress to make API requests to Next.js
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_WP_URL,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
});
