import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-0.5">
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="text-brand-amber">ASR</span>
              <span className={scrolled ? 'text-brand-warm-white' : 'text-brand-charcoal'}>
                CORP
              </span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`relative pb-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(path)
                      ? 'text-brand-amber'
                      : scrolled
                        ? 'text-brand-warm-white/80 hover:text-brand-amber'
                        : 'text-brand-charcoal/80 hover:text-brand-amber'
                  }`}
                >
                  {label}
                  {isActive(path) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-amber"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── CTA + mobile toggle ── */}
          <div className="flex items-center gap-4">
            <Link
              to="/quote"
              className="hidden rounded-md bg-brand-amber px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-amber-light md:inline-block"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`relative z-50 md:hidden ${
                scrolled || mobileOpen ? 'text-brand-warm-white' : 'text-brand-charcoal'
              }`}
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
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-charcoal/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ label, path }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    to={path}
                    className={`font-display text-3xl font-semibold tracking-wide transition-colors duration-300 ${
                      isActive(path)
                        ? 'text-brand-amber'
                        : 'text-brand-warm-white hover:text-brand-amber'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.35, ease: 'easeOut' }}
              >
                <Link
                  to="/quote"
                  className="mt-4 inline-block rounded-md bg-brand-amber px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-brand-amber-light"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
