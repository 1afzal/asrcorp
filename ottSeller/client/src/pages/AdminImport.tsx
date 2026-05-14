import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isAuthenticated } from '../utils/auth';
import { api, apiErrorMessage } from '../utils/api';
import { refreshProducts } from '../hooks/useProducts';

type Mode = 'create' | 'upsert';

interface BulkResult {
  headers: string[];
  totalRows: number;
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; message: string }[];
}

const SAMPLE_CSV = `slug,name,category,type,validity,warranty,priceINR,priceUSD,stockStatus,description,activationNote,region,imageUrl,simpleIconSlug,types,sku
example-product,Example Product,design,EDU,1 Year,1 Year,500,5.5,in_stock,Sample description,Email required,Global,,figma,"EDU,Account",SKU-001`;

const REQUIRED_HEADERS = [
  'slug',
  'name',
  'category',
  'type',
  'validity',
  'warranty',
  'priceINR',
  'priceUSD',
];

export default function AdminImport() {
  useDocumentTitle('Import · Softwaresellr Admin');

  const [csv, setCsv] = useState('');
  const [mode, setMode] = useState<Mode>('create');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BulkResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  const onFile = async (file: File) => {
    const text = await file.text();
    setCsv(text);
    setResult(null);
  };

  const submit = async () => {
    if (!csv.trim()) {
      toast.error('Paste or upload a CSV first');
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const { data } = await api.post<BulkResult>('/api/admin/products/bulk', {
        csv,
        mode,
      });
      setResult(data);
      if (data.created + data.updated > 0) {
        await refreshProducts();
        toast.success(
          `Imported ${data.created + data.updated} product${
            data.created + data.updated === 1 ? '' : 's'
          }`,
        );
      } else {
        toast(`No new rows were imported`);
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Import failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const insertSample = () => {
    setCsv(SAMPLE_CSV);
    setResult(null);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
          Bulk import
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload or paste a CSV to add many products at once.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-3">
          <div className="glass rounded-lg p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                }}
              />
              <Button
                type="button"
                variant="glass"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} /> Upload CSV file
              </Button>
              <button
                type="button"
                onClick={insertSample}
                className="flex h-9 items-center gap-1.5 rounded-pill border border-overlay/10 bg-overlay/5 px-3 text-xs text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
              >
                <FileText size={12} /> Insert sample row
              </button>
            </div>

            <textarea
              value={csv}
              onChange={(e) => {
                setCsv(e.target.value);
                if (result) setResult(null);
              }}
              rows={16}
              placeholder="Paste CSV here, or upload above…"
              className="glass-input font-mono w-full rounded-md p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
              spellCheck={false}
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Mode:</span>
                <div className="flex rounded-pill border border-overlay/10 bg-overlay/5 p-0.5">
                  <button
                    type="button"
                    onClick={() => setMode('create')}
                    className={[
                      'h-6 rounded-pill px-2.5 text-2xs font-medium transition-colors',
                      mode === 'create'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    Create only
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('upsert')}
                    className={[
                      'h-6 rounded-pill px-2.5 text-2xs font-medium transition-colors',
                      mode === 'upsert'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    Upsert (overwrite by slug)
                  </button>
                </div>
              </div>

              <Button onClick={submit} disabled={submitting || !csv.trim()}>
                {submitting ? 'Importing…' : 'Import'}
              </Button>
            </div>
          </div>

          {result && (
            <div className="glass rounded-lg p-5">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <CheckCircle2 size={16} className="text-[#30D158]" />
                <span className="text-sm font-medium text-foreground">
                  Processed {result.totalRows} row{result.totalRows === 1 ? '' : 's'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Created" value={result.created} tone="text-[#30D158]" />
                <Stat label="Updated" value={result.updated} tone="text-[#0A84FF]" />
                <Stat label="Skipped" value={result.skipped} tone="text-[#FF9F0A]" />
                <Stat label="Errors" value={result.errors.length} tone="text-[#FF453A]" />
              </div>

              {result.errors.length > 0 && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <AlertCircle size={12} className="text-[#FF453A]" />
                    Errors
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-md border border-overlay/10 bg-overlay/[0.02]">
                    <ul className="divide-y divide-overlay/5 text-xs">
                      {result.errors.map((e, i) => (
                        <li key={i} className="px-3 py-2">
                          <span className="font-mono text-2xs text-muted-foreground">
                            row {e.row}
                          </span>
                          <span className="ml-3 text-foreground">{e.message}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-3">
          <div className="glass rounded-lg p-5 text-xs leading-relaxed text-muted-foreground">
            <h3 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
              CSV format
            </h3>
            <p className="mb-3">
              First row must be the header. Required columns:
            </p>
            <ul className="mb-3 flex flex-wrap gap-1">
              {REQUIRED_HEADERS.map((h) => (
                <li
                  key={h}
                  className="rounded border border-overlay/10 bg-overlay/5 px-1.5 py-0.5 font-mono text-2xs text-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
            <p className="mb-3">Optional columns:</p>
            <ul className="mb-3 flex flex-wrap gap-1">
              {[
                'description',
                'activationNote',
                'region',
                'promo',
                'userGuide',
                'imageUrl',
                'simpleIconSlug',
                'sku',
                'types',
                'termsAndConditions',
                'stockStatus',
                'productKey',
              ].map((h) => (
                <li
                  key={h}
                  className="rounded border border-overlay/10 bg-overlay/5 px-1.5 py-0.5 font-mono text-2xs text-muted-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
            <p className="mb-1">
              <strong className="text-foreground">types</strong> — comma-separated, e.g.{' '}
              <code className="font-mono">"EDU,Account"</code>
            </p>
            <p className="mb-1">
              <strong className="text-foreground">termsAndConditions</strong> — pipe-separated, e.g.{' '}
              <code className="font-mono">"1 device only|No email change"</code>
            </p>
            <p className="mb-1">
              <strong className="text-foreground">stockStatus</strong> —{' '}
              <code className="font-mono">in_stock</code> or{' '}
              <code className="font-mono">out_of_stock</code>. Defaults to in_stock.
            </p>
            <p className="mt-3">
              In <strong className="text-foreground">Create only</strong> mode, rows whose slug
              already exists are skipped. <strong className="text-foreground">Upsert</strong>{' '}
              overwrites them.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-md border border-overlay/10 bg-overlay/[0.02] p-3">
      <div className="text-2xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${tone}`}>{value}</div>
    </div>
  );
}
