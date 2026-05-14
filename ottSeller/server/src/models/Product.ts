import { Schema, model, models } from 'mongoose';

export interface ProductDoc {
  productKey: string; // legacy id (e.g. '1', 'w1', 'd5') used to keep stable references
  slug: string;
  sku?: string;
  name: string;
  category: string;
  type: string;
  types?: string[];
  validity: string;
  stockStatus: 'in_stock' | 'out_of_stock';
  priceINR: number;
  priceUSD: number;
  warranty: string;
  description: string;
  activationNote: string;
  termsAndConditions?: string[];
  userGuide?: string;
  region?: string;
  promo?: string;
  imageUrl?: string;
  simpleIconSlug?: string;
  brandColor?: string;
  brandInitial?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<ProductDoc>(
  {
    productKey: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    type: { type: String, required: true },
    types: [{ type: String }],
    validity: { type: String, required: true },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock'],
      required: true,
      default: 'in_stock',
    },
    priceINR: { type: Number, required: true },
    priceUSD: { type: Number, required: true },
    warranty: { type: String, required: true },
    description: { type: String, default: '' },
    activationNote: { type: String, default: '' },
    termsAndConditions: [{ type: String }],
    userGuide: { type: String },
    region: { type: String },
    promo: { type: String },
    imageUrl: { type: String },
    simpleIconSlug: { type: String },
    brandColor: { type: String },
    brandInitial: { type: String },
  },
  { timestamps: true },
);

export const Product = models.Product || model<ProductDoc>('Product', ProductSchema);
