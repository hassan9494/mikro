import { useState, useEffect } from 'react';
import { INITIAL_STATE } from '../contexts/cart/use-cart';

const isObjectLiked = (value) =>
    value.constructor.name === 'Array' || value.constructor.name === 'Object';

const rehydrate = (value: any, defaultValue?: any) => {
    if (!value) return defaultValue;
    try {
        const parse = JSON.parse(value);
        return parse;
    } catch (err) {
        return defaultValue;
    }
};

const hydrate = (value) => {
    if (!isObjectLiked(value)) {
        return value;
    }
    return JSON.stringify(value);
};

const config = {
    key: '@cart-session',
    version: 1,
    migrate: (state) => {
        return { ...state };
    },
};

// Get current app version
const getAppVersion = () => {
    if (typeof window === 'undefined') return null;
    let currentVersion = null;
    if (window.__NEXT_DATA__) {
        currentVersion = window.__NEXT_DATA__.runtimeConfig?.APP_VERSION;
    }
    if (!currentVersion) {
        currentVersion = `v5.0.2-${Date.now().toString().slice(-8)}`;
    }
    return currentVersion;
};

export const useStorage = (state, setState) => {
    const [rehydrated, setRehydrated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storageHandler = (e: StorageEvent) => {
            if (e.key === config.key && e.storageArea === localStorage) {
                const newValue = rehydrate(e.newValue);
                setState(newValue);
            }
        };

        window.addEventListener('storage', storageHandler);
        return () => window.removeEventListener('storage', storageHandler);
    }, []);

    useEffect(() => {
        async function init() {
            const currentVersion = getAppVersion();
            const storedVersion = localStorage.getItem('app-version');

            // VERSION CHECK: If versions don't match, clear cart data
            if (storedVersion !== currentVersion) {
                console.log('🔄 Version changed, clearing cart data');
                // Clear the cart state
                setState(INITIAL_STATE);
                // Remove cart data from localStorage
                localStorage.removeItem(config.key);
                // Update stored version
                localStorage.setItem('app-version', currentVersion);
                setRehydrated(true);
                return;
            }

            // Normal rehydration if versions match
            const storedValue = localStorage.getItem(config.key);
            const restoredValue = rehydrate(storedValue);

            if (restoredValue) {
                setState(restoredValue);
            } else {
                setState(config.migrate(INITIAL_STATE));
            }

            setRehydrated(true);

            // Initialize version if first time
            if (!storedVersion) {
                localStorage.setItem('app-version', currentVersion);
            }
        }

        init();
    }, []);

    useEffect(() => {
        if (rehydrated) {
            // Only persist to localStorage if we're not in a version change scenario
            const currentVersion = getAppVersion();
            const storedVersion = localStorage.getItem('app-version');

            if (storedVersion === currentVersion) {
                localStorage.setItem(config.key, hydrate(state));
            }
        }
    }, [state, rehydrated]);

    return {
        rehydrated,
        error,
    };
};