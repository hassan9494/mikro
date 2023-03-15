const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// next.js configuration
const nextConfig = {
    images: {
        domains: [
            's3.eu-central-1.amazonaws.com',
            '127.0.0.1',
            'api.mikroelektron.com'
        ],
    },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
