import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | ASR Corporation';
  }, []);

  return (
    <div className="bg-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="grain" />
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <h1 className="font-heading text-[12rem] md:text-[16rem] font-extrabold gradient-text leading-none">
            404
          </h1>
          <h2 className="font-heading text-2xl text-white tracking-wider mt-4">
            PAGE NOT FOUND
          </h2>
          <p className="text-muted mt-4 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on solid ground.
          </p>
          <Link
            to="/"
            className="magnetic-btn bg-coral text-white mt-10 px-8 py-4 inline-flex"
          >
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
