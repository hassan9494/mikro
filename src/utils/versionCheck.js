export const checkAndClearCache = () => {
    if (typeof window === 'undefined') return;

    // Get version from publicRuntimeConfig (available in Next.js 10)
    let currentVersion = null;

    // Method 1: Try to get from NEXT_DATA
    if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
        currentVersion = window.__NEXT_DATA__.props?.pageProps?.APP_VERSION;
    }

    // Method 2: Fallback - use package version + timestamp
    if (!currentVersion) {
        currentVersion = `v5.0.2-${Date.now().toString().slice(-8)}`;
    }

    const storedVersion = localStorage.getItem('app-version');

    // If versions don't match, clear cart
    if (storedVersion !== currentVersion) {
        console.log('Clearing cart cache. Version changed from', storedVersion, 'to', currentVersion);

        // Clear ALL cart-related localStorage items
        Object.keys(localStorage).forEach(key => {
            if (key.toLowerCase().includes('cart')) {
                localStorage.removeItem(key);
                console.log('Removed:', key);
            }
        });

        // Store the new version
        localStorage.setItem('app-version', currentVersion);

        // Optional: reload the page to ensure clean state
        // window.location.reload();
    }

    // Initialize version if first time
    if (!storedVersion) {
        localStorage.setItem('app-version', currentVersion);
    }
};