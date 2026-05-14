import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Search, ExternalLink, Edit3, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import SimpleIcon from '../components/ui/SimpleIcon';
import { api, apiErrorMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import { refreshProducts } from '../hooks/useProducts';
import { CATEGORY_LABELS, type Category, type Product } from '../types';
import { formatINR } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type Filter = Category | 'all';

export default function Admin() {
  useDocumentTitle('Admin · Softwaresellr');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Filter>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Product[]>('/api/admin/products');
      setProducts(data);
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to load products'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, search, category]);

  const remove = async (p: Product) => {
    if (!p._id) return;
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    setDeletingId(p._id);
    try {
      await api.delete(`/api/admin/products/${p._id}`);
      toast.success('Product deleted');
      setProducts((rows) => rows.filter((r) => r._id !== p._id));
      refreshProducts();
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? 'Loading…' : `${products.length} total · ${filtered.length} shown`}
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button>
            <Plus size={14} /> New product
          </Button>
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, slug, or SKU…"
            className="glass-input h-10 w-full rounded-pill pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Filter)}
          className="glass-input h-10 rounded-pill px-4 text-sm text-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
        >
          <option value="all">All categories</option>
          {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="glass rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          {error}
          <button onClick={load} className="ml-3 underline hover:no-underline">
            Retry
          </button>
        </div>
      ) : (
        <div className="glass overflow-hidden rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="hidden border-b border-overlay/5 text-2xs uppercase tracking-wider text-muted-foreground sm:table-header-group">
              <tr>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">Category</th>
                <th className="hidden px-5 py-3 font-medium lg:table-cell">SKU</th>
                <th className="px-5 py-3 text-right font-medium">Price</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">Stock</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p._id || p.id}
                  className="flex flex-wrap items-center gap-3 border-b border-overlay/5 p-3 transition-colors last:border-b-0 hover:bg-overlay/[0.03] sm:table-row sm:gap-0 sm:p-0"
                >
                  <td className="min-w-0 flex-1 sm:px-5 sm:py-3">
                    <div className="flex items-center gap-3">
                      <SimpleIcon product={p} size={32} rounded={8} />
                      <div className="min-w-0">
                        <div className="truncate font-medium tracking-tight text-foreground">{p.name}</div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-2xs text-muted-foreground">
                          <span className="truncate">{p.slug}</span>
                          <span className="sm:hidden">·</span>
                          <span className="sm:hidden">{CATEGORY_LABELS[p.category]}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden text-muted-foreground md:table-cell md:px-5 md:py-3">
                    {CATEGORY_LABELS[p.category]}
                  </td>
                  <td className="hidden font-mono text-xs text-muted-foreground lg:table-cell lg:px-5 lg:py-3">
                    {p.sku || '—'}
                  </td>
                  <td className="text-right tabular-nums text-foreground sm:px-5 sm:py-3">
                    {p.priceINR > 0 ? formatINR(p.priceINR) : '—'}
                  </td>
                  <td className="hidden sm:table-cell sm:px-5 sm:py-3">
                    <span
                      className={[
                        'inline-flex items-center gap-1.5 rounded-pill border px-2 py-0.5 text-2xs font-medium',
                        p.stockStatus === 'in_stock'
                          ? 'border-overlay/10 bg-overlay/5 text-foreground'
                          : 'border-overlay/10 bg-overlay/5 text-muted-foreground',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-1.5 w-1.5 rounded-full',
                          p.stockStatus === 'in_stock'
                            ? 'bg-[#30D158] shadow-[0_0_6px_rgba(48,209,88,0.6)]'
                            : 'bg-muted-foreground',
                        ].join(' ')}
                      />
                      {p.stockStatus === 'in_stock' ? 'In stock' : 'Out'}
                    </span>
                  </td>
                  <td className="sm:px-5 sm:py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/products/${p.slug}`}
                        target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
                        title="View public page"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <Link
                        to={`/admin/products/${p._id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
                        title="Edit"
                      >
                        <Edit3 size={13} />
                      </Link>
                      <button
                        onClick={() => remove(p)}
                        disabled={deletingId === p._id}
                        className="flex h-8 w-8 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No products match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
