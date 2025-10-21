import { useCart } from 'contexts/cart/use-cart';

export const useVersionCheck = () => {
    const { clearCart } = useCart();

    const checkAndClearCache = () => {
        if (typeof window === 'undefined') return;

        // Get current version
        let currentVersion = null;
        if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
            currentVersion = window.__NEXT_DATA__.runtimeConfig?.APP_VERSION;
        }
        if (!currentVersion) {
            currentVersion = `v5.0.2-${Date.now().toString().slice(-8)}`;
        }

        const storedVersion = localStorage.getItem('app-version');

        if (storedVersion !== currentVersion) {
            console.log('🔄 Clearing cart cache. Version changed');

            // CLEAR THE REACT STATE, not just localStorage
            if (clearCart) {
                clearCart(); // This calls your cart context's clear function
                console.log('✅ Cart state cleared via context');
            }

            // Also clear localStorage as backup
            localStorage.removeItem('@cart-session');

            localStorage.setItem('app-version', currentVersion);
            console.log('✅ Cart cache cleared successfully');
        }

        if (!storedVersion) {
            localStorage.setItem('app-version', currentVersion);
        }
    };

    return checkAndClearCache;
};