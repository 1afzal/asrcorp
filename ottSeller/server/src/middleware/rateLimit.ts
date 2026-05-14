import rateLimit from 'express-rate-limit';

/**
 * Strict limiter for the admin login route. 5 attempts per 15 minutes per IP
 * is enough that a real operator hitting the wrong password a few times won't
 * lock themselves out, but a brute-forcer hammering the endpoint will be cut
 * off long before they make meaningful progress against a strong password.
 */
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

/**
 * Looser limiter for the public tracking endpoint. Real users emit a handful
 * of events per page view (a pageview, maybe a product_view), so 120/min/IP
 * is comfortable. Catches anyone trying to flood the analytics with garbage.
 */
export const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  // We never want a 429 to spam the public site with errors — silently drop
  // overflow events instead.
  handler: (_req, res) => res.status(204).end(),
});
