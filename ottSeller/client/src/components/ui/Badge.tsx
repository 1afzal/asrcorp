import { ReactNode } from 'react';

type Variant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'success'
  | 'stock'
  | 'out'
  | 'type'
  | 'warning'
  | 'neutral';

const variants: Record<Variant, string> = {
  default: 'bg-overlay/10 text-foreground border-overlay/10',
  secondary: 'bg-overlay/5 text-foreground border-overlay/10',
  outline: 'bg-transparent text-muted-foreground border-overlay/10',
  destructive: 'bg-destructive/20 text-destructive border-destructive/30',
  success: 'bg-overlay/5 text-foreground border-overlay/10',
  stock: 'bg-overlay/5 text-foreground border-overlay/10',
  out: 'bg-overlay/5 text-muted-foreground border-overlay/10',
  type: 'bg-overlay/5 text-foreground border-overlay/10',
  warning: 'bg-overlay/5 text-foreground border-overlay/10',
  neutral: 'bg-transparent text-muted-foreground border-overlay/10',
};

export function Badge({
  variant = 'outline',
  children,
  className = '',
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const isStock = variant === 'stock';
  const isOut = variant === 'out';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 text-2xs font-medium tracking-tight ${variants[variant]} ${className}`}
    >
      {isStock && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#30D158] shadow-[0_0_8px_rgba(48,209,88,0.6)]" />
      )}
      {isOut && <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />}
      {children}
    </span>
  );
}

export default Badge;
