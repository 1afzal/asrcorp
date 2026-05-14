import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-xs font-medium tracking-tight text-foreground"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={[
            'glass-input h-10 w-full rounded-md px-3.5 text-sm text-foreground placeholder:text-muted-foreground',
            'transition-all duration-200 ease-apple',
            'focus:outline-none focus:border-overlay/25 focus:bg-overlay/[0.06]',
            error ? 'border-destructive/50' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
