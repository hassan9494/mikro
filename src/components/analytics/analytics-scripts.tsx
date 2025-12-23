import React from 'react';
import Script from 'next/script';

const AnalyticsScripts: React.FC = () => {
  const metaPixelId1 = process.env.NEXT_PUBLIC_META_PIXEL_ID_1;
  const metaPixelId2 = process.env.NEXT_PUBLIC_META_PIXEL_ID_2;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  // ShareThis property from existing code (kept as fallback)
  const shareThisProperty = '611a67ca030dfe001340392c';

  return (
    <>
      {/* ShareThis (loads lazily) */}
      <Script
        src={`https://platform-api.sharethis.com/js/sharethis.js#property=${shareThisProperty}&product=sticky-share-buttons`}
        strategy="lazyOnload"
      />

      {/* Facebook Pixel(s) */}
      {metaPixelId1 && (
        <Script id="fb-pixel-1" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${metaPixelId1}');fbq('track', 'PageView');`}</Script>
      )}

      {metaPixelId2 && (
        <Script id="fb-pixel-2" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${metaPixelId2}');fbq('track', 'PageView');`}</Script>
      )}

      {/* Google Tag Manager */}
      {gtmId && (
        <Script id="gtm-script" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
      )}

      {/* Google Analytics (gtag) */}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}</Script>
        </>
      )}

      {/* Font loading optimization (apply after interactive) */}
      <Script id="font-optimization" strategy="afterInteractive">{`const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]'); if (fontLink) { fontLink.onload = function() { this.media = 'all'; } }`}</Script>
    </>
  );
};

export default AnalyticsScripts;
