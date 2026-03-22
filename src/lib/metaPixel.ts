// Meta Pixel Helper Utility for Headless Shopify

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

/**
 * Initialize Meta Pixel inside the React app if it exists.
 * This is primarily used for custom events like AddToCart.
 */
export const initPixel = () => {
    if (typeof window !== 'undefined' && (window as any).fbq && PIXEL_ID) {
        (window as any).fbq('init', PIXEL_ID);
    }
};

declare global {
    interface Window {
        fbq: any;
    }
}

/**
 * Track a specific event with Meta Pixel
 * @param eventName The name of the event (e.g., 'PageView', 'AddToCart')
 * @param options Additional parameters for the event (e.g., content_name, value, currency)
 */
export const trackPixelEvent = (eventName: string, options: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        if (PIXEL_ID) {
            window.fbq('track', eventName, options);
        } else {
            console.warn(`Meta Pixel: Tried to track ${eventName} but VITE_META_PIXEL_ID is missing.`);
        }
    }
};
