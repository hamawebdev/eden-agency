"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import * as fbq from "@/lib/fb-pixel";

type FacebookPixelProps = {
    paramBuilderScriptUrl?: string;
};

export default function FacebookPixel({ paramBuilderScriptUrl }: FacebookPixelProps) {
    const pixelId = fbq.FB_PIXEL_ID;
    const [loaded, setLoaded] = useState(false);
    const trackedInitialPageview = useRef(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const builderScriptUrl =
        paramBuilderScriptUrl?.trim() || fbq.DEFAULT_META_PARAM_BUILDER_SCRIPT_URL;

    useEffect(() => {
        if (typeof window === "undefined") return;

        fbq.processMetaBrowserParams(window.location.href);

        if (!loaded) return;
        if (!trackedInitialPageview.current) {
            trackedInitialPageview.current = true;
            return;
        }

        // Fire pageview on client-side route/search param changes.
        fbq.pageview();
    }, [pathname, searchParams, loaded]);

    if (!pixelId) return null;

    return (
        <div>
            <Script
                id="meta-param-builder"
                strategy="afterInteractive"
                src={builderScriptUrl}
            />
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
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
            fbq('init', ${JSON.stringify(pixelId)});
            fbq('track', 'PageView');
          `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </div>
    );
}
