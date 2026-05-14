import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/auth';
import { adminLoginLimiter } from '../middleware/rateLimit';
import { Product } from '../models/Product';
import { csvToObjects } from '../csv';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function timingSafeEqualString(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // Still consume time to avoid early-return signal
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

router.post('/login', adminLoginLimiter, validateBody(loginSchema), (req, res) => {
  const { email, password } = req.body as z.infer<typeof loginSchema>;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !secret) {
    return res
      .status(500)
      .json({ error: 'Admin credentials not configured on server' });
  }

  const emailOk = timingSafeEqualString(email.toLowerCase(), adminEmail.toLowerCase());
  const passwordOk = timingSafeEqualString(password, adminPassword);
  if (!emailOk || !passwordOk) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email: adminEmail, role: 'admin' }, secret, {
    expiresIn: '12h',
  });
  return res.json({ token, email: adminEmail });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ email: req.admin?.email });
});

const productSchema = z.object({
  productKey: z.string().min(1).optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, digits, and dashes'),
  sku: z.string().optional().nullable(),
  name: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  types: z.array(z.string()).optional(),
  validity: z.string().min(1),
  stockStatus: z.enum(['in_stock', 'out_of_stock']),
  priceINR: z.number().nonnegative(),
  priceUSD: z.number().nonnegative(),
  warranty: z.string().min(1),
  description: z.string().optional().default(''),
  activationNote: z.string().optional().default(''),
  termsAndConditions: z.array(z.string()).optional(),
  userGuide: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  promo: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().or(z.literal('')).nullable(),
  simpleIconSlug: z.string().optional().nullable(),
  brandColor: z.string().optional().nullable(),
  brandInitial: z.string().optional().nullable(),
});

router.get('/products', requireAdmin, async (_req, res) => {
  const products = await Product.find().sort({ category: 1, name: 1 }).lean();
  res.json(products);
});

router.get('/products/:id', requireAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/products', requireAdmin, validateBody(productSchema), async (req, res) => {
  const body = req.body as z.infer<typeof productSchema>;
  const productKey = body.productKey || `custom-${Date.now()}`;
  try {
    const created = await Product.create({ ...body, productKey });
    res.status(201).json(created);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create product';
    res.status(400).json({ error: message });
  }
});

router.put('/products/:id', requireAdmin, validateBody(productSchema), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update product';
    res.status(400).json({ error: message });
  }
});

router.delete('/products/:id', requireAdmin, async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────────
// Bulk product import via CSV
// ─────────────────────────────────────────────────────────────────

const bulkImportSchema = z.object({
  csv: z.string().min(1).max(2_000_000), // ~2 MB cap
  mode: z.enum(['create', 'upsert']).default('create'),
});

interface BulkResult {
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; message: string }[];
}

// Per-row validator for CSV imports. Numbers come in as strings — coerce them
// here, and accept comma-separated `types` strings for multi-type products.
const bulkRowSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, digits, dashes'),
  name: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  validity: z.string().min(1),
  warranty: z.string().min(1),
  priceINR: z.coerce.number().nonnegative(),
  priceUSD: z.coerce.number().nonnegative(),
  stockStatus: z.enum(['in_stock', 'out_of_stock']).default('in_stock'),
  description: z.string().optional().default(''),
  activationNote: z.string().optional().default(''),
  region: z.string().optional(),
  promo: z.string().optional(),
  userGuide: z.string().optional(),
  termsAndConditions: z.string().optional(), // pipe-separated in CSV
  imageUrl: z.string().url().optional().or(z.literal('')),
  simpleIconSlug: z.string().optional(),
  sku: z.string().optional(),
  types: z.string().optional(), // comma-separated in CSV
  productKey: z.string().optional(),
});

router.post(
  '/products/bulk',
  requireAdmin,
  validateBody(bulkImportSchema),
  async (req, res) => {
    const { csv, mode } = req.body as z.infer<typeof bulkImportSchema>;

    const parsed = csvToObjects(csv);
    if (parsed.headers.length === 0 || parsed.rows.length === 0) {
      return res.status(400).json({ error: 'CSV is empty or has no header row' });
    }

    const result: BulkResult = { created: 0, updated: 0, skipped: 0, errors: [] };

    for (let i = 0; i < parsed.rows.length; i++) {
      const raw = parsed.rows[i]!;
      const rowNumber = i + 2; // +1 for header, +1 for 1-indexed

      // Strip empty-string optional fields so Zod's defaults apply.
      const cleaned: Record<string, string> = {};
      for (const [k, v] of Object.entries(raw)) {
        if (v !== '') cleaned[k] = v;
      }

      const check = bulkRowSchema.safeParse(cleaned);
      if (!check.success) {
        const message = check.error.issues
          .map((i) => `${i.path.join('.')}: ${i.message}`)
          .join('; ');
        result.errors.push({ row: rowNumber, message });
        continue;
      }

      const r = check.data;
      const doc = {
        productKey: r.productKey || `csv-${Date.now()}-${i}`,
        slug: r.slug,
        sku: r.sku,
        name: r.name,
        category: r.category,
        type: r.type,
        types: r.types
          ? r.types.split(',').map((s) => s.trim()).filter(Boolean)
          : undefined,
        validity: r.validity,
        warranty: r.warranty,
        priceINR: r.priceINR,
        priceUSD: r.priceUSD,
        stockStatus: r.stockStatus,
        description: r.description,
        activationNote: r.activationNote,
        region: r.region,
        promo: r.promo,
        userGuide: r.userGuide,
        termsAndConditions: r.termsAndConditions
          ? r.termsAndConditions.split('|').map((s) => s.trim()).filter(Boolean)
          : undefined,
        imageUrl: r.imageUrl || undefined,
        simpleIconSlug: r.simpleIconSlug,
      };

      try {
        const existing = await Product.findOne({ slug: r.slug }).lean();
        if (existing) {
          if (mode === 'upsert') {
            await Product.updateOne({ slug: r.slug }, { $set: doc });
            result.updated++;
          } else {
            result.skipped++;
          }
          continue;
        }
        await Product.create(doc);
        result.created++;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Insert failed';
        result.errors.push({ row: rowNumber, message });
      }
    }

    res.json({ headers: parsed.headers, totalRows: parsed.rows.length, ...result });
  },
);

export default router;
