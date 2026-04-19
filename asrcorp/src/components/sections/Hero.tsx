import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.5 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const marqueeText =
  'CONSTRUCTION \u2022 RENOVATION \u2022 WATERPROOFING \u2022 ROOFING \u2022 INTERIOR DESIGN \u2022 PAINTING \u2022 REAL ESTATE \u2022 ';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/2835509/2835509-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="video-overlay" />

      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center lg:items-start"
      >
        {/* Label */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="text-coral text-xs tracking-[0.3em] uppercase font-body font-semibold inline-flex items-center">
            <span className="inline-block w-8 h-px bg-coral mr-3" />
            CONSTRUCTION &amp; REAL ESTATE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-heading text-5xl md:text-7xl lg:text-[8rem] font-extrabold text-white leading-[0.95] tracking-tight text-center lg:text-left"
        >
          WE BUILD
          <br />
          <span className="text-white">YOUR </span>
          <span className="gradient-text">DREAMS</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-muted-light font-body text-lg md:text-xl max-w-xl mt-8 text-center lg:text-left"
        >
          From luxury residences to commercial landmarks, ASR Corporation transforms
          visions into architectural masterpieces across Karnataka&apos;s coastal region.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Link
            to="/quote"
            className="magnetic-btn bg-coral text-white px-8 py-4 font-body font-semibold uppercase tracking-wider text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            to="/projects"
            className="border border-white/20 text-white px-8 py-4 hover:border-coral hover:text-coral transition-all duration-300 font-body font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2"
          >
            Watch Our Reel
          </Link>
        </motion.div>
      </motion.div>

      {/* Scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-20">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-white/[0.03] font-heading text-[8rem] font-extrabold leading-none">
            {marqueeText}
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  );
}
