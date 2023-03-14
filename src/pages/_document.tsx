import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

// MUI
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import theme from 'theme';

export default class CustomDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* MUI */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-STCCMDHS86"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-STCCMDHS86');
                              `,
                        }}
                    />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap" rel="stylesheet" />
                    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=611a67ca030dfe001340392c&product=sticky-share-buttons' async={true}/>

                </Head>
                <body>
                <div className="sharethis-sticky-share-buttons"></div>
                <Main/>
                <div id="modal-root"/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

// @ts-ignore
CustomDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props: any) =>
                    sheet.collectStyles(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } finally {
        sheet.seal();
    }
}
