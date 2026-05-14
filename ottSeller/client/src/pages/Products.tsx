import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductGrid from '../components/home/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useSeo } from '../hooks/useSeo';
import type { Category } from '../types';

type Filter = Category | 'all';

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'video_media', label: 'Video & Media' },
  { value: 'productivity_dev', label: 'Productivity & Dev' },
  { value: 'windows_office', label: 'Windows & Office' },
  { value: 'cad', label: 'CAD' },
  { value: 'corel', label: 'CorelDraw' },
  { value: 'admin_panel', label: 'Admin Panels' },
  { value: 'utility', label: 'Utilities' },
  { value: 'ai_tool', label: 'AI Tools' },
];

export default function Products() {
  useSeo({
    title: 'All Subscriptions — Softwaresellr',
    description:
      'Browse 120+ genuine software subscriptions: Design, Video & Media, Productivity, Windows & Office, CAD, CorelDraw, Utilities, and AI tools. Activated fast, warranty included.',
    canonical: '/products',
  });
  const [category, setCategory] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const products = useProducts({ category, search });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
          All subscriptions, <span className="text-muted-foreground">one place.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Browse our full catalog of genuine, activated plans.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search
            size={14}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="glass-input h-11 w-full rounded-pill pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
          />
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <div className="glass inline-flex items-center gap-0.5 rounded-pill p-1">
            {TABS.map((t) => {
              const active = category === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setCategory(t.value)}
                  className={[
                    'h-8 whitespace-nowrap rounded-pill px-4 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                    active
                      ? 'bg-foreground text-background shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_2px_6px_rgba(0,0,0,0.4)]'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {products.length} product{products.length === 1 ? '' : 's'}
        </div>
      </div>

      <ProductGrid products={products} emptyMessage="No products match your search." />
    </div>
  );
}
