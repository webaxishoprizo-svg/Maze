import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPixelEvent } from '@/lib/metaPixel';

/**
 * Global Tracking Component for Meta Pixel PageView events.
 * This component listens for route changes and fires a PageView event on each change.
 */
const MetaPixelTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Track the final URL/Path when route changes
        // Since it's an SPA, we ensure PageView is triggered on every path update.
        trackPixelEvent('PageView', {
            path: location.pathname,
            url: window.location.href,
        });
    }, [location.pathname]);

    return null; // This component doesn't render anything
};

export default MetaPixelTracker;
