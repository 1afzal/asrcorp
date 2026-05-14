import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/auth';
import { Order } from '../models/Order';

const router = Router();

router.use(requireAdmin);

router.get('/', async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const filter: Record<string, unknown> = {};
  if (status && status !== 'all') filter.status = status;

  const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(500).lean();
  res.json(orders);
});

router.get('/counts', async (_req, res) => {
  const rows = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  const out: Record<string, number> = { pending: 0, contacted: 0, fulfilled: 0, cancelled: 0 };
  let total = 0;
  for (const r of rows) {
    out[r._id] = r.count;
    total += r.count;
  }
  res.json({ ...out, total });
});

const updateSchema = z.object({
  status: z.enum(['pending', 'contacted', 'fulfilled', 'cancelled']).optional(),
  notes: z.string().max(2000).optional().nullable(),
});

router.patch('/:id', validateBody(updateSchema), async (req, res) => {
  const update: Record<string, unknown> = {};
  const body = req.body as z.infer<typeof updateSchema>;
  if (body.status) update.status = body.status;
  if (body.notes !== undefined) update.notes = body.notes;
  const updated = await Order.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Order not found' });
  res.json({ ok: true });
});

export default router;
