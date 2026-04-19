import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | ASR Corporation';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-charcoal px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-display text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
        <h2 className="font-display text-3xl text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on solid ground.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
