import { useEffect } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider, Theme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'site-settings/site-theme/default';
import { AppProvider, useAppState } from 'contexts/app/app.provider';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { LanguageProvider } from 'contexts/language/language.provider';
import { CartProvider } from 'contexts/cart/use-cart';
import { useMedia } from 'utils/use-media';
import AppLayout from 'layouts/app-layout';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Swiper styles are imported only where the component is used to avoid loading them on every page
import { ToastContainer } from 'react-toastify';
import theme from 'theme';
import { GlobalStyle } from 'assets/styles/global.style';
import { messages } from 'site-settings/site-translation/messages';
import React from 'react';
import { OrderProvider } from "../contexts/order/order.provider";
import {useSocial} from "../data/use-website";
import {useSettings} from "../data/use-website";
import type { AppProps } from 'next/app';
import createEmotionCache from 'utils/createEmotionCache';
import { ModalProvider } from 'components/modal/modal-provider';
import AnalyticsScripts from 'components/analytics/analytics-scripts';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const clientSideEmotionCache = createEmotionCache();

interface ExtendedAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function ExtendedApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: ExtendedAppProps) {
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

    const StyledThemeProvider = ThemeProvider as unknown as React.ComponentType<React.PropsWithChildren<{ theme: typeof defaultTheme }>>;
    const StyledGlobalStyle = GlobalStyle as unknown as React.ComponentType;

    return (
        <CacheProvider value={emotionCache}>
            <StyledEngineProvider injectFirst>
                <MuiThemeProvider theme={theme as Theme}>
                    <CssBaseline />
                    <StyledThemeProvider theme={defaultTheme}>
                        <LanguageProvider messages={messages}>
                            <CartProvider>
                                <AppProvider>
                                    <AuthProvider>
                                        <ModalProvider>
                                            <AnalyticsScripts />
                                            <AppLayout>
                                                <Loading />
                                                <Component {...pageProps} deviceType={{ mobile, tablet, desktop }} social={social} settings={setting}/>
                                                <ToastContainer />
                                            </AppLayout>
                                            <StyledGlobalStyle />
                                        </ModalProvider>
                                    </AuthProvider>
                                </AppProvider>
                            </CartProvider>
                        </LanguageProvider>
                    </StyledThemeProvider>
                </MuiThemeProvider>
            </StyledEngineProvider>
        </CacheProvider>
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
