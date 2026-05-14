import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  current: number;
  previous: number;
  invert?: boolean;
}

export default function StatCard({ label, value, current, previous, invert = false }: StatCardProps) {
  const delta = previous === 0 ? (current === 0 ? 0 : 100) : ((current - previous) / previous) * 100;
  const rounded = Math.round(delta * 10) / 10;
  const isFlat = Math.abs(rounded) < 0.5 || (current === 0 && previous === 0);
  const isUp = !isFlat && rounded > 0;
  const positive = isFlat ? null : invert ? !isUp : isUp;

  const toneClass = isFlat
    ? 'text-muted-foreground'
    : positive
      ? 'text-[#30D158]'
      : 'text-[#FF453A]';

  const Icon = isFlat ? Minus : isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="glass rounded-lg p-5">
      <div className="text-2xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] tabular-nums text-foreground sm:text-3xl">
        {value}
      </div>
      <div className={`mt-2 flex items-center gap-1 text-xs ${toneClass}`}>
        <Icon size={12} />
        <span className="tabular-nums">
          {isFlat ? 'No change' : `${rounded > 0 ? '+' : ''}${rounded}%`}
        </span>
        <span className="text-muted-foreground"> vs prev. period</span>
      </div>
    </div>
  );
}
