import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const firstLetter = testimonial.name.charAt(0).toUpperCase();

  return (
    <div className="relative bg-dark-card p-10 border border-border-dark overflow-hidden">
      {/* Decorative open-quote */}
      <span className="absolute -top-2 left-6 text-coral/20 text-8xl font-heading font-extrabold leading-none select-none pointer-events-none">
        &ldquo;
      </span>

      {/* Star rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < testimonial.rating
                ? 'text-gold fill-gold'
                : 'text-border-dark'
            }
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-white/90 font-body text-lg leading-relaxed relative z-10">
        {testimonial.review}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-dark">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-coral font-heading font-bold text-lg">
            {firstLetter}
          </span>
        </div>
        <div>
          <p className="font-heading font-bold text-white text-sm">
            {testimonial.name}
          </p>
          <p className="text-muted text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
