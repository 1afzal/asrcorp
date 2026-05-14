import { useMemo, useState } from 'react';

export interface ChartPoint {
  date: string;
  pageviews: number;
  productViews: number;
  purchases: number;
  revenueINR: number;
}

interface AnalyticsChartProps {
  data: ChartPoint[];
  height?: number;
}

type Metric = 'pageviews' | 'productViews' | 'purchases' | 'revenueINR';

const METRICS: { key: Metric; label: string; color: string; fmt: (n: number) => string }[] = [
  {
    key: 'pageviews',
    label: 'Page views',
    color: '#0A84FF',
    fmt: (n) => n.toLocaleString('en-IN'),
  },
  {
    key: 'productViews',
    label: 'Product views',
    color: '#BF5AF2',
    fmt: (n) => n.toLocaleString('en-IN'),
  },
  {
    key: 'purchases',
    label: 'Purchases',
    color: '#30D158',
    fmt: (n) => n.toLocaleString('en-IN'),
  },
  {
    key: 'revenueINR',
    label: 'Revenue (₹)',
    color: '#FF9F0A',
    fmt: (n) => `₹${n.toLocaleString('en-IN')}`,
  },
];

export default function AnalyticsChart({ data, height = 220 }: AnalyticsChartProps) {
  const [metric, setMetric] = useState<Metric>('pageviews');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const meta = METRICS.find((m) => m.key === metric)!;

  const { points, max, total } = useMemo(() => {
    const values = data.map((d) => d[metric]);
    const max = Math.max(1, ...values);
    const total = values.reduce((a, b) => a + b, 0);
    return { points: values, max, total };
  }, [data, metric]);

  const width = 800; // viewBox width — scales fluidly
  const padX = 12;
  const padY = 14;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  // Build the area + line path. Use Catmull-Rom to bezier conversion would be
  // smoother, but straight-line is faster and looks crisp at this scale.
  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0;
  const yFor = (v: number) => padY + innerH - (v / max) * innerH;

  const linePath = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${padX + i * stepX} ${yFor(v)}`)
    .join(' ');

  const areaPath = points.length
    ? `${linePath} L ${padX + (points.length - 1) * stepX} ${padY + innerH} L ${padX} ${padY + innerH} Z`
    : '';

  const hoverPoint = hoverIdx !== null ? data[hoverIdx] : null;

  return (
    <div className="glass rounded-lg p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-2xs uppercase tracking-wider text-muted-foreground">
            {meta.label}
          </div>
          <div className="mt-1 text-3xl font-semibold tracking-[-0.02em] tabular-nums text-foreground">
            {meta.fmt(total)}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 rounded-pill border border-overlay/10 bg-overlay/5 p-1">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={[
                'h-7 rounded-pill px-3 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                metric === m.key
                  ? 'bg-foreground text-background shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          onMouseLeave={() => setHoverIdx(null)}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * width;
            const idx = Math.round((x - padX) / Math.max(1, stepX));
            if (idx >= 0 && idx < points.length) setHoverIdx(idx);
          }}
        >
          <defs>
            <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={meta.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={meta.color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={padX}
              x2={width - padX}
              y1={padY + innerH * t}
              y2={padY + innerH * t}
              style={{ stroke: 'rgb(var(--overlay) / 0.06)' }}
              strokeWidth={1}
            />
          ))}

          {areaPath && <path d={areaPath} fill={`url(#grad-${metric})`} />}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={meta.color}
              strokeWidth={1.6}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {hoverIdx !== null && (
            <>
              <line
                x1={padX + hoverIdx * stepX}
                x2={padX + hoverIdx * stepX}
                y1={padY}
                y2={padY + innerH}
                style={{ stroke: 'rgb(var(--overlay) / 0.2)' }}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle
                cx={padX + hoverIdx * stepX}
                cy={yFor(points[hoverIdx]!)}
                r={4}
                fill={meta.color}
                style={{ stroke: 'rgb(var(--background))' }}
                strokeWidth={2}
              />
            </>
          )}
        </svg>

        {hoverPoint && hoverIdx !== null && (
          <div
            className="glass-strong pointer-events-none absolute -translate-x-1/2 rounded-md px-2.5 py-1.5 text-2xs"
            style={{
              left: `${((padX + hoverIdx * stepX) / width) * 100}%`,
              top: 0,
            }}
          >
            <div className="text-muted-foreground">{hoverPoint.date}</div>
            <div className="mt-0.5 font-medium tabular-nums text-foreground">
              {meta.fmt(hoverPoint[metric])}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between text-2xs text-muted-foreground">
        <span>{data[0]?.date || ''}</span>
        <span>{data[data.length - 1]?.date || ''}</span>
      </div>
    </div>
  );
}
