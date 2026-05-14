import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { MessageCircle, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useSeo } from '../hooks/useSeo';
import { whatsappUrl } from '../utils/format';

const WHATSAPP_URL = whatsappUrl();
const TELEGRAM_URL = 'https://t.me/YOURUSERNAME';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export default function Contact() {
  useSeo({
    title: 'Contact — Softwaresellr',
    description:
      'Get in touch with Softwaresellr over WhatsApp or Telegram for orders, custom plans, or product questions. Fast replies, honest pricing.',
    canonical: '/contact',
  });

  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});

  const update =
    (k: keyof ContactValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    toast.success("Message sent! We'll get back to you shortly.");
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
          Get in <span className="text-muted-foreground">touch.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about a product? Custom plan? We're one message away.
        </p>
      </div>

      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="glass group flex items-center gap-3 rounded-lg p-5 transition-all duration-300 ease-apple hover:bg-overlay/[0.08]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-pill bg-overlay/10 text-foreground transition-colors group-hover:bg-overlay/15">
            <MessageCircle size={16} />
          </div>
          <div>
            <div className="text-sm font-medium tracking-tight text-foreground">
              Chat on WhatsApp
            </div>
            <div className="text-xs text-muted-foreground">Fastest response</div>
          </div>
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="glass group flex items-center gap-3 rounded-lg p-5 transition-all duration-300 ease-apple hover:bg-overlay/[0.08]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-pill bg-overlay/10 text-foreground transition-colors group-hover:bg-overlay/15">
            <Send size={16} />
          </div>
          <div>
            <div className="text-sm font-medium tracking-tight text-foreground">
              Message on Telegram
            </div>
            <div className="text-xs text-muted-foreground">Reply within a few hours</div>
          </div>
        </a>
      </div>

      <form onSubmit={submit} className="glass rounded-lg p-6">
        <h2 className="mb-5 text-base font-semibold tracking-tight text-foreground">
          Send a message
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Name"
            name="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-medium tracking-tight text-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="How can we help?"
            value={values.message}
            onChange={update('message')}
            className={[
              'glass-input w-full rounded-md p-3.5 text-sm text-foreground placeholder:text-muted-foreground',
              'focus:border-overlay/25 focus:bg-overlay/[0.06] focus:outline-none',
              errors.message ? 'border-destructive/50' : '',
            ].join(' ')}
          />
          {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
        </div>

        <div className="mt-5">
          <Button type="submit" size="lg">
            Send message
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Have more questions?{' '}
        <Link to="/" className="text-foreground underline underline-offset-4 hover:no-underline">
          Check our FAQ
        </Link>
      </div>
    </div>
  );
}
