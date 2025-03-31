"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import {
  getGoogleAnalyticsId,
  getGoogleTagManagerId,
  getFacebookPixelId,
  isGoogleAnalyticsConfigured,
  isGoogleTagManagerConfigured,
  isFacebookPixelConfigured,
} from "@/lib/analytics"

export default function AnalyticsScripts() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Google Analytics page view - only if GA is configured
    if (window.gtag && window.gaId) {
      window.gtag("config", window.gaId, {
        page_path: url,
      })
    }

    // Facebook Pixel page view - only if FB Pixel is configured
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  // Get the analytics IDs using our utility functions
  const gaId = getGoogleAnalyticsId()
  const gtmId = getGoogleTagManagerId()
  const fbPixelId = getFacebookPixelId()

  // Check if analytics services are configured
  const renderGoogleAnalytics = isGoogleAnalyticsConfigured()
  const renderGTM = isGoogleTagManagerConfigured()
  const renderFBPixel = isFacebookPixelConfigured()

  return (
    <>
      {/* Google Analytics - only render if GA ID exists */}
      {renderGoogleAnalytics && (
        <>
          <Script
            id="ga-script-1"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                window.gaId = '${gaId}';
                gtag('config', window.gaId, {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <Script
            id="ga-script-2"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
        </>
      )}

      {/* Google Tag Manager - only render if GTM ID exists */}
      {renderGTM && (
        <>
          <Script
            id="gtm-script-1"
            strategy="afterInteractive"
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
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Facebook Pixel - only render if FB Pixel ID exists */}
      {renderFBPixel && (
        <>
          <Script
            id="fb-pixel-script"
            strategy="afterInteractive"
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
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  )
}

