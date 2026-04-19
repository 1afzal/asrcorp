import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/', num: '01' },
  { label: 'About', path: '/about', num: '02' },
  { label: 'Services', path: '/services', num: '03' },
  { label: 'Projects', path: '/projects', num: '04' },
  { label: 'Contact', path: '/contact', num: '05' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-dark/90 backdrop-blur-md border-b border-border-dark'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-2xl font-extrabold tracking-tight">
              <span className="text-coral">A</span>
              <span className="text-white">SR</span>
            </span>
          </Link>

          {/* ── Desktop nav links (RIGHT aligned) ── */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`relative font-body text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                    isActive(path)
                      ? 'text-coral'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive(path) && (
                    <span className="flex justify-center mt-1">
                      <span className="block w-1 h-1 bg-coral rounded-full" />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 text-white md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={26} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-dark md:hidden"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 z-50 text-white"
            >
              <X size={28} />
            </button>

            {/* Navigation links */}
            <nav className="flex flex-1 flex-col justify-center px-10">
              {navLinks.map(({ label, path, num }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-6"
                >
                  <Link
                    to={path}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-body text-sm text-coral">
                      {num}
                    </span>
                    <span
                      className={`font-heading text-5xl md:text-7xl font-extrabold transition-colors duration-200 ${
                        isActive(path)
                          ? 'text-coral'
                          : 'text-white group-hover:text-white/80'
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-10 pb-10 flex flex-col gap-1"
            >
              <a
                href="mailto:info@asrcorporation.com"
                className="font-body text-sm text-muted hover:text-coral transition-colors duration-200"
              >
                info@asrcorporation.com
              </a>
              <a
                href="tel:+918242456789"
                className="font-body text-sm text-muted hover:text-coral transition-colors duration-200"
              >
                +91 824 245 6789
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
