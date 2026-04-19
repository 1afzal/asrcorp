import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Service } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  const displayIndex = String(index + 1).padStart(2, '0');

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group relative flex flex-col overflow-hidden bg-dark-card border border-border-dark hover:border-coral/30 transition-all duration-500">
        {/* Decorative index number */}
        <span className="absolute top-4 right-6 z-10 text-coral/30 font-heading text-5xl font-extrabold leading-none select-none pointer-events-none">
          {displayIndex}
        </span>

        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark/40 to-dark/20 transition-opacity duration-500 group-hover:opacity-70" />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Icon circle */}
          <div className="w-10 h-10 bg-coral/10 rounded-full flex items-center justify-center">
            <Icon size={18} className="text-coral" />
          </div>

          <h3 className="font-heading font-bold text-white text-xl mt-4">
            {service.title}
          </h3>

          <p className="text-muted text-sm leading-relaxed mt-2">
            {service.description}
          </p>

          <Link
            to="/services"
            className="group/link mt-4 inline-flex items-center gap-1 text-coral text-sm font-semibold transition-colors duration-300 hover:text-coral-dark"
          >
            Explore{' '}
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              &rarr;
            </motion.span>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
