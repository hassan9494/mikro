const http = require('http');

function fetchProducts() {
    return new Promise((resolve, reject) => {
        http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/allProducts`, (res) => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject(new Error('Failed to fetch products, status code: ' + res.statusCode));
                }
                try {
                    const json = JSON.parse(data);
                    if (!json.data || !Array.isArray(json.data)) {
                        return reject(new Error('API response does not contain a data array'));
                    }
                    resolve(json.data);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function fetchCategories() {
    return new Promise((resolve, reject) => {
        http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/allCategoris`, (res) => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject(new Error('Failed to fetch categories, status code: ' + res.statusCode));
                }
                try {
                    const json = JSON.parse(data);
                    if (!json.data || !Array.isArray(json.data)) {
                        return reject(new Error('API response does not contain a data array'));
                    }
                    resolve(json.data);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

const staticPages = [
    '/',
    '/profile',
    '/courses',
    '/services',
    '/tutorials',
    '/category/new_product',
    '/category/All-Products',
    '/privacy',
    '/terms',
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_REST_SITE_ENDPOINT,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '',
            },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_REST_SITE_ENDPOINT}sitemap.xml`,
        ],
    },
    transform: async (config, path) => {
        // Exclude error and API routes
        if (path === '/_error' || path.startsWith('/api')) return null;
        return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        };
    },
    additionalPaths: async (config) => {
        const [products, categories] = await Promise.all([
            fetchProducts(),
            fetchCategories()
        ]);
        const productPaths = products.map(product => ({
            loc: `/product/${product.slug}`,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }));
        const categoryPaths = categories.map(category => ({
            loc: `/category/${category.slug}`,
            changefreq: 'weekly',
            priority: 0.6,
            lastmod: new Date().toISOString(),
        }));
        const staticPaths = staticPages.map(path => ({
            loc: path,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        }));
        return [
            ...staticPaths,
            ...productPaths,
            ...categoryPaths
        ];
    },
};