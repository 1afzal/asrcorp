interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  tag?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  tag,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {tag && (
        <div className="flex items-center mb-4 gap-0 justify-start" style={centered ? { justifyContent: 'center' } : undefined}>
          <span className="inline-block w-2 h-2 bg-coral rounded-full mr-2" />
          <span className="text-coral text-xs tracking-[0.2em] font-body font-semibold uppercase">
            {tag}
          </span>
        </div>
      )}

      <h2
        className={`font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`max-w-2xl font-body text-lg mt-6 leading-relaxed ${
            light ? 'text-muted-light' : 'text-muted'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
