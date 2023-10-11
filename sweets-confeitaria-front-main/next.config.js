/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA = require('@imbios/next-pwa')({
  dest: 'public',
})

const nextConfig = {}

module.exports = withPWA({
  ...nextConfig,
})
