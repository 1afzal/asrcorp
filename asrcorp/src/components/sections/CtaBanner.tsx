import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaBanner() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="video-overlay" />

      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <ScrollReveal>
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            READY TO
            <br />
            <span className="gradient-text">START BUILDING?</span>
          </h2>
          <p className="text-muted-light text-lg max-w-xl mx-auto mt-6 font-body">
            Let&apos;s turn your vision into reality. Get in touch for a free consultation
            and detailed project estimate.
          </p>
          <div className="mt-10">
            <Link
              to="/quote"
              className="magnetic-btn bg-coral text-white px-10 py-5 uppercase tracking-wider font-body font-semibold"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
