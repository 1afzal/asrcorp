import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-amber text-white hover:bg-brand-amber/85',
  secondary:
    'bg-brand-charcoal text-white hover:bg-brand-surface',
  outline:
    'border-2 border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const MotionLink = motion.create(Link);

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-body font-semibold rounded-md transition-colors duration-300 cursor-pointer';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  } as const;

  if (href) {
    return (
      <MotionLink to={href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
