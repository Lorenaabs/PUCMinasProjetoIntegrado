/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA = require('@imbios/next-pwa')({
  dest: 'public',
})

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'sweet-confeitaria.onrender.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
}

module.exports = withPWA({
  ...nextConfig,
})
