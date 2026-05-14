import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Save, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SimpleIcon from '../ui/SimpleIcon';
import { api, apiErrorMessage } from '../../utils/api';
import { refreshProducts } from '../../hooks/useProducts';
import type { Category, Product, ProductType, StockStatus } from '../../types';
import { CATEGORY_LABELS } from '../../types';

const PRODUCT_TYPES: ProductType[] = [
  'EDU',
  'Commercial',
  'ORG',
  'Key',
  'Account',
  'Non-Commercial',
  'Panel',
];

const baseSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, digits and dashes only'),
  sku: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(1, 'Type is required'),
  validity: z.string().min(1, 'Validity is required'),
  warranty: z.string().min(1, 'Warranty is required'),
  region: z.string().optional(),
  priceINR: z.coerce.number().nonnegative('Must be ≥ 0'),
  priceUSD: z.coerce.number().nonnegative('Must be ≥ 0'),
  stockStatus: z.enum(['in_stock', 'out_of_stock']),
  description: z.string().optional(),
  activationNote: z.string().optional(),
  promo: z.string().optional(),
  userGuide: z.string().optional(),
  termsAndConditions: z.string().optional(),
  imageUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  simpleIconSlug: z.string().optional(),
});

type FormState = {
  slug: string;
  sku: string;
  name: string;
  category: Category | '';
  type: ProductType | '';
  validity: string;
  warranty: string;
  region: string;
  priceINR: string;
  priceUSD: string;
  stockStatus: StockStatus;
  description: string;
  activationNote: string;
  promo: string;
  userGuide: string;
  termsAndConditions: string;
  imageUrl: string;
  simpleIconSlug: string;
};

const EMPTY: FormState = {
  slug: '',
  sku: '',
  name: '',
  category: '',
  type: '',
  validity: '',
  warranty: '',
  region: 'Global',
  priceINR: '0',
  priceUSD: '0',
  stockStatus: 'in_stock',
  description: '',
  activationNote: '',
  promo: '',
  userGuide: '',
  termsAndConditions: '',
  imageUrl: '',
  simpleIconSlug: '',
};

function fromProduct(p: Product): FormState {
  return {
    slug: p.slug,
    sku: p.sku || '',
    name: p.name,
    category: p.category,
    type: p.type,
    validity: p.validity,
    warranty: p.warranty,
    region: p.region || '',
    priceINR: String(p.priceINR ?? 0),
    priceUSD: String(p.priceUSD ?? 0),
    stockStatus: p.stockStatus,
    description: p.description || '',
    activationNote: p.activationNote || '',
    promo: p.promo || '',
    userGuide: p.userGuide || '',
    termsAndConditions: (p.termsAndConditions || []).join('\n'),
    imageUrl: p.imageUrl || '',
    simpleIconSlug: p.simpleIconSlug || '',
  };
}

interface ProductFormProps {
  product?: Product;
  onDeleted?: () => void;
}

