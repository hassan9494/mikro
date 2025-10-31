/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    poweredByHeader: false,
    generateEtags: false,

    images: {
        domains: [
            's3.eu-central-1.amazonaws.com',
            'api.mikroelectron.com',
            'apitest.mikroelectron.com',
            '134.209.88.205',
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    productionBrowserSourceMaps: false,

    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Alternative SVG configuration
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

module.exports = nextConfig;