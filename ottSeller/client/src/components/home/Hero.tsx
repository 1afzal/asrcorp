import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import SimpleIcon from '../ui/SimpleIcon';
import { getAllProducts } from '../../hooks/useProducts';

// Every slug below has a real Simple Icons logo — keeps the floating cluster
// fully iconic instead of falling back to monogram tiles.
const CLUSTER_SLUGS = [
  'figma-professional',
  'notion-plus',
  'jetbrains',
  'grammarly-premium',
  'cursor-ai',
  'perplexity-ai',
  'picsart',
  'webflow',
];

interface ChipProps {
  productSlug: string;
  className: string;
  animation: string;
  size?: number;
}

function Chip({ productSlug, className, animation, size = 52 }: ChipProps) {
  const product = getAllProducts().find((p) => p.slug === productSlug);
  if (!product) return null;
  return (
    <div className={`absolute ${className} ${animation}`}>
      <div className="glass rounded-lg p-2.5">
        <SimpleIcon product={product} size={size} rounded={10} />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-28 lg:grid-cols-[1.2fr_1fr]">
        <div className="text-center lg:text-left">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-xs tracking-tight text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#30D158] shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
            Premium software, honest prices
          </div>

          <h1 className="text-balance text-[clamp(2.25rem,9vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-6xl md:text-[4.25rem]">
            <span className="block">Genuine subscriptions</span>
            <span className="block text-muted-foreground">for the tools you love.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-base tracking-tight text-muted-foreground sm:text-lg lg:mx-0">
            Activated and delivered fast. Warranty included. Order over WhatsApp — credentials
            land in your inbox within 30 minutes.
          </p>

          <div className="mt-9 flex flex-col items-center gap-2 sm:flex-row lg:items-start lg:justify-start">
            <Link to="/products">
              <Button size="lg">
                Browse products <ArrowRight size={14} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="glass">
                Contact us
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground lg:justify-start">
            <kbd className="glass inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-2xs text-foreground/80">
              ⌘ K
            </kbd>
            <span>to search the catalog</span>
          </div>
        </div>

        {/* Floating logo cluster */}
        <div className="relative hidden h-[460px] lg:block">
          <Chip
            productSlug={CLUSTER_SLUGS[0]!}
            className="left-[8%] top-[10%]"
            animation="float-slow"
          />
          <Chip
            productSlug={CLUSTER_SLUGS[1]!}
            className="left-[38%] top-[2%]"
            animation="float-med"
            size={56}
          />
          <Chip
            productSlug={CLUSTER_SLUGS[2]!}
            className="right-[2%] top-[14%]"
            animation="float-fast"
          />
          <Chip
            productSlug={CLUSTER_SLUGS[3]!}
            className="left-[2%] top-[46%]"
            animation="float-med"
          />
          <Chip
            productSlug={CLUSTER_SLUGS[4]!}
            className="left-[36%] top-[42%]"
            animation="float-fast"
            size={56}
          />
          <Chip
            productSlug={CLUSTER_SLUGS[5]!}
            className="right-[6%] top-[50%]"
            animation="float-slow"
          />
          <Chip
            productSlug={CLUSTER_SLUGS[6]!}
            className="left-[18%] bottom-[2%]"
            animation="float-slow"
          />
          <Chip
            productSlug={CLUSTER_SLUGS[7]!}
            className="right-[20%] bottom-[8%]"
            animation="float-med"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
