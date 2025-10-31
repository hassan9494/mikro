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
        formats: ['image/avif','image/svg', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Remove source maps in production
    productionBrowserSourceMaps: false,

    // Optimize compiler
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },

    // Reduce bundle size
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

module.exports = nextConfig;