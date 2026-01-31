/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
        emotion: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.eu-central-1.amazonaws.com',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
            },
            {
                protocol: 'https',
                hostname: 'api.mikroelectron.com',
            },
            {
                protocol: 'https',
                hostname: 'apitest.mikroelectron.com',
            },
            {
                protocol: 'http',
                hostname: '134.209.88.205',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
};

// Bundle analyzer (enable with ANALYZE=true)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  reportFilename: './reports/bundle-report.html',
  generateStatsFile: true,
});

module.exports = withBundleAnalyzer(nextConfig);