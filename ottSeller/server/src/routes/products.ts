import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

router.get('/', async (_req, res) => {
  const products = await Product.find().sort({ category: 1, name: 1 }).lean();
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).lean();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

export default router;
