import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
  /** Path-only canonical URL — e.g. `/products/figma-professional`. */
  canonical?: string;
  /** Set to true for admin / 404 / payment-failed pages. Adds <meta name="robots" content="noindex"/>. */
  noindex?: boolean;
}

const DEFAULT_DESCRIPTION =
  'Softwaresellr — premium software subscriptions at honest prices. Genuine accounts, instant delivery, warranty included. Order over WhatsApp.';
const SITE_NAME = 'Softwaresellr';

/**
 * Sets <title>, meta description, Open Graph, Twitter card, and canonical
 * link tags for the current page. Restores the previous values on unmount so
 * navigating away from a tagged page doesn't leak its metadata into others.
 */
export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  canonical,
  noindex = false,
}: SeoOptions): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const tags: { selector: string; create: () => HTMLElement }[] = [
      {
        selector: 'meta[name="description"]',
        create: () => buildMeta({ name: 'description', content: description }),
      },
      {
        selector: 'meta[property="og:title"]',
        create: () => buildMeta({ property: 'og:title', content: title }),
      },
      {
        selector: 'meta[property="og:description"]',
        create: () => buildMeta({ property: 'og:description', content: description }),
      },
      {
        selector: 'meta[property="og:site_name"]',
        create: () => buildMeta({ property: 'og:site_name', content: SITE_NAME }),
      },
      {
        selector: 'meta[property="og:type"]',
        create: () => buildMeta({ property: 'og:type', content: 'website' }),
      },
      {
        selector: 'meta[name="twitter:card"]',
        create: () => buildMeta({ name: 'twitter:card', content: 'summary_large_image' }),
      },
      {
        selector: 'meta[name="twitter:title"]',
        create: () => buildMeta({ name: 'twitter:title', content: title }),
      },
      {
        selector: 'meta[name="twitter:description"]',
        create: () => buildMeta({ name: 'twitter:description', content: description }),
      },
    ];

    if (image) {
      tags.push(
        {
          selector: 'meta[property="og:image"]',
          create: () => buildMeta({ property: 'og:image', content: image }),
        },
        {
          selector: 'meta[name="twitter:image"]',
          create: () => buildMeta({ name: 'twitter:image', content: image }),
        },
      );
    }

    if (canonical) {
      tags.push({
        selector: 'link[rel="canonical"]',
        create: () => buildLink({ rel: 'canonical', href: absoluteUrl(canonical) }),
      });
    }

    if (noindex) {
      tags.push({
        selector: 'meta[name="robots"]',
        create: () => buildMeta({ name: 'robots', content: 'noindex, nofollow' }),
      });
    }

    const restorers = tags.map(applyTag);

    return () => {
      document.title = previousTitle;
      for (const restore of restorers) restore();
      // Always strip noindex on unmount so it doesn't bleed into the next page.
      const robots = document.head.querySelector('meta[name="robots"]');
      if (robots && !noindex) robots.remove();
    };
  }, [title, description, image, canonical, noindex]);
}

function buildMeta(attrs: Record<string, string>): HTMLMetaElement {
  const el = document.createElement('meta');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function buildLink(attrs: Record<string, string>): HTMLLinkElement {
  const el = document.createElement('link');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function applyTag(tag: { selector: string; create: () => HTMLElement }): () => void {
  const head = document.head;
  const existing = head.querySelector(tag.selector);
  const previousValue = existing?.getAttribute('content') || existing?.getAttribute('href') || null;
  const next = tag.create();

  if (existing) {
    existing.replaceWith(next);
    return () => {
      if (previousValue !== null) {
        if (existing.tagName === 'META') existing.setAttribute('content', previousValue);
        else existing.setAttribute('href', previousValue);
        next.replaceWith(existing);
      } else {
        next.remove();
      }
    };
  }

  head.appendChild(next);
  return () => next.remove();
}

function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  if (/^https?:/.test(path)) return path;
  const origin = window.location.origin;
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
}
