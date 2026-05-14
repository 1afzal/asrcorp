import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { z } from 'zod';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Globe2,
  Info,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useProductBySlug } from '../hooks/useProducts';
import { useSeo } from '../hooks/useSeo';
import { useJsonLd } from '../hooks/useJsonLd';
import { CATEGORY_LABELS } from '../types';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import SimpleIcon from '../components/ui/SimpleIcon';
import { formatINR, formatUSD, whatsappOrderUrl } from '../utils/format';
import { track } from '../utils/track';

const customerSchema = z.object({
  customerName: z.string().min(2, 'Please enter your full name'),
  customerEmail: z.string().email('Enter a valid email address'),
  customerPhone: z.string().min(7, 'Enter a valid phone number'),
});

type CustomerValues = z.infer<typeof customerSchema>;
type CustomerErrors = Partial<Record<keyof CustomerValues, string>>;

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = useProductBySlug(slug);

  useSeo({
    title: product ? `${product.name} — Softwaresellr` : 'Product — Softwaresellr',
    description: product
      ? `${product.name} · ${product.validity} · ${product.warranty} warranty. ${product.description}`
      : 'Softwaresellr product detail',
    image: product?.imageUrl,
    canonical: product ? `/products/${product.slug}` : undefined,
    noindex: !product,
  });

  useJsonLd(
    product
      ? {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: CATEGORY_LABELS[product.category],
          ...(product.imageUrl ? { image: product.imageUrl } : {}),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.priceINR,
            availability:
              product.stockStatus === 'in_stock'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url:
              typeof window !== 'undefined'
                ? `${window.location.origin}/products/${product.slug}`
                : `/products/${product.slug}`,
          },
          brand: { '@type': 'Brand', name: 'Softwaresellr' },
        }
      : null,
  );

  const [values, setValues] = useState<CustomerValues>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [tcOpen, setTcOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const lastTrackedSlug = useRef<string | null>(null);
  useEffect(() => {
    if (!product) return;
    if (lastTrackedSlug.current === product.slug) return;
    lastTrackedSlug.current = product.slug;
    track({
      type: 'product_view',
      productSlug: product.slug,
      productKey: product.id,
      productName: product.name,
      path: `/products/${product.slug}`,
    });
  }, [product]);

  if (!product) return <Navigate to="/404" replace />;

  const outOfStock = product.stockStatus === 'out_of_stock';
  const typeList = product.types && product.types.length > 0 ? product.types : [product.type];

  const orderOnWhatsApp = () => {
    const parsed = customerSchema.safeParse(values);
    if (!parsed.success) {
      const e: CustomerErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof CustomerValues;
        if (!e[k]) e[k] = issue.message;
      }
      setErrors(e);
      return;
    }

    track({
      type: 'checkout_started',
      productSlug: product.slug,
      productKey: product.id,
      productName: product.name,
      amountINR: product.priceINR,
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
      path: `/products/${product.slug}`,
      meta: { source: 'whatsapp' },
    });

    const url = whatsappOrderUrl({
      product,
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const update = (k: keyof CustomerValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-1.5 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to products
      </Link>

      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <SimpleIcon product={product} size={64} rounded={14} />
            <div className="flex flex-wrap gap-1.5">
              {typeList.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
              <Badge variant="outline">{CATEGORY_LABELS[product.category]}</Badge>
              <Badge variant={outOfStock ? 'out' : 'stock'}>
                {outOfStock ? 'Out of stock' : 'In stock'}
              </Badge>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            {product.name}
          </h1>

          <div className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {product.priceINR > 0 ? (
              <>
                <span className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  {formatINR(product.priceINR)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ≈ {formatUSD(product.priceUSD)} USD
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Contact for price</span>
            )}
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="glass rounded-md p-4">
              <div className="text-2xs uppercase tracking-wider text-muted-foreground">
                Validity
              </div>
              <div className="mt-1 text-sm font-medium tracking-tight text-foreground">
                {product.validity}
              </div>
            </div>
            <div className="glass rounded-md p-4">
              <div className="text-2xs uppercase tracking-wider text-muted-foreground">
                Warranty
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium tracking-tight text-foreground">
                <ShieldCheck size={14} /> {product.warranty}
              </div>
            </div>
            {product.region && (
              <div className="glass rounded-md p-4">
                <div className="text-2xs uppercase tracking-wider text-muted-foreground">
                  Region
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-medium tracking-tight text-foreground">
                  <Globe2 size={14} /> {product.region}
                </div>
              </div>
            )}
          </div>

          <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.promo && (
            <div className="glass mb-6 flex items-start gap-3 rounded-md p-5">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-foreground" />
              <div>
                <div className="mb-1 text-sm font-semibold tracking-tight text-foreground">
                  Promo
                </div>
                <p className="text-sm text-muted-foreground">{product.promo}</p>
              </div>
            </div>
          )}

          <div className="glass mb-6 rounded-md p-5">
            <div className="mb-2 flex items-center gap-2">
              <Info size={14} className="text-foreground" />
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Activation instructions
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{product.activationNote}</p>
          </div>

          {product.termsAndConditions && product.termsAndConditions.length > 0 && (
            <div className="glass mb-4 overflow-hidden rounded-md">
              <button
                onClick={() => setTcOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Terms & Conditions
                </span>
                <motion.span
                  animate={{ rotate: tcOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="text-muted-foreground"
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {tcOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <ul className="list-inside list-disc space-y-1.5 px-5 pb-4 text-sm text-muted-foreground">
                      {product.termsAndConditions.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {product.userGuide && (
            <div className="glass mb-4 overflow-hidden rounded-md">
              <button
                onClick={() => setGuideOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
                  <BookOpen size={14} /> User guide
                </span>
                <motion.span
                  animate={{ rotate: guideOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="text-muted-foreground"
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {guideOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <pre className="whitespace-pre-wrap break-words px-5 pb-4 font-sans text-sm leading-relaxed text-muted-foreground">
                      {product.userGuide}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-lg p-6">
            <h2 className="mb-5 text-base font-semibold tracking-tight text-foreground">
              Place your order
            </h2>

            <div className="mb-5 flex flex-col gap-3">
              <Input
                label="Full name"
                name="customerName"
                placeholder="Jane Doe"
                value={values.customerName}
                onChange={update('customerName')}
                error={errors.customerName}
              />
              <Input
                label="Email"
                name="customerEmail"
                type="email"
                placeholder="you@example.com"
                value={values.customerEmail}
                onChange={update('customerEmail')}
                error={errors.customerEmail}
              />
              <Input
                label="Phone"
                name="customerPhone"
                type="tel"
                placeholder="+91 98765 43210"
                value={values.customerPhone}
                onChange={update('customerPhone')}
                error={errors.customerPhone}
              />
            </div>

            <Button
              onClick={orderOnWhatsApp}
              fullWidth
              size="lg"
              disabled={outOfStock || product.priceINR <= 0}
            >
              <MessageCircle size={14} />
              {outOfStock
                ? 'Unavailable'
                : product.priceINR <= 0
                  ? 'Contact on WhatsApp'
                  : 'Order on WhatsApp'}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your order details open in WhatsApp — just hit send to confirm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
