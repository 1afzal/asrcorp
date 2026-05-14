import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import StatsStrip from '../components/home/StatsStrip';
import Marquee from '../components/home/Marquee';
import HowItWorks from '../components/home/HowItWorks';
import FAQ from '../components/home/FAQ';
import ProductGrid from '../components/home/ProductGrid';
import SectionLabel from '../components/ui/SectionLabel';
import { getAllProducts } from '../hooks/useProducts';
import { useSeo } from '../hooks/useSeo';

const FEATURED_SLUGS = [
  'adobe-creative-cloud',
  'canva-pro',
  'capcut-pro',
  'microsoft-office-365',
  'grammarly-premium',
  'jetbrains',
];

export default function Home() {
  useSeo({
    title: 'Softwaresellr — Premium Software. Honest Prices.',
    description:
      'Genuine software subscriptions activated and delivered fast. Adobe, Canva, JetBrains, Notion, Figma, and 120+ more — order over WhatsApp.',
    canonical: '/',
  });
  const all = getAllProducts();
  const featured = FEATURED_SLUGS.map((s) => all.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p && p.stockStatus === 'in_stock',
  );

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <StatsStrip />
      </section>

      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionLabel number="01" label="Featured" className="mb-5" />
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
            Handpicked essentials, <span className="text-muted-foreground">in stock right now.</span>
          </h2>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-medium tracking-tight text-foreground hover:underline sm:inline-flex"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="glass inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium tracking-tight text-foreground"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionLabel number="02" label="How it works" className="mb-5" />
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionLabel number="03" label="Questions" className="mb-5" />
        <FAQ />
      </section>
    </>
  );
}
