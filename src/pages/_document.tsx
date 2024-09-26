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

interface CustomDocumentInitialProps extends DocumentInitialProps {
    headScripts: string;
    bodyScripts: string;
}

export default class CustomDocument extends Document<CustomDocumentInitialProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<CustomDocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        // Fetch the scripts from the API
        const res = await fetch(`${url}/tag`);
        const data = await res.json();

        const headScripts = data.data.filter((item: any) => item.type === 'HEAD').map((item: any) => item.script).join('');
        const bodyScripts = data.data.filter((item: any) => item.type === 'BODY').map((item: any) => item.script).join('');

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    ...React.Children.toArray(initialProps.styles),
                    ...React.Children.toArray(sheet.getStyleElement())
                ],
                headScripts,
                bodyScripts,
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en" data-head-scripts={this.props.headScripts} data-body-scripts={this.props.bodyScripts}>
                <Head>
                    {/* MUI */}
                    {/*<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>*/}
                    {/*<script*/}
                    {/*    dangerouslySetInnerHTML={{*/}
                    {/*        __html: `*/}
                    {/*            window.dataLayer = window.dataLayer || [];*/}
                    {/*            function gtag(){dataLayer.push(arguments);}*/}
                    {/*            gtag('js', new Date());*/}
                    {/*            gtag('event', 'test hassan');*/}
                    {/*            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');*/}
                    {/*          `,*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap" rel="stylesheet" />
                    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=611a67ca030dfe001340392c&product=sticky-share-buttons' async={true}/>
                </Head>
                <body>
                <div className="sharethis-sticky-share-buttons"></div>
                <Main />
                <div id="modal-root" />
                <NextScript />
                </body>
            </Html>
        );
    }
}
