import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1541976590-713941681591?w=1600&q=80"
          alt="Modern architecture"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/40 to-brand-charcoal" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-brand-amber/40 to-transparent hidden lg:block" />
      <div className="absolute top-40 right-16 w-px h-48 bg-gradient-to-b from-transparent via-brand-amber/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-32 left-20 w-24 h-px bg-gradient-to-r from-brand-amber/30 to-transparent hidden lg:block" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block px-4 py-2 border border-brand-amber/30 text-brand-amber text-sm tracking-[0.2em] uppercase font-body">
            Mangaluru&apos;s Premier Construction Partner
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6"
        >
          Building{' '}
          <span className="gradient-text italic">Dreams</span>
          <br />
          Delivering{' '}
          <span className="text-brand-amber">Excellence</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          From luxury residences to commercial landmarks, ASR Corporation transforms
          visions into architectural masterpieces across Karnataka&apos;s coastal region.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/quote"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-amber text-white font-body font-semibold text-lg rounded-sm hover:bg-brand-amber-light transition-all duration-300"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-body font-semibold text-lg rounded-sm hover:border-brand-amber hover:text-brand-amber transition-all duration-300"
          >
            Explore Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-brand-amber" />
        </motion.div>
      </motion.div>
    </section>
  );
}
