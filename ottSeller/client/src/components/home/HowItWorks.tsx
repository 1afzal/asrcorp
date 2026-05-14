import { Search, CreditCard, KeyRound } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Browse & pick',
    desc: 'Find the subscription you need from our curated catalog.',
  },
  {
    icon: CreditCard,
    title: 'Pay securely',
    desc: 'Confirm your order over WhatsApp and pay through any method we agree on.',
  },
  {
    icon: KeyRound,
    title: 'Get instant access',
    desc: 'Credentials or activation land in your inbox within 30 minutes.',
  },
];

export function HowItWorks() {
  return (
    <>
      <h2 className="mb-2 text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
        Three simple steps <span className="text-muted-foreground">to premium access.</span>
      </h2>
      <p className="mb-10 text-muted-foreground">No accounts, no friction — just delivery.</p>

      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="glass rounded-lg p-6 transition-all duration-300 ease-apple hover:bg-overlay/[0.07]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-overlay/10 bg-overlay/5 text-foreground">
                <Icon size={15} />
              </div>
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mb-1.5 text-base font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HowItWorks;
