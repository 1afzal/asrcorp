import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <ScrollReveal delay={index * 0.12}>
      <motion.div
        className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md"
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Icon overlay */}
          <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-amber text-white shadow-lg">
            <Icon size={22} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-bold text-brand-charcoal">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-stone">
            {service.description}
          </p>
          <Link
            to="/services"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-amber transition-colors hover:text-brand-amber-light"
          >
            Learn More
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
