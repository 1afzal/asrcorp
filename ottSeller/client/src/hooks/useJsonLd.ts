import { useEffect } from 'react';

/**
 * Injects a <script type="application/ld+json"> with the given payload.
 * Removes it on unmount so structured data doesn't leak between pages.
 */
export function useJsonLd(payload: Record<string, unknown> | null): void {
  useEffect(() => {
    if (!payload) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(payload);
    script.dataset.seoLd = 'true';
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [payload]);
}
