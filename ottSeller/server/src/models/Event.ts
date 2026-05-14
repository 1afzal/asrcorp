import { Schema, model, models } from 'mongoose';

export type EventType =
  | 'pageview'
  | 'product_view'
  | 'checkout_started'
  | 'purchase_succeeded'
  | 'purchase_failed';

export interface EventDoc {
  type: EventType;
  path?: string;
  referrer?: string;
  productSlug?: string;
  productKey?: string;
  productName?: string;
  amountINR?: number;
  paymentIntentId?: string;
  sessionId?: string;
  userAgent?: string;
  meta?: Record<string, unknown>;
  createdAt?: Date;
}

const EventSchema = new Schema<EventDoc>(
  {
    type: {
      type: String,
      enum: [
        'pageview',
        'product_view',
        'checkout_started',
        'purchase_succeeded',
        'purchase_failed',
      ],
      required: true,
      index: true,
    },
    path: { type: String, index: true },
    referrer: { type: String },
    productSlug: { type: String, index: true },
    productKey: { type: String },
    productName: { type: String },
    amountINR: { type: Number },
    paymentIntentId: { type: String },
    sessionId: { type: String, index: true },
    userAgent: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

EventSchema.index({ createdAt: -1 });
EventSchema.index({ type: 1, createdAt: -1 });

export const Event = models.Event || model<EventDoc>('Event', EventSchema);
