import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

const STATS: Stat[] = [
  { label: 'Products', value: 126 },
  { label: 'Categories', value: 9 },
  { label: 'Avg. delivery', value: 15, suffix: ' min' },
  { label: 'Starting at', value: 50, prefix: '₹' },
];

function Counter({
  target,
  prefix = '',
  suffix = '',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1100;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="glass grid grid-cols-2 divide-x divide-overlay/5 rounded-xl sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={[
              'px-6 py-8 sm:px-8',
              i >= 2 ? 'border-t border-overlay/5 sm:border-t-0' : '',
            ].join(' ')}
          >
            <div className="text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-5xl">
              <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsStrip;
