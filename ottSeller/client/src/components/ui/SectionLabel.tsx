interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  return (
    <div className={`section-kicker flex items-center gap-3 ${className}`}>
      <span className="font-mono text-2xs text-muted-foreground">{number}</span>
      <span className="h-px w-8 bg-overlay/15" />
      <span className="text-2xs font-medium uppercase tracking-wider text-foreground">{label}</span>
    </div>
  );
}

export default SectionLabel;
