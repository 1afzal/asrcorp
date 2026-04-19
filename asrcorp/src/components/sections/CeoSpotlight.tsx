import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CeoSpotlight() {
  return (
    <section className="py-24 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src="/ceo.png"
                alt="Afil Rahman, CEO of ASR Corporation"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm px-4 py-3">
                <span className="font-heading font-bold text-coral text-lg block leading-tight">
                  5+ Years
                </span>
                <span className="text-white text-xs">Leading the Industry</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal direction="right" className="lg:col-span-7 lg:pl-12">
            <div>
              {/* Tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-coral rounded-full" />
                <span className="text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold">
                  LEADERSHIP
                </span>
              </div>

              {/* Name */}
              <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-dark leading-tight">
                Afil Rahman
              </h2>

              {/* Role */}
              <p className="text-muted text-sm uppercase tracking-wider mt-2">
                Founder &amp; CEO, ASR Corporation
              </p>

              {/* Bio */}
              <p className="text-muted leading-relaxed mt-8 font-body">
                With a passion for excellence and an unwavering commitment to quality, Afil Rahman
                founded ASR Corporation with a singular vision — to redefine the construction
                landscape in Mangaluru and coastal Karnataka. Under his leadership, the company has
                grown from a local construction firm to a trusted name in the industry.
              </p>
              <p className="text-muted leading-relaxed mt-4 font-body">
                A graduate in Civil Engineering with years of hands-on experience, Afil combines
                technical expertise with an eye for design and a deep understanding of the region&apos;s
                unique building requirements. His approach prioritizes sustainable construction
                practices, client satisfaction, and architectural innovation.
              </p>

              {/* Pull quote */}
              <div className="border-l-2 border-coral pl-6 mt-8">
                <p className="italic text-dark font-body text-lg leading-relaxed">
                  &ldquo;We don&apos;t just build structures — we build futures.&rdquo;
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8">
                <span className="font-heading font-bold text-dark text-lg block">
                  Afil Rahman
                </span>
                <div className="accent-line mt-2" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
