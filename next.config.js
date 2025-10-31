const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// Create unique version using package.json version + timestamp
const APP_VERSION = `v${require('./package.json').version}-${Date.now()}`;

// next.js configuration

const nextConfig = {
    images: {
        domains: [
            's3.eu-central-1.amazonaws.com',
            '127.0.0.1',
            'api.mikroelectron.com',
            'apitest.mikroelectron.com',
            '134.209.88.205',
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    compress: true,
    poweredByHeader: false,
    experimental: {
        optimizeCss: true,
    },
};

module.exports = nextConfig;

module.exports = withPlugins([withOptimizedImages], nextConfig);