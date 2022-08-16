/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com' , 'pbs.twimg.com' , 'cdn.discordapp.com'],
  },
}

module.exports = nextConfig
