import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../utils/track';

/**
 * Fires a `pageview` event on every route change. The track utility itself
 * skips admin paths, so we don't pollute the dashboard with our own activity.
 * The ref guards against React 18 strict mode firing useEffect twice.
 */
export function usePageTracking(): void {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    if (lastPath.current === fullPath) return;
    lastPath.current = fullPath;
    track({ type: 'pageview', path: fullPath });
  }, [location.pathname, location.search]);
}
