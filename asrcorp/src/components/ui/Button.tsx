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
  primary: 'bg-coral text-white magnetic-btn',
  secondary: 'bg-dark text-white magnetic-btn',
  outline:
    'border border-white/30 text-white hover:border-coral hover:text-coral',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-10 py-4.5 text-sm',
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
    'inline-flex items-center justify-center font-body font-semibold uppercase tracking-wider rounded-none cursor-pointer transition-all duration-300';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  } as const;

  if (href) {
    return (
      <MotionLink to={href} className={classes} {...motionProps}>
        <span className="relative z-10">{children}</span>
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
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
