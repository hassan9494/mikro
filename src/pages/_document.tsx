import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from 'theme';

interface CustomDocumentInitialProps extends DocumentInitialProps {
    headScripts: string;
    bodyScripts: string;
}

export default class CustomDocument extends Document<CustomDocumentInitialProps> {
    render() {
        // Get environment variables
        const metaPixelId1 = process.env.NEXT_PUBLIC_META_PIXEL_ID_1;
        const metaPixelId2 = process.env.NEXT_PUBLIC_META_PIXEL_ID_2;
        const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
        const gaId = process.env.NEXT_PUBLIC_GA_ID;

        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />

                    {/* Optimized Font Loading */}
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap"
                        as="style"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap"
                        rel="stylesheet"
                    />

                    {/* Load ShareThis script with defer */}
                    <script
                        type='text/javascript'
                        src='https://platform-api.sharethis.com/js/sharethis.js#property=611a67ca030dfe001340392c&product=sticky-share-buttons'
                        defer
                    />

                    {/* Bootstrap Icons */}
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
                        rel="stylesheet"
                    />

                    {/* Critical CSS for font loading optimization */}
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                /* Critical font loading styles */
                                @font-face {
                                    font-family: 'Cairo';
                                    font-style: normal;
                                    font-display: swap;
                                }
                            `,
                        }}
                    />

                    {/* Meta Pixel Code 1 */}
                    {metaPixelId1 && (
                        <>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        !function(f,b,e,v,n,t,s)
                                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                        n.queue=[];t=b.createElement(e);t.async=!0;
                                        t.src=v;s=b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');
                                        fbq('init', '${metaPixelId1}');
                                        fbq('track', 'PageView');
                                    `,
                                }}
                            />
                            <noscript>
                                <img height="1" width="1" style={{display:'none'}}
                                     src={`https://www.facebook.com/tr?id=${metaPixelId1}&ev=PageView&noscript=1`}
                                />
                            </noscript>
                        </>
                    )}
                    {/* End Meta Pixel Code */}

                    {/* Google Tag Manager */}
                    {gtmId && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','${gtmId}');
                                `,
                            }}
                        />
                    )}
                    {/* End Google Tag Manager */}

                    {/* Meta Pixel Code 2 */}
                    {metaPixelId2 && (
                        <>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        !function(f,b,e,v,n,t,s)
                                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                        n.queue=[];t=b.createElement(e);t.async=!0;
                                        t.src=v;s=b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');
                                        fbq('init', '${metaPixelId2}');
                                        fbq('track', 'PageView');
                                    `,
                                }}
                            />
                            <noscript>
                                <img height="1" width="1" style={{display:'none'}}
                                     src={`https://www.facebook.com/tr?id=${metaPixelId2}&ev=PageView&noscript=1`}
                                />
                            </noscript>
                        </>
                    )}
                    {/* End Meta Pixel Code */}

                    {/* Google tag (gtag.js) */}
                    {gaId && (
                        <>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${gaId}');
                                    `,
                                }}
                            />
                        </>
                    )}

                </Head>
                <body>
                {/* Google Tag Manager (noscript) */}
                {gtmId && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `
                                    <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
                                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
                                `,
                        }}
                    />
                )}
                {/* End Google Tag Manager (noscript) */}

                <div id="modal-root"></div>
                <Main />
                <NextScript />

                {/* Font loading optimization script */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                // Optimize font loading
                                const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
                                if (fontLink) {
                                    fontLink.onload = function() {
                                        this.media = 'all';
                                    };
                                }
                            `,
                    }}
                />
                </body>
            </Html>
        );
    }
}