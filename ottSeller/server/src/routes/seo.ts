import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

const STATIC_PATHS = ['/', '/products', '/contact', '/terms'];

function publicBaseUrl(req: { protocol: string; get: (h: string) => string | undefined }): string {
  const fromEnv = process.env.PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost:5173';
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  return `${proto}://${host}`;
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    const base = publicBaseUrl(req);
    const products = await Product.find()
      .select('slug updatedAt stockStatus')
      .lean()
      .catch(() => [] as Array<{ slug: string; updatedAt?: Date; stockStatus?: string }>);

    const today = new Date().toISOString().slice(0, 10);

    const urls: string[] = [];
    for (const path of STATIC_PATHS) {
      urls.push(
        `<url><loc>${escapeXml(base + path)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`,
      );
    }

    for (const p of products) {
      if (!p.slug) continue;
      const lastmod = p.updatedAt
        ? new Date(p.updatedAt).toISOString().slice(0, 10)
        : today;
      urls.push(
        `<url><loc>${escapeXml(`${base}/products/${p.slug}`)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
      );
    }

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      urls.join('') +
      `</urlset>`;

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sitemap error';
    res.status(500).type('text/plain').send(message);
  }
});

router.get('/robots.txt', (req, res) => {
  const base = publicBaseUrl(req);
  const body =
    `User-agent: *\n` +
    `Allow: /\n` +
    `Disallow: /admin\n` +
    `Disallow: /admin/\n\n` +
    `Sitemap: ${base}/sitemap.xml\n`;
  res.type('text/plain').send(body);
});

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default router;
