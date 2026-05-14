import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Package, MessageCircle, FileText, Search } from 'lucide-react';
import SimpleIcon from './SimpleIcon';
import { getAllProducts } from '../../hooks/useProducts';
import { CATEGORY_LABELS } from '../../types';

const PAGE_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'All products', to: '/products', icon: Package },
  { label: 'Contact', to: '/contact', icon: MessageCircle },
  { label: 'Terms of service', to: '/terms', icon: FileText },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const products = getAllProducts();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="glass-strong w-full max-w-xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command Menu" shouldFilter className="flex flex-col">
              <div className="flex items-center gap-2.5 border-b border-overlay/5 px-4">
                <Search size={14} className="text-muted-foreground" />
                <Command.Input
                  placeholder="Search products, pages…"
                  className="h-14 flex-1 bg-transparent text-sm tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded-md border border-overlay/10 bg-overlay/5 px-1.5 py-0.5 font-mono text-2xs text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Pages"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {PAGE_ITEMS.map((item) => (
                    <Command.Item
                      key={item.to}
                      value={item.label}
                      onSelect={() => go(item.to)}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2.5 text-sm text-foreground aria-selected:bg-overlay/8"
                    >
                      <item.icon size={14} className="text-muted-foreground" />
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Products"
                  className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {products.map((p) => (
                    <Command.Item
                      key={p.id}
                      value={`${p.name} ${CATEGORY_LABELS[p.category]} ${p.type}`}
                      onSelect={() => go(`/products/${p.slug}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-sm text-foreground aria-selected:bg-overlay/8"
                    >
                      <SimpleIcon product={p} size={24} rounded={6} />
                      <span className="flex-1 truncate tracking-tight">{p.name}</span>
                      <span className="text-2xs text-muted-foreground">
                        {CATEGORY_LABELS[p.category]}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-overlay/5 px-4 py-2.5 text-2xs text-muted-foreground">
                <span>
                  <kbd className="font-mono">↑</kbd>
                  <kbd className="ml-1 font-mono">↓</kbd> to navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> to select
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandMenu;
