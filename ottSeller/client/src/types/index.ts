export type StockStatus = 'in_stock' | 'out_of_stock';
export type ProductType =
  | 'EDU'
  | 'Commercial'
  | 'ORG'
  | 'Key'
  | 'Account'
  | 'Non-Commercial'
  | 'Panel';

export type Category =
  | 'design'
  | 'video_media'
  | 'productivity_dev'
  | 'windows_office'
  | 'cad'
  | 'corel'
  | 'admin_panel'
  | 'utility'
  | 'ai_tool';

export interface Product {
  id: string;
  _id?: string;
  name: string;
  category: Category;
  type: ProductType;
  types?: ProductType[];
  validity: string;
  stockStatus: StockStatus;
  priceINR: number;
  priceUSD: number;
  warranty: string;
  description: string;
  activationNote: string;
  termsAndConditions?: string[];
  userGuide?: string;
  region?: string;
  promo?: string;
  slug: string;
  sku?: string;
  imageUrl?: string;
  brandColor?: string;
  brandInitial?: string;
  simpleIconSlug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  product: Product;
  paymentIntentId: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  design: 'Design',
  video_media: 'Video & Media',
  productivity_dev: 'Productivity & Dev',
  windows_office: 'Windows & Office',
  cad: 'CAD',
  corel: 'CorelDraw',
  admin_panel: 'Admin Panels',
  utility: 'Utilities',
  ai_tool: 'AI Tools',
};
