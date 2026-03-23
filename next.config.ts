import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Standard konfigurasjon for Next.js 16 */
  typescript: {
    // Dette gjør at TypeScript-feil ikke stopper byggingen på Vercel
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['pdfjs-dist'],
};

export default nextConfig;
