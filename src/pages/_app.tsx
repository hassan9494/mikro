import { useEffect } from 'react';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'site-settings/site-theme/default';
import { AppProvider, useAppState } from 'contexts/app/app.provider';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { LanguageProvider } from 'contexts/language/language.provider';
import {CartProvider, useCart} from 'contexts/cart/use-cart';
import { useMedia } from 'utils/use-media';
import AppLayout from 'layouts/app-layout';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import theme from 'theme';
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import 'react-spring-modal/dist/index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'components/scrollbar/scrollbar.css';
import '@redq/reuse-modal/lib/index.css';
import { GlobalStyle } from 'assets/styles/global.style';
import { messages } from 'site-settings/site-translation/messages';
import 'typeface-lato';
import 'typeface-poppins';
import React from 'react';
import { OrderProvider } from "../contexts/order/order.provider";
import {useSocial} from "../data/use-website";
// import { useVersionCheck } from '../utils/versionCheck';

export default function ExtendedApp({ Component, pageProps }) {
    // const checkAndClearCache = useVersionCheck();
    useEffect(() => {
        // Inject head scripts
        const headScripts = document.documentElement.getAttribute('data-head-scripts');
        if (headScripts) {
            const head = document.head;
            const scriptElement = document.createElement('div');
            scriptElement.innerHTML = headScripts;
            Array.from(scriptElement.children).forEach((child) => {
                const script = document.createElement('script');
                script.innerHTML = child.innerHTML;
                head.appendChild(script);
            });
        }

        // Inject body scripts
        const bodyScripts = document.documentElement.getAttribute('data-body-scripts');
        if (bodyScripts) {
            const body = document.body;
            const scriptElement = document.createElement('div');
            scriptElement.innerHTML = bodyScripts;
            Array.from(scriptElement.children).forEach((child) => {
                const script = document.createElement('script');
                script.innerHTML = child.innerHTML;
                body.appendChild(script);
            });
        }
    }, []);
    const { clearCart } = useCart();

    useEffect(() => {
        const checkAndClearCache = () => {
            if (typeof window === 'undefined') return;

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

                // Use your cart context's clear function
                if (clearCart) {
                    clearCart();
                    console.log('✅ Cart cleared via context');
                }

                localStorage.setItem('app-version', currentVersion);
            }

            if (!storedVersion) {
                localStorage.setItem('app-version', currentVersion);
            }
        };

        checkAndClearCache();
    }, [clearCart]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    const { data: social } = useSocial();
    const mobile = useMedia('(max-width: 580px)');
    const tablet = useMedia('(max-width: 991px)');
    const desktop = useMedia('(min-width: 992px)');

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeProvider theme={defaultTheme}>
                <LanguageProvider messages={messages}>
                    <CartProvider>
                        <AppProvider>
                            <AuthProvider>
                                <AppLayout>
                                    <Loading />
                                    <Component {...pageProps} deviceType={{ mobile, tablet, desktop }} social={social}/>
                                    <ToastContainer />
                                </AppLayout>
                                <GlobalStyle />
                            </AuthProvider>
                        </AppProvider>
                    </CartProvider>
                </LanguageProvider>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

function Loading() {
    const isLoading = useAppState('isLoading');
    return (
        <Backdrop open={isLoading} style={{ zIndex: 99999 }}>
            <CircularProgress />
        </Backdrop>
    );
}
