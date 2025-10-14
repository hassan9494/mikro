export const checkAndClearCache = () => {
    if (typeof window === 'undefined') return;

    // Get current version from Next.js config
    let currentVersion = null;

    // Try to get version from Next.js runtime config
    if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
        currentVersion = window.__NEXT_DATA__.runtimeConfig?.APP_VERSION;
    }

    // Fallback: use package version + timestamp
    if (!currentVersion) {
        currentVersion = `v5.0.2-${Date.now().toString().slice(-8)}`;
    }

    const storedVersion = localStorage.getItem('app-version');

    // If version changed, clear cart data
    if (storedVersion !== currentVersion) {
        console.log('🔄 Clearing cart cache. Version changed from', storedVersion, 'to', currentVersion);

        // Clear ALL possible cart storage keys
        const cartKeys = [
            'cart',
            'cart-state',
            'cart-items',
            'cart-total',
            'pickbazar-cart',
            'shop-cart'
        ];

        // Remove specific cart keys
        cartKeys.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                console.log('🗑️ Removed cart key:', key);
            }
        });

        // Remove any other keys containing 'cart'
        Object.keys(localStorage).forEach(key => {
            if (key.toLowerCase().includes('cart')) {
                localStorage.removeItem(key);
                console.log('🗑️ Removed cart-related key:', key);
            }
        });

        // Store new version
        localStorage.setItem('app-version', currentVersion);
        console.log('✅ Cart cache cleared successfully');
    }

    // Initialize version if first time
    if (!storedVersion) {
        localStorage.setItem('app-version', currentVersion);
    }
};