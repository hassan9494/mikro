const https = require('https');
const http = require('http');

function fetchJson(urlString) {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlString);
            const client = url.protocol === 'http:' ? http : https;

            client.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        return reject(new Error(`Failed to fetch ${urlString}, status code: ${res.statusCode}`));
                    }

                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
}

async function fetchProducts() {
    const json = await fetchJson(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/allProducts`);
    if (!json.data || !Array.isArray(json.data)) {
        throw new Error('API response does not contain a data array');
    }
    return json.data;
}

async function fetchCategories() {
    const json = await fetchJson(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/allCategoris`);
    if (!json.data || !Array.isArray(json.data)) {
        throw new Error('API response does not contain a data array');
    }
    return json.data;
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
    transform: async (_config, path) => {
        if (path === '/_error' || path.startsWith('/api')) return null;
        return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        };
    },
    additionalPaths: async () => {
        const [products, categories] = await Promise.all([
            fetchProducts(),
            fetchCategories(),
        ]);

        const productPaths = products.map((product) => ({
            loc: `/product/${product.slug}`,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }));

        const productSkuPaths = products.map((product) => ({
            loc: `/product/${product.sku}`,
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));

        const categoryPaths = categories.map((category) => ({
            loc: `/category/${category.slug}`,
            changefreq: 'weekly',
            priority: 0.6,
            lastmod: new Date().toISOString(),
        }));

        const staticPaths = staticPages.map((path) => ({
            loc: path,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        }));

        return [...staticPaths, ...productPaths,...productSkuPaths, ...categoryPaths];
    },
};
