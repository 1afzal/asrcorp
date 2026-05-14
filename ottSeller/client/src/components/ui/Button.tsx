import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'glass';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill text-sm font-medium tracking-tight transition-all duration-300 ease-apple disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-overlay/95 shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)]',
  secondary: 'bg-overlay/10 text-foreground hover:bg-overlay/15 border border-overlay/10',
  outline: 'border border-overlay/15 text-foreground hover:bg-overlay/5',
  ghost: 'text-foreground hover:bg-overlay/5',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  glass:
    'glass text-foreground hover:bg-overlay/10',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3.5',
  md: 'h-10 px-5',
  lg: 'h-12 px-6 text-[15px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', ...rest }, ref) => (
    <button
      ref={ref}
      className={[
        base,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    />
  ),
);
Button.displayName = 'Button';

export default Button;
