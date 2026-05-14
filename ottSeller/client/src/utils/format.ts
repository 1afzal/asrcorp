import type { Product } from '../types';

// Single source of truth — used by Footer, Contact, ProductDetail.
// Strip all non-digits for the wa.me URL (it requires bare digits, no +).
export const WHATSAPP_NUMBER_DISPLAY = '+91 7975374979';
export const WHATSAPP_NUMBER_E164 = '917975374979';

export function formatINR(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatUSD(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** Generic WhatsApp link — short message, used by Footer / Contact CTAs. */
export function whatsappUrl(productName?: string): string {
  const message = productName
    ? `Hi Softwaresellr, I'd like to order ${productName}. Please confirm availability.`
    : `Hi Softwaresellr, I have a question about your subscriptions.`;
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}

interface OrderMessageInput {
  product: Pick<Product, 'name' | 'validity' | 'priceINR' | 'priceUSD'>;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

/** Detailed order message — used by the product detail "Order on WhatsApp" CTA. */
export function whatsappOrderUrl({
  product,
  customerName,
  customerEmail,
  customerPhone,
}: OrderMessageInput): string {
  const lines = [
    `Hi Softwaresellr, I'd like to order ${product.name}.`,
    '',
    `Plan: ${product.validity}`,
    `Price: ${formatINR(product.priceINR)}`,
    '',
    'My details:',
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Phone: ${customerPhone}`,
    '',
    'Please confirm availability.',
  ];
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(lines.join('\n'))}`;
}
