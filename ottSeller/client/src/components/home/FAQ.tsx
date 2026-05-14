import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Are these genuine accounts?',
    a: 'Yes — every subscription we sell is a real, paid plan from the original provider. We do not sell cracked or pirated software.',
  },
  {
    q: 'How do I activate my subscription?',
    a: 'Most products are activated on your existing account using credentials you provide. For a few, we supply fresh login credentials directly. Each product page lists its exact activation requirements.',
  },
  {
    q: 'What if my account stops working?',
    a: 'Every product includes a warranty (listed on its page). If the account stops working within the warranty period, we will replace it at no additional cost.',
  },
  {
    q: 'Do I need a VPN for any products?',
    a: 'A VPN is required for CapCut Pro in India. All other products work without one.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Typically 15–30 minutes after successful payment. Credentials are sent to the email address you provide at checkout.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Message us on WhatsApp or Telegram and we will help you switch plans. Upgrade paths vary by product.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <h2 className="mb-10 text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
        Frequently asked <span className="text-muted-foreground">questions.</span>
      </h2>

      <div className="glass divide-y divide-overlay/5 rounded-lg">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-overlay/[0.03]"
              >
                <span className="text-[15px] font-medium tracking-tight text-foreground">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="text-muted-foreground"
                >
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="px-6 pb-5 text-sm text-muted-foreground">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FAQ;
