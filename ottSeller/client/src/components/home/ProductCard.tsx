import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import Badge from '../ui/Badge';
import SimpleIcon from '../ui/SimpleIcon';
import { formatINR, formatUSD } from '../../utils/format';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const outOfStock = product.stockStatus === 'out_of_stock';
  const typeList = product.types && product.types.length > 0 ? product.types : [product.type];

  const content = (
    <div
      className={[
        'group glass relative flex h-full flex-col rounded-lg p-6 transition-all duration-300 ease-apple',
        outOfStock ? 'opacity-50' : 'hover:bg-overlay/[0.07] hover:-translate-y-0.5',
      ].join(' ')}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="transition-transform duration-300 ease-apple group-hover:scale-[1.03]">
          <SimpleIcon product={product} size={44} rounded={10} />
        </div>
        <Badge variant={outOfStock ? 'out' : 'stock'}>
          {outOfStock ? 'Out of stock' : 'In stock'}
        </Badge>
      </div>

      <h3 className="mb-1 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
        {product.name}
      </h3>
      <p className="mb-3 text-xs tracking-tight text-muted-foreground">
        {product.validity} · {product.warranty} warranty
      </p>

      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {typeList.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
        <Badge variant="outline">{CATEGORY_LABELS[product.category]}</Badge>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-overlay/5 pt-4">
        <div>
          {product.priceINR > 0 ? (
            <>
              <div className="text-lg font-semibold tracking-tight text-foreground">
                {formatINR(product.priceINR)}
              </div>
              <div className="text-xs text-muted-foreground">
                ≈ {formatUSD(product.priceUSD)}
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Contact for price</div>
          )}
        </div>

        {outOfStock ? (
          <span className="inline-flex h-8 items-center rounded-pill border border-overlay/10 px-3 text-xs font-medium text-muted-foreground">
            Unavailable
          </span>
        ) : (
          <span className="inline-flex h-9 items-center gap-1.5 rounded-pill bg-foreground px-4 text-xs font-medium text-background shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_4px_12px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-apple group-hover:translate-x-0.5">
            View <ArrowUpRight size={12} />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.2), ease: [0.23, 1, 0.32, 1] }}
    >
      {outOfStock ? (
        content
      ) : (
        <Link to={`/products/${product.slug}`} className="block h-full">
          {content}
        </Link>
      )}
    </motion.div>
  );
}

export default ProductCard;
