import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaBanner() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
          alt="Architecture blueprint"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-charcoal/85" />
      </div>

      <ScrollReveal>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Build
            <br />
            <span className="gradient-text italic">Your Dream?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Let&apos;s turn your vision into reality. Get in touch with our team for a free
            consultation and detailed project estimate.
          </p>
          <Link
            to="/quote"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-brand-amber text-white font-body font-semibold text-lg rounded-sm hover:bg-brand-amber-light transition-all duration-300"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
