import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Filter } from 'lucide-react';
import { projects } from '@/data/projects';
import PageTransition from '@/components/layout/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatsBar from '@/components/ui/StatsBar';
import type { Project } from '@/types';

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = 'Our Projects — ASR Corporation';
  }, []);

  const filtered = useMemo(
    () => activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Modern building"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-charcoal" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 border border-brand-amber/30 text-brand-amber text-sm tracking-[0.2em] uppercase font-body mb-6"
          >
            Our Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Project <span className="gradient-text italic">Portfolio</span>
          </motion.h1>
        </div>
      </section>

      <StatsBar />

      {/* Filter & Gallery */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Projects" subtitle="Browse our portfolio of completed projects across all services." />

          {/* Filter tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-12 mb-16">
              <Filter className="w-4 h-4 text-brand-stone mr-2" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 text-sm font-body font-medium rounded-sm transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-brand-amber text-white'
                      : 'bg-white text-brand-stone border border-brand-stone/20 hover:border-brand-amber hover:text-brand-amber'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-brand-amber text-white text-xs tracking-wider uppercase mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl text-white font-semibold">{project.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-300 text-sm">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-brand-surface rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-brand-amber text-white text-xs tracking-wider uppercase mb-4">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl text-white font-semibold mb-4">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-6 text-brand-stone mb-6 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {selectedProject.year}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
