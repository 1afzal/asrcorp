import type { IncomingMessage, ServerResponse } from 'http';
import app from '../src/app';
import { connectDB } from '../src/db';
import { seedProductsIfEmpty } from '../src/seed';

// Vercel reuses the same Node process across warm invocations, so we cache
// the init promise to avoid re-connecting Mongoose on every request. On cold
// starts the first request pays the connection cost; later requests are fast.
let initPromise: Promise<void> | null = null;

async function init(): Promise<void> {
  await connectDB();
  await seedProductsIfEmpty();
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!initPromise) {
    initPromise = init().catch((err) => {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[Softwaresellr] init failed:', message);
      // Reset so the next request retries instead of being stuck forever.
      initPromise = null;
      throw err;
    });
  }
  try {
    await initPromise;
  } catch {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Database connection failed' }));
    return;
  }
  return (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
}
