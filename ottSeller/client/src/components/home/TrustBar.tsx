import { ShieldCheck, Zap, BadgeCheck, Lock } from 'lucide-react';

const ITEMS = [
  { icon: BadgeCheck, label: 'Genuine accounts' },
  { icon: Zap, label: 'Instant delivery' },
  { icon: ShieldCheck, label: 'Warranty included' },
  { icon: Lock, label: 'Secure payment' },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="glass grid grid-cols-2 divide-x divide-overlay/5 rounded-xl sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2 py-5 text-sm tracking-tight text-muted-foreground"
          >
            <Icon size={14} className="text-foreground" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBar;
