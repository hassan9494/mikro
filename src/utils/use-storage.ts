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

// ⚠️ CHANGE THIS VERSION STRING FOR EACH DEPLOYMENT ⚠️
const CURRENT_BUILD_VERSION = 'build-2024-01-15-v4'; // UPDATE THIS FOR EACH NEW BUILD

const config = {
    key: '@cart-session',
    version: 1,
    migrate: (state) => {
        return { ...state };
    },
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
            // ⚠️ VERSION CHECK - Clear cart if build version changed
            const lastBuildVersion = localStorage.getItem('last-build-version');

            if (lastBuildVersion !== CURRENT_BUILD_VERSION) {
                console.log('🚨 BUILD VERSION CHANGED - CLEARING CART');

                // 1. Clear localStorage
                localStorage.removeItem(config.key);

                // 2. Set empty state in React
                setState(INITIAL_STATE);

                // 3. Update to new build version
                localStorage.setItem('last-build-version', CURRENT_BUILD_VERSION);

                console.log('✅ Cart cleared for new build version:', CURRENT_BUILD_VERSION);
                setRehydrated(true);
                return;
            }

            // Normal rehydration if same version
            const storedValue = localStorage.getItem(config.key);
            const restoredValue = rehydrate(storedValue);

            if (restoredValue) {
                setState(restoredValue);
            } else {
                setState(config.migrate(INITIAL_STATE));
            }

            setRehydrated(true);
        }

        init();
    }, []);

    useEffect(() => {
        if (rehydrated) {
            localStorage.setItem(config.key, hydrate(state));
        }
    }, [state, rehydrated]);

    return {
        rehydrated,
        error,
    };
};