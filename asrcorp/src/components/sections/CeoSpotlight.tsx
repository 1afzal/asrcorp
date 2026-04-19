import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CeoSpotlight() {
  return (
    <section className="py-24 px-6 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Afil Rahman, CEO of ASR Corporation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-amber/30 rounded-sm -z-10 hidden lg:block" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <div className="accent-line mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mb-2">
                Meet Our CEO
              </h2>
              <p className="font-display text-2xl text-brand-amber italic mb-8">
                Afil Rahman
              </p>
              <p className="text-brand-stone leading-relaxed mb-6">
                With a passion for excellence and an unwavering commitment to quality, Afil Rahman
                founded ASR Corporation with a singular vision — to redefine the construction
                landscape in Mangaluru and coastal Karnataka. Under his leadership, the company has
                grown from a local construction firm to a trusted name in the industry.
              </p>
              <p className="text-brand-stone leading-relaxed mb-8">
                A graduate in Civil Engineering with years of hands-on experience, Afil combines
                technical expertise with an eye for design and a deep understanding of the region&apos;s
                unique building requirements. His approach prioritizes sustainable construction
                practices, client satisfaction, and architectural innovation.
              </p>
              <div className="font-display text-3xl italic text-brand-charcoal">
                Afil Rahman
                <div className="w-32 h-px bg-brand-charcoal mt-2" />
                <span className="text-sm not-italic tracking-[0.2em] uppercase text-brand-stone block mt-2">
                  Founder &amp; CEO
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
