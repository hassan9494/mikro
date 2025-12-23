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
import createEmotionServer from '@emotion/server/create-instance';

import theme from 'theme';
import createEmotionCache from 'utils/createEmotionCache';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const emotionCache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(emotionCache);

    try {
      const enhanceApp = (App: any) =>
        function EnhanceApp(props: any) {
          return styledComponentsSheet.collectStyles(
            <App emotionCache={emotionCache} {...props} />
          ) as any;
        };

      ctx.renderPage = () => (originalRenderPage as any)({ enhanceApp });

      const initialProps = await Document.getInitialProps(ctx);

      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));

      return {
        ...initialProps,
        styles: (
          <>
            {React.Children.toArray(initialProps.styles)}
            {styledComponentsSheet.getStyleElement()}
            {emotionStyleTags}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    // Get environment variables
    const metaPixelId1 = process.env.NEXT_PUBLIC_META_PIXEL_ID_1;
    const metaPixelId2 = process.env.NEXT_PUBLIC_META_PIXEL_ID_2;
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    return (
      <Html lang="en">
        <Head>
          <meta name="emotion-insertion-point" content="" />
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap"
            rel="stylesheet"
          />

          {metaPixelId1 && (
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId1}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          )}
          {metaPixelId2 && (
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId2}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          )}
        </Head>
        <body>
          <div id="modal-root" />
          <Main />
          <NextScript />
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
        </body>
      </Html>
    );
  }
}