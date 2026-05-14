import { API_BASE_URL } from './api';

export type EventType =
  | 'pageview'
  | 'product_view'
  | 'checkout_started'
  | 'purchase_succeeded'
  | 'purchase_failed';

export interface TrackPayload {
  type: EventType;
  path?: string;
  referrer?: string;
  productSlug?: string;
  productKey?: string;
  productName?: string;
  amountINR?: number;
  paymentIntentId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  meta?: Record<string, unknown>;
}

const SESSION_KEY = 'softwaresellr:session-id';

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Fire-and-forget. Never throws, never blocks UI. Uses sendBeacon when leaving
// the page so events aren't lost on navigation, and falls back to fetch with
// keepalive for in-page navigations (router transitions).
export function track(payload: TrackPayload): void {
  if (typeof window === 'undefined') return;

  // Skip the admin tool itself — we don't want to count our own activity.
  if (window.location.pathname.startsWith('/admin')) return;

  const body = JSON.stringify({
    ...payload,
    sessionId: getSessionId(),
    referrer: payload.referrer ?? document.referrer ?? undefined,
  });

  const url = `${API_BASE_URL}/api/track`;

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      const sent = navigator.sendBeacon(url, blob);
      if (sent) return;
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // intentionally swallow — analytics must never break UX
  }
}
