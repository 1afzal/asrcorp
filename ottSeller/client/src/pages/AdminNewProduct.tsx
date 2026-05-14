import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../components/admin/ProductForm';
import { isAuthenticated } from '../utils/auth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function AdminNewProduct() {
  useDocumentTitle('New product · Softwaresellr Admin');
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <Link
        to="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to products
      </Link>
      <h1 className="mb-6 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
        New product
      </h1>
      <ProductForm />
    </>
  );
}
