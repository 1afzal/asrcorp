import { Product, ProductDoc } from './models/Product';
import seedData from './seed-data.json';

interface SeedProduct extends Omit<ProductDoc, 'productKey'> {
  id: string;
}

/**
 * On first boot, populate MongoDB from the bundled seed data so the public
 * store still has products before any admin edits. Re-running is a no-op when
 * the collection already has rows — this keeps the seed safe in production.
 */
export async function seedProductsIfEmpty(): Promise<void> {
  const count = await Product.estimatedDocumentCount();
  if (count > 0) return;

  const docs = (seedData as SeedProduct[]).map((p) => ({
    productKey: p.id,
    slug: p.slug,
    sku: undefined,
    name: p.name,
    category: p.category,
    type: p.type,
    types: p.types,
    validity: p.validity,
    stockStatus: p.stockStatus,
    priceINR: p.priceINR,
    priceUSD: p.priceUSD,
    warranty: p.warranty,
    description: p.description,
    activationNote: p.activationNote,
    termsAndConditions: p.termsAndConditions,
    userGuide: p.userGuide,
    region: p.region,
    promo: p.promo,
    imageUrl: p.imageUrl,
    simpleIconSlug: p.simpleIconSlug,
    brandColor: p.brandColor,
    brandInitial: p.brandInitial,
  }));

  await Product.insertMany(docs);
  console.log(`[Softwaresellr] seeded ${docs.length} products into MongoDB`);
}
