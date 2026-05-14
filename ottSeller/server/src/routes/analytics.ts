import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { Event } from '../models/Event';

const router = Router();

router.use(requireAdmin);

function rangeFromQuery(req: { query: Record<string, unknown> }): { from: Date; to: Date; days: number } {
  const days = Math.max(1, Math.min(365, Number(req.query.days) || 30));
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  return { from, to, days };
}

router.get('/overview', async (req, res) => {
  const { from, to, days } = rangeFromQuery(req);
  const prevFrom = new Date(from.getTime() - days * 24 * 60 * 60 * 1000);

  const [current, previous] = await Promise.all([
    aggregateOverview(from, to),
    aggregateOverview(prevFrom, from),
  ]);

  res.json({
    days,
    range: { from, to },
    current,
    previous,
  });
});

interface OverviewBucket {
  pageviews: number;
  productViews: number;
  checkoutsStarted: number;
  purchases: number;
  failedPurchases: number;
  revenueINR: number;
  uniqueSessions: number;
}

async function aggregateOverview(from: Date, to: Date): Promise<OverviewBucket> {
  const rows = await Event.aggregate([
    { $match: { createdAt: { $gte: from, $lt: to } } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $eq: ['$type', 'purchase_succeeded'] }, { $ifNull: ['$amountINR', 0] }, 0],
          },
        },
        sessions: { $addToSet: '$sessionId' },
      },
    },
  ]);

  const sessionSet = new Set<string>();
  let revenue = 0;
  const counts: Record<string, number> = {};

  for (const row of rows) {
    counts[row._id] = row.count;
    if (row._id === 'purchase_succeeded') revenue += row.revenue || 0;
    for (const s of row.sessions || []) {
      if (s) sessionSet.add(s);
    }
  }

  return {
    pageviews: counts.pageview || 0,
    productViews: counts.product_view || 0,
    checkoutsStarted: counts.checkout_started || 0,
    purchases: counts.purchase_succeeded || 0,
    failedPurchases: counts.purchase_failed || 0,
    revenueINR: revenue,
    uniqueSessions: sessionSet.size,
  };
}

router.get('/timeseries', async (req, res) => {
  const { from, to, days } = rangeFromQuery(req);

  const rows = await Event.aggregate([
    { $match: { createdAt: { $gte: from, $lt: to } } },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          type: '$type',
        },
        count: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $eq: ['$type', 'purchase_succeeded'] }, { $ifNull: ['$amountINR', 0] }, 0],
          },
        },
      },
    },
  ]);

  // Build a contiguous day-by-day array so the chart x-axis is uniform.
  const byDay: Record<string, { pageviews: number; productViews: number; purchases: number; revenueINR: number }> = {};
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  for (let i = 0; i < days; i++) {
    const d = new Date(from.getTime() + i * 24 * 60 * 60 * 1000);
    byDay[fmt(d)] = { pageviews: 0, productViews: 0, purchases: 0, revenueINR: 0 };
  }

  for (const row of rows) {
    const day = row._id.day as string;
    if (!byDay[day]) continue;
    if (row._id.type === 'pageview') byDay[day].pageviews += row.count;
    if (row._id.type === 'product_view') byDay[day].productViews += row.count;
    if (row._id.type === 'purchase_succeeded') {
      byDay[day].purchases += row.count;
      byDay[day].revenueINR += row.revenue || 0;
    }
  }

  const series = Object.entries(byDay).map(([date, v]) => ({ date, ...v }));
  res.json({ days, series });
});

router.get('/top-products', async (req, res) => {
  const { from, to } = rangeFromQuery(req);
  const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 10));

  const [topViewed, topPurchased] = await Promise.all([
    Event.aggregate([
      {
        $match: {
          type: 'product_view',
          createdAt: { $gte: from, $lt: to },
          productSlug: { $ne: null },
        },
      },
      {
        $group: {
          _id: '$productSlug',
          views: { $sum: 1 },
          name: { $last: '$productName' },
        },
      },
      { $sort: { views: -1 } },
      { $limit: limit },
    ]),
    Event.aggregate([
      {
        $match: {
          type: 'purchase_succeeded',
          createdAt: { $gte: from, $lt: to },
          productSlug: { $ne: null },
        },
      },
      {
        $group: {
          _id: '$productSlug',
          purchases: { $sum: 1 },
          revenueINR: { $sum: { $ifNull: ['$amountINR', 0] } },
          name: { $last: '$productName' },
        },
      },
      { $sort: { revenueINR: -1, purchases: -1 } },
      { $limit: limit },
    ]),
  ]);

  res.json({
    topViewed: topViewed.map((r) => ({ slug: r._id, name: r.name, views: r.views })),
    topPurchased: topPurchased.map((r) => ({
      slug: r._id,
      name: r.name,
      purchases: r.purchases,
      revenueINR: r.revenueINR,
    })),
  });
});

router.get('/recent', async (_req, res) => {
  const events = await Event.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .select('-userAgent -meta')
    .lean();
  res.json(events);
});

export default router;
