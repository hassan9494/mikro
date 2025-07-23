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
    static async getInitialProps(ctx: DocumentContext): Promise<CustomDocumentInitialProps> {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialUiSheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        // Fetch the scripts from the API (keeping your existing logic)
        const res = await fetch(`${url}/tag`);
        const data = await res.json();

        const headScripts = data.data.filter((item: any) => item.type === 'HEAD').map((item: any) => item.script).join('');
        const bodyScripts = data.data.filter((item: any) => item.type === 'BODY').map((item: any) => item.script).join('');

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props: any) =>
                        styledComponentsSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />)
                        ),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    ...React.Children.toArray(initialProps.styles),
                    materialUiSheets.getStyleElement(),
                    styledComponentsSheet.getStyleElement(),
                ],
                headScripts,
                bodyScripts,
            };
        } finally {
            styledComponentsSheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en" data-head-scripts={this.props.headScripts} data-body-scripts={this.props.bodyScripts}>
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap" rel="stylesheet" />
                    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=611a67ca030dfe001340392c&product=sticky-share-buttons' async={true}/>
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
                        rel="stylesheet"
                    />

                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}