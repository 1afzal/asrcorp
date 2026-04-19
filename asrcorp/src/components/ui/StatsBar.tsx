import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Cities Covered' },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span className="font-heading text-6xl md:text-7xl font-extrabold gradient-text">
      {display}
      <span className="gradient-text">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative bg-dark grain py-20 px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col items-center text-center gap-2">
              {/* Vertical divider — hidden on first item and on mobile */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-border-dark" />
              )}

              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                inView={isInView}
              />
              <span className="text-muted uppercase text-xs tracking-[0.2em] font-body mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
