import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { api, apiErrorMessage } from '../utils/api';
import { isAuthenticated, setToken } from '../utils/auth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function AdminLogin() {
  useDocumentTitle('Admin · Softwaresellr');
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (isAuthenticated()) return <Navigate to="/admin" replace />;

  const update = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
    if (serverError) setServerError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    setServerError(null);
    try {
      const { data } = await api.post<{ token: string; email: string }>(
        '/api/admin/login',
        parsed.data,
      );
      setToken(data.token, data.email);
      navigate('/admin', { replace: true });
    } catch (err) {
      setServerError(apiErrorMessage(err, 'Login failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="glass mb-4 flex h-12 w-12 items-center justify-center rounded-pill">
          <ShieldCheck size={20} className="text-foreground" />
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Restricted area. Authorized staff only.</p>
      </div>

      <form onSubmit={submit} className="glass flex flex-col gap-3 rounded-lg p-6">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="username"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          autoFocus
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
        />

        {serverError && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {serverError}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="mt-2">
          <Lock size={13} />
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
