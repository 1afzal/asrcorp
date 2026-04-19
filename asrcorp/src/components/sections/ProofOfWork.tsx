import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const reels = [
  {
    id: 'DXFWkcqE1tJ',
    url: 'https://www.instagram.com/reel/DXFWkcqE1tJ/',
    embedUrl: 'https://www.instagram.com/reel/DXFWkcqE1tJ/embed/',
  },
  {
    id: 'DVZg0KQE30e',
    url: 'https://www.instagram.com/reel/DVZg0KQE30e/',
    embedUrl: 'https://www.instagram.com/reel/DVZg0KQE30e/embed/',
  },
  {
    id: 'DJKy-wWz1te',
    url: 'https://www.instagram.com/reel/DJKy-wWz1te/',
    embedUrl: 'https://www.instagram.com/reel/DJKy-wWz1te/embed/',
  },
  {
    id: 'DHdOH0mvy3Q',
    url: 'https://www.instagram.com/reel/DHdOH0mvy3Q/',
    embedUrl: 'https://www.instagram.com/reel/DHdOH0mvy3Q/embed/',
  },
  {
    id: 'DF84EmIT5yD',
    url: 'https://www.instagram.com/reel/DF84EmIT5yD/',
    embedUrl: 'https://www.instagram.com/reel/DF84EmIT5yD/embed/',
  },
  {
    id: 'DFuXXibtz9d',
    url: 'https://www.instagram.com/reel/DFuXXibtz9d/',
    embedUrl: 'https://www.instagram.com/reel/DFuXXibtz9d/embed/',
  },
];

export default function ProofOfWork() {
  return (
    <section className="py-24 px-6 bg-light-muted">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="PROOF OF WORK"
          title="See Us In Action"
          subtitle="Real projects, real results. Follow our journey on Instagram."
        />

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {reels.map((reel, index) => (
            <ScrollReveal key={reel.id} delay={index * 0.1}>
              <div className="relative group bg-dark overflow-hidden aspect-[9/16] border border-border-dark">
                {/* Instagram Embed iframe — shows actual video frame content */}
                <iframe
                  src={reel.embedUrl}
                  title={`ASR Corporation Reel ${index + 1}`}
                  className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                  allowTransparency
                />

                {/* Hover overlay with link */}
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark/0 group-hover:bg-dark/60 transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    initial={false}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-coral flex items-center justify-center">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                    <span className="text-white font-body font-semibold text-sm flex items-center gap-1.5 uppercase tracking-wider">
                      Watch on Instagram
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </motion.div>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/asr.corporation/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coral font-body font-semibold hover:text-coral-dark transition-colors uppercase tracking-wider text-sm"
          >
            Follow @asr.corporation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
