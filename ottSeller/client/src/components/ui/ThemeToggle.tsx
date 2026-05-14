import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={[
        'group relative flex h-9 w-9 items-center justify-center rounded-pill border border-border bg-overlay/5 text-muted-foreground',
        'transition-all duration-300 ease-apple hover:bg-overlay/10 hover:text-foreground',
        'overflow-hidden',
        className,
      ].join(' ')}
    >
      <Sun
        size={14}
        className={[
          'absolute transition-all duration-300 ease-apple',
          isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0',
        ].join(' ')}
      />
      <Moon
        size={14}
        className={[
          'absolute transition-all duration-300 ease-apple',
          isDark ? '-rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
        ].join(' ')}
      />
    </button>
  );
}
