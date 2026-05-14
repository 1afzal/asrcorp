import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const NAV_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/contact', label: 'Contact' },
];

function triggerCommandMenu() {
  window.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <nav className="glass-nav flex h-14 flex-1 items-center justify-between gap-4 rounded-pill pl-2.5 pr-3 sm:pl-3 sm:pr-2">
            {/* Brand (logo tile) */}
            <Link
              to="/"
              onClick={closeMobile}
              className="flex h-10 items-center gap-2.5 rounded-pill pl-1 pr-3 transition-colors hover:bg-overlay/5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-foreground text-background text-sm font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_2px_6px_rgba(0,0,0,0.4)]">
                O
              </span>
              <span className="hidden text-[15px] font-semibold tracking-[-0.02em] text-foreground sm:inline">
                Softwaresellr
              </span>
            </Link>

            {/* Middle links */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      'rounded-pill px-4 py-1.5 text-sm font-medium tracking-tight transition-all duration-200 ease-apple',
                      isActive
                        ? 'bg-overlay/10 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                        : 'text-muted-foreground hover:bg-overlay/5 hover:text-foreground',
                    ].join(' ')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={triggerCommandMenu}
                className="hidden h-9 items-center gap-2 rounded-pill border border-overlay/10 bg-overlay/5 px-3 text-xs text-muted-foreground transition-all duration-200 ease-apple hover:bg-overlay/10 hover:text-foreground md:inline-flex"
                aria-label="Open command menu"
              >
                <Search size={12} />
                <span>Search</span>
                <kbd className="ml-1 rounded border border-overlay/10 bg-overlay/5 px-1 font-mono text-2xs">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={triggerCommandMenu}
                className="flex h-9 w-9 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground md:hidden"
                aria-label="Search"
              >
                <Search size={15} />
              </button>

              <ThemeToggle />

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-pill text-foreground transition-colors hover:bg-overlay/10 md:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[84px] z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        >
          <div
            className="glass-nav mx-4 mt-2 rounded-lg p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    [
                      'rounded-md px-4 py-3 text-sm font-medium',
                      isActive
                        ? 'bg-overlay/10 text-foreground'
                        : 'text-muted-foreground hover:bg-overlay/5 hover:text-foreground',
                    ].join(' ')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
