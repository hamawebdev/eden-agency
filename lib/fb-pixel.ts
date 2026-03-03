export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
    // @ts-expect-error - fbq is injected by the Facebook Pixel script
    if (typeof window !== "undefined" && window.fbq) {
        // @ts-expect-error - fbq is injected by the Facebook Pixel script
        window.fbq("track", "PageView");
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const event = (name: string, options?: any) => {
    // @ts-expect-error - fbq is injected by the Facebook Pixel script
    if (typeof window !== "undefined" && window.fbq) {
        // @ts-expect-error - fbq is injected by the Facebook Pixel script
        window.fbq("track", name, options);
    }
};
