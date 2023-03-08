/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja"
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
