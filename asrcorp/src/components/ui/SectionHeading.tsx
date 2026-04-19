interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <div className="accent-line mb-4" />
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-brand-charcoal'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            light ? 'text-brand-warm-white/80' : 'text-brand-stone'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
