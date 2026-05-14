import SimpleIcon from '../ui/SimpleIcon';
import { getAllProducts } from '../../hooks/useProducts';

// Hand-picked roster of brands from the catalog — prioritizing products with a
// real Simple Icons match so the strip renders authentic brand marks rather
// than monogram fallbacks.
const MARQUEE_SLUGS = [
  'figma-professional',
  'adobe-creative-cloud',
  'canva-pro',
  'jetbrains',
  'grammarly-premium',
  'notion-plus',
  'capcut-pro',
  'filmora-15-pro',
  'microsoft-office-365',
  'autodesk-all-apps-1yr',
  'sketchup-pro',
  'archicad-29',
  'vectorworks-design-suite',
  'chaos-corona-solo',
  'perplexity-ai',
  'cursor-ai',
  'webflow',
  'coursera-plus',
  'coreldraw-graphics-suite-x7',
  'picsart',
  'envato-elements',
  'freepik-premium',
];

export function Marquee() {
  const all = getAllProducts();
  const products = MARQUEE_SLUGS.map((s) => all.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  );

  // Duplicate the list so the animation can loop seamlessly at -50% translate.
  const track = [...products, ...products];

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center text-xs uppercase tracking-wider text-muted-foreground">
          Trusted subscriptions from the brands you already use
        </div>
      </div>

      <div className="marquee-mask relative overflow-hidden">
        <div className="marquee-track" style={{ ['--marquee-duration' as string]: '50s' }}>
          {track.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="glass flex shrink-0 items-center gap-2.5 rounded-pill px-4 py-2 mx-2"
              aria-hidden={i >= products.length || undefined}
            >
              <SimpleIcon product={p} size={24} rounded={6} />
              <span className="whitespace-nowrap text-sm tracking-tight text-foreground">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
