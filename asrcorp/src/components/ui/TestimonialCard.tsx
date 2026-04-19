import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative flex flex-col rounded-xl border border-brand-stone/15 bg-brand-warm-white p-6 md:p-8 shadow-sm">
      {/* Decorative quote mark */}
      <Quote
        size={36}
        className="absolute top-5 right-5 text-brand-amber/15"
        strokeWidth={1.5}
      />

      {/* Star rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < testimonial.rating
                ? 'fill-brand-amber text-brand-amber'
                : 'fill-brand-stone/20 text-brand-stone/30'
            }
          />
        ))}
      </div>

      {/* Review text */}
      <p className="flex-1 font-body text-base leading-relaxed text-brand-charcoal/85 italic">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 border-t border-brand-stone/10 pt-4">
        <p className="font-display text-base font-semibold text-brand-charcoal">
          {testimonial.name}
        </p>
        <p className="text-sm text-brand-stone">{testimonial.role}</p>
      </div>
    </div>
  );
}
