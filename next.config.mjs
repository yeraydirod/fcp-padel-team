/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Avoid bundling Node-heavy packages into the serverless function (common Vercel 500 cause).
  serverExternalPackages: ['firebase-admin', 'cheerio'],
}

export default nextConfig
