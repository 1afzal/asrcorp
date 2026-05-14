import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Activity, RefreshCw } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isAuthenticated } from '../utils/auth';
import { api, apiErrorMessage } from '../utils/api';
import StatCard from '../components/admin/StatCard';
import AnalyticsChart, { ChartPoint } from '../components/admin/AnalyticsChart';
import { formatINR } from '../utils/format';

interface OverviewBucket {
  pageviews: number;
  productViews: number;
  checkoutsStarted: number;
  purchases: number;
  failedPurchases: number;
  revenueINR: number;
  uniqueSessions: number;
}

interface OverviewResponse {
  days: number;
  current: OverviewBucket;
  previous: OverviewBucket;
}

interface TopProduct {
  slug: string;
  name?: string;
  views?: number;
  purchases?: number;
  revenueINR?: number;
}

interface TopResponse {
  topViewed: TopProduct[];
  topPurchased: TopProduct[];
}

interface RecentEvent {
  _id: string;
  type: string;
  path?: string;
  productSlug?: string;
  productName?: string;
  amountINR?: number;
  sessionId?: string;
  createdAt: string;
}

const RANGES = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 90, label: '90d' },
  { value: 365, label: '1y' },
];

const TYPE_LABEL: Record<string, string> = {
  pageview: 'Page view',
  product_view: 'Product view',
  checkout_started: 'Checkout started',
  purchase_succeeded: 'Purchase',
  purchase_failed: 'Failed purchase',
};

const TYPE_TONE: Record<string, string> = {
  pageview: 'text-muted-foreground',
  product_view: 'text-[#0A84FF]',
  checkout_started: 'text-[#FF9F0A]',
  purchase_succeeded: 'text-[#30D158]',
  purchase_failed: 'text-[#FF453A]',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return `${Math.max(1, Math.floor(diff / 1000))}s ago`;
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export default function AdminAnalytics() {
  useDocumentTitle('Analytics · Softwaresellr Admin');

  const [days, setDays] = useState(30);
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [series, setSeries] = useState<ChartPoint[]>([]);
  const [top, setTop] = useState<TopResponse | null>(null);
  const [recent, setRecent] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  const load = async (mode: 'initial' | 'refresh' = 'initial') => {
    if (mode === 'initial') setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const [a, b, c, d] = await Promise.all([
        api.get<OverviewResponse>(`/api/admin/analytics/overview?days=${days}`),
        api.get<{ series: ChartPoint[] }>(`/api/admin/analytics/timeseries?days=${days}`),
        api.get<TopResponse>(`/api/admin/analytics/top-products?days=${days}`),
        api.get<RecentEvent[]>(`/api/admin/analytics/recent`),
      ]);
      setOverview(a.data);
      setSeries(b.data.series);
      setTop(c.data);
      setRecent(d.data);
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to load analytics'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load('initial');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const conversionRate = useMemo(() => {
    if (!overview) return 0;
    const v = overview.current.productViews;
    return v === 0 ? 0 : Math.round((overview.current.purchases / v) * 1000) / 10;
  }, [overview]);

  const prevConversion = useMemo(() => {
    if (!overview) return 0;
    const v = overview.previous.productViews;
    return v === 0 ? 0 : Math.round((overview.previous.purchases / v) * 1000) / 10;
  }, [overview]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Activity across the public store, last {days} days.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="glass flex h-9 items-center gap-1 rounded-pill p-1">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setDays(r.value)}
                className={[
                  'h-7 rounded-pill px-3 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                  days === r.value
                    ? 'bg-foreground text-background shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => load('refresh')}
            disabled={refreshing}
            className="flex h-9 w-9 items-center justify-center rounded-pill border border-overlay/10 bg-overlay/5 text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error ? (
        <div className="glass rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          {error}
          <button onClick={() => load('initial')} className="ml-3 underline hover:no-underline">
            Retry
          </button>
        </div>
      ) : loading || !overview ? (
        <div className="glass rounded-lg p-12 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard
              label="Page views"
              value={overview.current.pageviews.toLocaleString('en-IN')}
              current={overview.current.pageviews}
              previous={overview.previous.pageviews}
            />
            <StatCard
              label="Product views"
              value={overview.current.productViews.toLocaleString('en-IN')}
              current={overview.current.productViews}
              previous={overview.previous.productViews}
            />
            <StatCard
              label="Purchases"
              value={overview.current.purchases.toLocaleString('en-IN')}
              current={overview.current.purchases}
              previous={overview.previous.purchases}
            />
            <StatCard
              label="Revenue"
              value={formatINR(overview.current.revenueINR)}
              current={overview.current.revenueINR}
              previous={overview.previous.revenueINR}
            />
            <StatCard
              label="Conversion"
              value={`${conversionRate}%`}
              current={conversionRate}
              previous={prevConversion}
            />
          </div>

          <div className="mb-5">
            <AnalyticsChart data={series} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="glass rounded-lg p-5 lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
                Most viewed
              </h3>
              {top && top.topViewed.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {top.topViewed.map((p, i) => (
                    <li
                      key={p.slug}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-overlay/[0.03]"
                    >
                      <span className="w-5 font-mono text-2xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 truncate text-sm text-foreground">
                        {p.name || p.slug}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {p.views?.toLocaleString('en-IN')}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No product views yet.</p>
              )}
            </div>

            <div className="glass rounded-lg p-5 lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
                Top by revenue
              </h3>
              {top && top.topPurchased.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {top.topPurchased.map((p, i) => (
                    <li
                      key={p.slug}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-overlay/[0.03]"
                    >
                      <span className="w-5 font-mono text-2xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm text-foreground">{p.name || p.slug}</div>
                        <div className="text-2xs text-muted-foreground">
                          {p.purchases} {p.purchases === 1 ? 'sale' : 'sales'}
                        </div>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-foreground">
                        {formatINR(p.revenueINR || 0)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No purchases yet.</p>
              )}
            </div>

            <div className="glass rounded-lg p-5 lg:col-span-1">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
                <Activity size={13} className="text-foreground" />
                Live activity
              </h3>
              {recent.length > 0 ? (
                <ul className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-1">
                  {recent.map((e) => (
                    <li
                      key={e._id}
                      className="rounded-md border border-overlay/5 bg-overlay/[0.02] px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-2xs font-medium uppercase tracking-wider ${TYPE_TONE[e.type] || 'text-muted-foreground'}`}
                        >
                          {TYPE_LABEL[e.type] || e.type}
                        </span>
                        <span className="text-2xs tabular-nums text-muted-foreground">
                          {timeAgo(e.createdAt)}
                        </span>
                      </div>
                      <div className="mt-1 truncate text-xs text-foreground">
                        {e.productName || e.path || e.productSlug || '—'}
                      </div>
                      {e.amountINR ? (
                        <div className="text-2xs tabular-nums text-muted-foreground">
                          {formatINR(e.amountINR)}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No events yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
