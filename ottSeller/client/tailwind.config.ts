import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Channel-format tokens — support opacity modifiers like `bg-foreground/10`.
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--destructive-foreground) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',

        // Theme-flipping monochrome overlay used for ALL hover states, dividers, hairline
        // borders, and any place we used to write `bg-white/X` or `border-white/X`.
        // Resolves to white in dark mode and black in light mode automatically.
        overlay: 'rgb(var(--overlay) / <alpha-value>)',

        // Pre-alpha'd tokens — already include their own opacity, no modifier support.
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        subtle: 'var(--subtle)',
        card: 'var(--card)',

        // Static accents — same in both themes.
        'tint-blue': '#0A84FF',
        'tint-violet': '#BF5AF2',
        'tint-pink': '#FF375F',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px',
        pill: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.35), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        glass:
          '0 1px 0 0 rgba(255, 255, 255, 0.06) inset, 0 0 0 1px rgba(255, 255, 255, 0.04), 0 20px 60px -20px rgba(0, 0, 0, 0.6)',
        floating:
          '0 1px 0 0 rgba(255, 255, 255, 0.1) inset, 0 0 0 1px rgba(255, 255, 255, 0.06), 0 24px 64px -16px rgba(0, 0, 0, 0.7)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
