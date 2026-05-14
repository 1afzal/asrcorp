import { Schema, model, models } from 'mongoose';

export type OrderStatus = 'pending' | 'contacted' | 'fulfilled' | 'cancelled';

export interface OrderDoc {
  status: OrderStatus;
  productSlug?: string;
  productKey?: string;
  productName?: string;
  amountINR?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  source?: string;
  sessionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<OrderDoc>(
  {
    status: {
      type: String,
      enum: ['pending', 'contacted', 'fulfilled', 'cancelled'],
      default: 'pending',
      required: true,
      index: true,
    },
    productSlug: { type: String, index: true },
    productKey: { type: String },
    productName: { type: String },
    amountINR: { type: Number },
    customerName: { type: String },
    customerEmail: { type: String, index: true },
    customerPhone: { type: String },
    notes: { type: String },
    source: { type: String, default: 'whatsapp' },
    sessionId: { type: String },
  },
  { timestamps: true },
);

OrderSchema.index({ createdAt: -1 });

export const Order = models.Order || model<OrderDoc>('Order', OrderSchema);
