import { useEffect } from 'react';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'site-settings/site-theme/default';
import { AppProvider, useAppState } from 'contexts/app/app.provider';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { LanguageProvider } from 'contexts/language/language.provider';
import { CartProvider } from 'contexts/cart/use-cart';
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
import {useSettings} from "../data/use-website";

export default function ExtendedApp({ Component, pageProps }) {
    // useEffect(() => {
    //     // Inject head scripts
    //     const headScripts = document.documentElement.getAttribute('data-head-scripts');
    //     if (headScripts) {
    //         const head = document.head;
    //         const scriptElement = document.createElement('div');
    //         scriptElement.innerHTML = headScripts;
    //         Array.from(scriptElement.children).forEach((child) => {
    //             const script = document.createElement('script');
    //             script.innerHTML = child.innerHTML;
    //             head.appendChild(script);
    //         });
    //     }
    //
    //     // Inject body scripts
    //     const bodyScripts = document.documentElement.getAttribute('data-body-scripts');
    //     if (bodyScripts) {
    //         const body = document.body;
    //         const scriptElement = document.createElement('div');
    //         scriptElement.innerHTML = bodyScripts;
    //         Array.from(scriptElement.children).forEach((child) => {
    //             const script = document.createElement('script');
    //             script.innerHTML = child.innerHTML;
    //             body.appendChild(script);
    //         });
    //     }
    // }, []);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    const { data: social } = useSocial();
    const { data: setting } = useSettings();
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
                                    <Component {...pageProps} deviceType={{ mobile, tablet, desktop }} social={social} settings={setting}/>
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
