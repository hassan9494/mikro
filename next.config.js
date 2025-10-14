const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// Use package.json version + timestamp
const APP_VERSION = `v${require('./package.json').version}-${Date.now()}`;

// next.js configuration
const nextConfig = {
    publicRuntimeConfig: {
        APP_VERSION: APP_VERSION,
    },
    images: {
        domains: [
            's3.eu-central-1.amazonaws.com',
            '127.0.0.1',
            'api.mikroelectron.com',
            'apitest.mikroelectron.com',
            '134.209.88.205',
        ],
    },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);