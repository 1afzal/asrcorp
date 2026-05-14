import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass rounded-lg p-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProductGrid;
