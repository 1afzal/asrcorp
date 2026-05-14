import { useEffect, useMemo, useState } from 'react';
import staticProducts from '../data/products';
import type { Category, Product } from '../types';
import { api } from '../utils/api';

type CategoryFilter = Category | 'all';

interface UseProductsOptions {
  category?: CategoryFilter;
  search?: string;
}

// Module-level cache so multiple components share one fetch round-trip and
// page navigations stay instant after the first server response. Public API
// preserves the old sync helpers so existing components don't have to change.
let cache: Product[] | null = null;
let pending: Promise<Product[]> | null = null;
const subscribers = new Set<(p: Product[]) => void>();

function publish(products: Product[]): void {
  cache = products;
  for (const s of subscribers) s(products);
}

async function fetchFromServer(): Promise<Product[]> {
  if (pending) return pending;
  pending = api
    .get<Product[]>('/api/products')
    .then((r) => {
      const fromServer = r.data.map((p) => ({ ...p, id: p._id || p.id })) as Product[];
      publish(fromServer);
      return fromServer;
    })
    .catch(() => {
      // Only fall back to the static catalog on the very first load when we
      // have nothing else to show. Once real data has been published, keep it
      // — otherwise a transient error would wipe fresh admin edits with the
      // bundled seed and make changes look like they didn't persist.
      if (cache === null) publish(staticProducts);
      return cache ?? staticProducts;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}

export function refreshProducts(): Promise<Product[]> {
  cache = null;
  pending = null;
  return fetchFromServer();
}

export function useAllProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(cache ?? staticProducts);

  useEffect(() => {
    subscribers.add(setProducts);
    // If the cache was repopulated before this effect ran (e.g. by another
    // mounted component finishing its fetch), pull the latest value in so we
    // don't stay stuck on the initial staticProducts snapshot.
    if (cache && cache !== products) setProducts(cache);
    if (!cache) fetchFromServer();
    return () => {
      subscribers.delete(setProducts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return products;
}

export function useProductBySlug(slug: string): Product | undefined {
  const all = useAllProducts();
  return useMemo(() => all.find((p) => p.slug === slug), [all, slug]);
}

export function useProducts(options: UseProductsOptions = {}): Product[] {
  const all = useAllProducts();
  const { category = 'all', search = '' } = options;

  return useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = q === '' || p.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [all, category, search]);
}

export function getProductBySlug(slug: string): Product | undefined {
  return (cache ?? staticProducts).find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return cache ?? staticProducts;
}
