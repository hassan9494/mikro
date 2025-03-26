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
            const storedValue = localStorage.getItem(config.key);
            const restoredValue = rehydrate(storedValue);
            setState(restoredValue || config.migrate(INITIAL_STATE));
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
