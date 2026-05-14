import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../components/admin/ProductForm';
import { api, apiErrorMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import type { Product } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function AdminEditProduct() {
  useDocumentTitle('Edit product · Softwaresellr Admin');
  const { id = '' } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get<Product>(`/api/admin/products/${id}`)
      .then((r) => {
        if (!cancelled) setProduct(r.data);
      })
      .catch((err) => {
        if (!cancelled) setError(apiErrorMessage(err, 'Failed to load product'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Link
        to="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to products
      </Link>
      <h1 className="mb-6 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
        Edit product
      </h1>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <div className="glass rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          {error}
        </div>
      )}
      {!loading && !error && product && <ProductForm product={product} />}
    </>
  );
}