export default function ProductForm({ product, onDeleted }: ProductFormProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormState>(product ? fromProduct(product) : EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (product) setValues(fromProduct(product));
  }, [product]);

  const update =
    <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = baseSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const tcLines = values.termsAndConditions
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const payload = {
      slug: parsed.data.slug,
      sku: values.sku || undefined,
      name: parsed.data.name,
      category: parsed.data.category,
      type: parsed.data.type,
      validity: parsed.data.validity,
      warranty: parsed.data.warranty,
      region: values.region || undefined,
      priceINR: parsed.data.priceINR,
      priceUSD: parsed.data.priceUSD,
      stockStatus: parsed.data.stockStatus,
      description: values.description || '',
      activationNote: values.activationNote || '',
      promo: values.promo || undefined,
      userGuide: values.userGuide || undefined,
      termsAndConditions: tcLines.length ? tcLines : undefined,
      imageUrl: values.imageUrl || undefined,
      simpleIconSlug: values.simpleIconSlug || undefined,
    };

    setSubmitting(true);
    try {
      if (product?._id) {
        await api.put(`/api/admin/products/${product._id}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/api/admin/products', payload);
        toast.success('Product created');
      }
      await refreshProducts();
      navigate('/admin');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Save failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    if (!product?._id) return;
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await api.delete(`/api/admin/products/${product._id}`);
      toast.success('Product deleted');
      await refreshProducts();
      onDeleted?.();
      navigate('/admin');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    } finally {
      setDeleting(false);
    }
  };

  const previewProduct = {
    name: values.name || 'Product preview',
    imageUrl: values.imageUrl || undefined,
    simpleIconSlug: values.simpleIconSlug || undefined,
    brandColor: undefined,
    brandInitial: undefined,
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="glass rounded-lg p-6">
        <div className="mb-5 flex items-center gap-4">
          <SimpleIcon product={previewProduct} size={56} rounded={12} />
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Logo preview</div>
            <p className="mt-0.5 max-w-md text-xs text-muted-foreground">
              Set Image URL for a custom logo, or set a Simple Icon slug (e.g. <code>figma</code>) for a brand mark.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Image URL"
            name="imageUrl"
            placeholder="https://example.com/logo.png"
            value={values.imageUrl}
            onChange={update('imageUrl')}
            error={errors.imageUrl}
          />
          <Input
            label="Simple Icon slug"
            name="simpleIconSlug"
            placeholder="figma, notion, jetbrains, …"
            value={values.simpleIconSlug}
            onChange={update('simpleIconSlug')}
            error={errors.simpleIconSlug}
          />
        </div>
      </div>

      <div className="glass rounded-lg p-6">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">Identity</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Name"
            name="name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
          />
          <Input
            label="Slug"
            name="slug"
            value={values.slug}
            onChange={update('slug')}
            error={errors.slug}
          />
          <Input
            label="SKU (optional)"
            name="sku"
            value={values.sku}
            onChange={update('sku')}
            error={errors.sku}
          />
          <SelectField
            label="Category"
            name="category"
            value={values.category}
            onChange={update('category')}
            error={errors.category}
          >
            <option value="" disabled>
              Select…
            </option>
            {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Type"
            name="type"
            value={values.type}
            onChange={update('type')}
            error={errors.type}
          >
            <option value="" disabled>
              Select…
            </option>
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectField>
          <Input
            label="Region"
            name="region"
            value={values.region}
            onChange={update('region')}
            error={errors.region}
          />
        </div>
      </div>

      <div className="glass rounded-lg p-6">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">Commerce</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            label="Price (INR)"
            name="priceINR"
            type="number"
            min="0"
            value={values.priceINR}
            onChange={update('priceINR')}
            error={errors.priceINR}
          />
          <Input
            label="Price (USD)"
            name="priceUSD"
            type="number"
            min="0"
            step="0.01"
            value={values.priceUSD}
            onChange={update('priceUSD')}
            error={errors.priceUSD}
          />
          <SelectField
            label="Stock"
            name="stockStatus"
            value={values.stockStatus}
            onChange={update('stockStatus')}
            error={errors.stockStatus}
          >
            <option value="in_stock">In stock</option>
            <option value="out_of_stock">Out of stock</option>
          </SelectField>
          <Input
            label="Validity"
            name="validity"
            placeholder="1 Year, Lifetime, …"
            value={values.validity}
            onChange={update('validity')}
            error={errors.validity}
          />
          <Input
            label="Warranty"
            name="warranty"
            placeholder="6 Months, 1 Year, …"
            value={values.warranty}
            onChange={update('warranty')}
            error={errors.warranty}
          />
          <Input
            label="Promo (optional)"
            name="promo"
            value={values.promo}
            onChange={update('promo')}
            error={errors.promo}
          />
        </div>
      </div>

      <div className="glass rounded-lg p-6">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">Content</h3>
        <div className="flex flex-col gap-3">
          <TextArea
            label="Description"
            name="description"
            rows={3}
            value={values.description}
            onChange={update('description')}
          />
          <TextArea
            label="Activation note"
            name="activationNote"
            rows={3}
            value={values.activationNote}
            onChange={update('activationNote')}
          />
          <TextArea
            label="Terms & Conditions (one per line)"
            name="termsAndConditions"
            rows={4}
            value={values.termsAndConditions}
            onChange={update('termsAndConditions')}
          />
          <TextArea
            label="User guide"
            name="userGuide"
            rows={5}
            value={values.userGuide}
            onChange={update('userGuide')}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        {product?._id ? (
          <Button
            type="button"
            variant="outline"
            onClick={remove}
            disabled={deleting || submitting}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={14} />
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        ) : (
          <span />
        )}

        <div className="flex gap-2">
          <Button type="button" variant="glass" onClick={() => navigate('/admin')}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting || deleting}>
            <Save size={14} />
            {submitting ? 'Saving…' : product ? 'Save changes' : 'Create product'}
          </Button>
        </div>
      </div>
    </form>
  );
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  children: React.ReactNode;
}

function SelectField({ label, name, value, onChange, error, children }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-medium tracking-tight text-foreground">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={[
          'glass-input h-10 w-full rounded-md px-3 text-sm text-foreground',
          'focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none',
          error ? 'border-destructive/50' : '',
        ].join(' ')}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface TextAreaProps {
  label: string;
  name: string;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label, name, rows, value, onChange }: TextAreaProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-medium tracking-tight text-foreground">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className="glass-input w-full rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none"
      />
    </div>
  );
}
