import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import adminRouter from './routes/admin';
import productsRouter from './routes/products';
import trackRouter from './routes/track';
import analyticsRouter from './routes/analytics';
import ordersRouter from './routes/orders';
import seoRouter from './routes/seo';

const app = express();
const isDev = process.env.NODE_ENV !== 'production';

// Comma-separated allowlist for production. In dev, any http://localhost:* and
// http://127.0.0.1:* origin is accepted so Vite's port fallback (5173 → 5174
// → 5175 …) doesn't break local development.
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin / curl / server-to-server requests have no Origin header.
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (isDev && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        return cb(null, true);
      }
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

app.use('/api/products', productsRouter);
app.use('/api/track', trackRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin/analytics', analyticsRouter);
app.use('/api/admin/orders', ordersRouter);

// /sitemap.xml and /robots.txt — served at root for crawler convention.
app.use('/', seoRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', brand: 'Softwaresellr' });
});

export default app;
