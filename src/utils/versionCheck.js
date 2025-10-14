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

        // SPECIFICALLY CLEAR THE @cart-session KEY
        if (localStorage.getItem('@cart-session')) {
            localStorage.removeItem('@cart-session');
            console.log('🗑️ Removed cart key: @cart-session');
        }

        // Also clear any other potential cart keys (as backup)
        const cartKeys = [
            'cart',
            'cart-state',
            'cart-items',
            'cart-total',
            'pickbazar-cart',
            'shop-cart'
        ];

        cartKeys.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                console.log('🗑️ Removed cart key:', key);
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