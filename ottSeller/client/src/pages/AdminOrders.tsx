import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Phone, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isAuthenticated } from '../utils/auth';
import { api, apiErrorMessage } from '../utils/api';
import { formatINR } from '../utils/format';

type OrderStatus = 'pending' | 'contacted' | 'fulfilled' | 'cancelled';

interface OrderRecord {
  _id: string;
  status: OrderStatus;
  productSlug?: string;
  productName?: string;
  amountINR?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

interface Counts {
  pending: number;
  contacted: number;
  fulfilled: number;
  cancelled: number;
  total: number;
}

const STATUS_TABS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_TONE: Record<OrderStatus, string> = {
  pending: 'text-[#FF9F0A]',
  contacted: 'text-[#0A84FF]',
  fulfilled: 'text-[#30D158]',
  cancelled: 'text-muted-foreground',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return `${Math.max(1, Math.floor(diff / 1000))}s ago`;
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export default function AdminOrders() {
  useDocumentTitle('Orders · Softwaresellr Admin');

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  const load = async (mode: 'initial' | 'refresh' = 'initial') => {
    if (mode === 'initial') setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const [a, b] = await Promise.all([
        api.get<OrderRecord[]>(`/api/admin/orders${filter === 'all' ? '' : `?status=${filter}`}`),
        api.get<Counts>('/api/admin/orders/counts'),
      ]);
      setOrders(a.data);
      setCounts(b.data);
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to load orders'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load('initial');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      const { data } = await api.patch<OrderRecord>(`/api/admin/orders/${id}`, { status });
      setOrders((rows) => rows.map((r) => (r._id === id ? data : r)));
      load('refresh');
      toast.success(`Marked ${status}`);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Update failed'));
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      await api.patch(`/api/admin/orders/${id}`, { notes });
      setOrders((rows) => rows.map((r) => (r._id === id ? { ...r, notes } : r)));
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Save failed'));
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this order record? This cannot be undone.')) return;
    try {
      await api.delete(`/api/admin/orders/${id}`);
      setOrders((rows) => rows.filter((r) => r._id !== id));
      load('refresh');
      toast.success('Order deleted');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    }
  };

  const tabs = useMemo(() => STATUS_TABS, []);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading
              ? 'Loading…'
              : counts
                ? `${counts.total} total · ${counts.pending} pending · ${counts.fulfilled} fulfilled`
                : `${orders.length} orders`}
          </p>
        </div>

        <button
          onClick={() => load('refresh')}
          disabled={refreshing}
          className="flex h-9 w-9 items-center justify-center rounded-pill border border-overlay/10 bg-overlay/5 text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground disabled:opacity-50 sm:self-start"
          title="Refresh"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="mb-5 -mx-4 overflow-x-auto px-4">
        <div className="glass inline-flex items-center gap-0.5 rounded-pill p-1">
          {tabs.map((t) => {
            const active = filter === t.value;
            const count =
              t.value === 'all'
                ? counts?.total
                : counts
                  ? counts[t.value as OrderStatus]
                  : undefined;
            return (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                className={[
                  'flex h-8 items-center gap-2 whitespace-nowrap rounded-pill px-4 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                  active
                    ? 'bg-foreground text-background shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t.label}
                {count !== undefined && (
                  <span className="font-mono tabular-nums opacity-70">{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <div className="glass rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          {error}
          <button onClick={() => load('initial')} className="ml-3 underline hover:no-underline">
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="glass rounded-lg p-12 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : orders.length === 0 ? (
        <div className="glass rounded-lg p-12 text-center text-sm text-muted-foreground">
          No orders {filter !== 'all' ? `with status "${filter}"` : 'yet'}.
        </div>
      ) : (
        <div className="glass overflow-hidden rounded-lg">
          <ul className="divide-y divide-overlay/5">
            {orders.map((o) => {
              const expanded = expandedId === o._id;
              return (
                <li key={o._id} className="px-5 py-4 transition-colors hover:bg-overlay/[0.03]">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className={`text-2xs font-medium uppercase tracking-wider ${STATUS_TONE[o.status]}`}>
                          {o.status}
                        </span>
                        <span className="text-2xs text-muted-foreground">
                          {timeAgo(o.createdAt)}
                        </span>
                        {o.amountINR !== undefined && (
                          <span className="text-2xs font-mono text-muted-foreground">
                            {formatINR(o.amountINR)}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 truncate text-sm font-medium tracking-tight text-foreground">
                        {o.productName || o.productSlug || '—'}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="text-foreground">{o.customerName || '—'}</span>
                        {o.customerEmail && (
                          <a
                            href={`mailto:${o.customerEmail}`}
                            className="inline-flex items-center gap-1 hover:text-foreground"
                          >
                            <Mail size={11} /> {o.customerEmail}
                          </a>
                        )}
                        {o.customerPhone && (
                          <a
                            href={`tel:${o.customerPhone.replace(/[^+\d]/g, '')}`}
                            className="inline-flex items-center gap-1 hover:text-foreground"
                          >
                            <Phone size={11} /> {o.customerPhone}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {o.productSlug && (
                        <a
                          href={`/products/${o.productSlug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
                          title="View public page"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                      <button
                        onClick={() => setExpandedId(expanded ? null : o._id)}
                        className="h-8 rounded-pill border border-overlay/10 bg-overlay/5 px-3 text-2xs font-medium text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
                      >
                        {expanded ? 'Close' : 'Manage'}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="mt-4 flex flex-col gap-3 border-t border-overlay/5 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {(['pending', 'contacted', 'fulfilled', 'cancelled'] as OrderStatus[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(o._id, s)}
                            disabled={o.status === s}
                            className={[
                              'h-7 rounded-pill px-3 text-2xs font-medium uppercase tracking-wider transition-all',
                              o.status === s
                                ? 'bg-foreground text-background opacity-100'
                                : 'border border-overlay/10 bg-overlay/5 text-muted-foreground hover:bg-overlay/10 hover:text-foreground',
                            ].join(' ')}
                          >
                            Mark {s}
                          </button>
                        ))}
                      </div>

                      <textarea
                        defaultValue={o.notes || ''}
                        placeholder="Internal notes (saved on blur)…"
                        rows={2}
                        onBlur={(e) => {
                          const next = e.target.value;
                          if (next !== (o.notes || '')) updateNotes(o._id, next);
                        }}
                        className="glass-input w-full rounded-md p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
                      />

                      <div className="flex justify-end">
                        <button
                          onClick={() => remove(o._id)}
                          className="flex h-7 items-center gap-1.5 rounded-pill border border-destructive/30 px-3 text-2xs text-destructive transition-colors hover:bg-destructive/10"
                        >
                          <Trash2 size={11} /> Delete record
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
