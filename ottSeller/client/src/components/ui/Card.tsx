import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  dim?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, dim = false, className = '', children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[
        'glass rounded-lg p-6 transition-all duration-300 ease-apple',
        hoverable ? 'hover:bg-overlay/[0.07]' : '',
        dim ? 'opacity-50' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

export default Card;
