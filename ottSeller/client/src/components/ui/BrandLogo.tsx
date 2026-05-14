import type { Product } from '../../types';

// Known brand hex values for products where simple-icons no longer ships the logo.
// When no brand color matches, falls back to monochrome black.
const BRAND_COLORS: { match: RegExp; bg: string; fg?: string }[] = [
  { match: /adobe|acrobat/i, bg: '#DA1F26' },
  { match: /\bcanva\b/i, bg: '#00C4CC' },
  { match: /^png\s*tree|pngtree/i, bg: '#2DBE60' },
  { match: /pikbest/i, bg: '#FFB800', fg: '#0A0A0A' },
  { match: /capcut/i, bg: '#000000' },
  { match: /invideo/i, bg: '#F24452' },
  { match: /microsoft|office\s?365|\bwindows\b|office\s?20|\bproject\b|\bvisio\b|server/i, bg: '#0067B8' },
  { match: /power\s?bi/i, bg: '#F2C811', fg: '#0A0A0A' },
  { match: /autodesk|maya|3ds\s?max/i, bg: '#0696D7' },
  { match: /lumion/i, bg: '#00A6E2' },
  { match: /solidworks/i, bg: '#E02F36' },
  { match: /mathcad|ptc/i, bg: '#6F2C91' },
  { match: /chaos|v-?ray|corona|enscape|vantage/i, bg: '#1A1A1A', fg: '#FFDF00' },
  { match: /nitro\s?pdf/i, bg: '#F37021' },
  { match: /pdf\s?zilla/i, bg: '#1DA1F2' },
  { match: /pinnacle/i, bg: '#2A7A17' },
  { match: /camtasia|techsmith/i, bg: '#6A3BE4' },
  { match: /affinity/i, bg: '#1B72BE' },
  { match: /easeus/i, bg: '#0076D6' },
  { match: /freepik/i, bg: '#1273EB' },
  { match: /flutter/i, bg: '#02569B' },
  { match: /cursor/i, bg: '#0F0F0F' },
  { match: /pabbly/i, bg: '#2E71E5' },
  { match: /bithub/i, bg: '#F7931A' },
  { match: /lucid/i, bg: '#F68C1E' },
  { match: /rezi/i, bg: '#3B82F6' },
  { match: /anyviewer/i, bg: '#0078D4' },
  { match: /beautiful\.?ai|beautiful/i, bg: '#6E3CFF' },
  { match: /speechify/i, bg: '#FF3D1F' },
];

function resolveInitials(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}

function resolveColors(product: Pick<Product, 'name' | 'brandColor'>): { bg: string; fg: string } {
  if (product.brandColor) return { bg: product.brandColor, fg: '#FFFFFF' };
  for (const rule of BRAND_COLORS) {
    if (rule.match.test(product.name)) return { bg: rule.bg, fg: rule.fg || '#FFFFFF' };
  }
  return { bg: '#0A0A0A', fg: '#FAFAFA' };
}

interface BrandLogoProps {
  product: Pick<Product, 'name' | 'brandColor' | 'brandInitial'>;
  size?: number;
  rounded?: number;
  className?: string;
}

export function BrandLogo({ product, size = 40, rounded = 8, className = '' }: BrandLogoProps) {
  const { bg, fg } = resolveColors(product);
  const label = product.brandInitial || resolveInitials(product.name);
  const fontSize = Math.round(size * (label.length === 1 ? 0.48 : 0.38));

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        flexShrink: 0,
        boxShadow:
          'inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.15)',
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`${product.name} logo`}
      >
        <rect x="0" y="0" width={size} height={size} rx={rounded} ry={rounded} fill={bg} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="-apple-system, BlinkMacSystemFont, Inter, system-ui, sans-serif"
          fontWeight="600"
          fontSize={fontSize}
          fill={fg}
          letterSpacing="-0.02em"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

export default BrandLogo;
