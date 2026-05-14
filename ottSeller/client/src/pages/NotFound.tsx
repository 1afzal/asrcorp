import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo({
    title: 'Page Not Found — Softwaresellr',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  });

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="text-8xl font-semibold tracking-[-0.05em] text-foreground">404</div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Back to home</Button>
      </Link>
    </div>
  );
}
