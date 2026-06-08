/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CAPACITOR_BUILD === 'true' ? 'export' : undefined,
  images: { unoptimized: true }
}

export default nextConfig
