import {
  siFigma,
  siPicsart,
  siWondersharefilmora,
  siGrammarly,
  siJetbrains,
  siAvira,
  siPerplexity,
  siFreepik,
  siEnvato,
  siEdx,
  siFlutter,
  siNotion,
  siCursor,
  siWebflow,
  siDatacamp,
  siLucid,
  siCoursera,
  siWondershare,
  siAutodesk,
  siSketchup,
  siVectorworks,
  siArchicad,
  siCoronarenderer,
  siCoreldraw,
  siAvast,
  siMcafee,
  siCcleaner,
} from 'simple-icons';
import type { Product } from '../../types';
import BrandLogo from './BrandLogo';

interface IconData {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

const ICONS: Record<string, IconData> = {
  figma: siFigma,
  picsart: siPicsart,
  wondersharefilmora: siWondersharefilmora,
  grammarly: siGrammarly,
  jetbrains: siJetbrains,
  avira: siAvira,
  perplexity: siPerplexity,
  freepik: siFreepik,
  envato: siEnvato,
  edx: siEdx,
  flutter: siFlutter,
  notion: siNotion,
  cursor: siCursor,
  webflow: siWebflow,
  datacamp: siDatacamp,
  lucid: siLucid,
  coursera: siCoursera,
  wondershare: siWondershare,
  autodesk: siAutodesk,
  sketchup: siSketchup,
  vectorworks: siVectorworks,
  archicad: siArchicad,
  coronarenderer: siCoronarenderer,
  coreldraw: siCoreldraw,
  avast: siAvast,
  mcafee: siMcafee,
  ccleaner: siCcleaner,
};

interface SimpleIconProps {
  product: Pick<Product, 'name' | 'simpleIconSlug' | 'brandColor' | 'brandInitial' | 'imageUrl'>;
  size?: number;
  rounded?: number;
  className?: string;
}

export function SimpleIcon({ product, size = 40, rounded = 10, className = '' }: SimpleIconProps) {
  if (product.imageUrl) {
    return (
      <img
        src={product.imageUrl}
        alt={`${product.name} logo`}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: rounded,
          objectFit: 'cover',
          flexShrink: 0,
          background: '#FFFFFF',
          boxShadow:
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)',
        }}
      />
    );
  }

  const icon = product.simpleIconSlug ? ICONS[product.simpleIconSlug] : undefined;

  if (!icon) {
    return <BrandLogo product={product} size={size} rounded={rounded} className={className} />;
  }

  const pad = size * 0.2;
  const inner = size - pad * 2;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: '#FFFFFF',
        borderRadius: rounded,
        flexShrink: 0,
        boxShadow:
          'inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)',
      }}
      role="img"
      aria-label={`${product.name} logo`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={inner}
        height={inner}
        fill={`#${icon.hex}`}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
    </div>
  );
}

export default SimpleIcon;
