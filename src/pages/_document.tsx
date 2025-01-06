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
import theme from 'theme';
import Script from "next/experimental-script";

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                ...React.Children.toArray(sheet.getStyleElement())
            ],
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="theme-color" content={theme.palette.primary.main} />

                    {/* Meta Pixel Code */}
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
                                fbq('init', '575462242809837');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    <noscript>
                        <img height="1" width="1" style={{ display: 'none' }}
                             src="https://www.facebook.com/tr?id=575462242809837&ev=PageView&noscript=1"
                        />
                    </noscript>
                    {/* End Meta Pixel Code */}

                    {/* Google Tag Manager */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){
                                    w[l]=w[l]||[];
                                    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                                    var f=d.getElementsByTagName(s)[0],
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                                    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                                    f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-57LVM8TH');
                            `,
                        }}
                    />
                    {/* End Google Tag Manager */}
                </Head>
                <body>
                <Main />
                <NextScript />

                {/* Meta Pixel Code in the body */}
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
                                fbq('init', '575462242809837');
                                fbq('track', 'PageView');
                            `,
                    }}
                />
                <noscript>
                    <img height="1" width="1" style={{ display: 'none' }}
                         src="https://www.facebook.com/tr?id=575462242809837&ev=PageView&noscript=1"
                    />
                </noscript>
                {/* End Meta Pixel Code */}

                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-57LVM8TH"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                </body>
            </Html>
        );
    }
}
