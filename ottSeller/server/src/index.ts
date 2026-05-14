import app from './app';
import { connectDB } from './db';
import { seedProductsIfEmpty } from './seed';

const PORT = Number(process.env.PORT) || 4001;

// Bind the HTTP listener FIRST so the server is reachable even while MongoDB
// is still establishing its connection. Otherwise a slow Atlas connect (or a
// misconfigured cluster) blocks every request, including the admin login that
// doesn't actually need the DB to authenticate.
app.listen(PORT, () => {
  console.log(`[Softwaresellr] server listening on http://localhost:${PORT}`);
});

(async () => {
  try {
    await connectDB();
    console.log('[Softwaresellr] connected to MongoDB');
    await seedProductsIfEmpty();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Softwaresellr] MongoDB error:', message);
    console.error(
      '[Softwaresellr] DB-dependent endpoints will return 500 until the connection succeeds.',
    );
  }
})();
