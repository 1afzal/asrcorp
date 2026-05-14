import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { trackLimiter } from '../middleware/rateLimit';
import { Event } from '../models/Event';
import { Order } from '../models/Order';
import { sendNewOrderEmail } from '../email';

const router = Router();

// Public ingestion endpoint. Treated as fire-and-forget by clients — we still
// validate the shape and silently drop oversized / malformed payloads to keep
// the dashboard data clean.
const eventSchema = z.object({
  type: z.enum([
    'pageview',
    'product_view',
    'checkout_started',
    'purchase_succeeded',
    'purchase_failed',
  ]),
  path: z.string().max(512).optional(),
  referrer: z.string().max(512).optional(),
  productSlug: z.string().max(160).optional(),
  productKey: z.string().max(120).optional(),
  productName: z.string().max(240).optional(),
  amountINR: z.number().nonnegative().optional(),
  paymentIntentId: z.string().max(120).optional(),
  sessionId: z.string().max(120).optional(),
  // Customer details — only sent for checkout_started events from the
  // WhatsApp order CTA. Used to populate the Order record + admin email.
  customerName: z.string().max(160).optional(),
  customerEmail: z.string().email().max(160).optional(),
  customerPhone: z.string().max(60).optional(),
  meta: z.record(z.unknown()).optional(),
});

router.post('/', trackLimiter, validateBody(eventSchema), async (req, res) => {
  const body = req.body as z.infer<typeof eventSchema>;

  // Acknowledge the client immediately. Side-effects (Order, email) run async.
  res.status(204).end();

  try {
    const userAgent =
      typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined;
    await Event.create({ ...body, userAgent });
  } catch {
    // Swallow — never break the public site over analytics persistence.
  }

  if (body.type === 'checkout_started') {
    handleNewOrder(body).catch((err) => {
      console.error('[Softwaresellr] order side-effect failed:', err);
    });
  }
});

async function handleNewOrder(body: z.infer<typeof eventSchema>): Promise<void> {
  const source =
    (body.meta && typeof body.meta.source === 'string' && body.meta.source) || 'whatsapp';

  try {
    await Order.create({
      status: 'pending',
      productSlug: body.productSlug,
      productKey: body.productKey,
      productName: body.productName,
      amountINR: body.amountINR,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      sessionId: body.sessionId,
      source,
    });
  } catch (err) {
    console.error('[Softwaresellr] failed to create Order record:', err);
  }

  await sendNewOrderEmail({
    productName: body.productName,
    amountINR: body.amountINR,
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerPhone: body.customerPhone,
    productSlug: body.productSlug,
    source,
  });
}

export default router;
