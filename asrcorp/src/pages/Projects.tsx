import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';
import { projects } from '@/data/projects';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatsBar from '@/components/ui/StatsBar';
import ProjectCard from '@/components/ui/ProjectCard';
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
      <section className="relative bg-dark py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Modern building"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        </div>
        <div className="grain" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              OUR WORK
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              PROJECT <span className="gradient-text">PORTFOLIO</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <StatsBar />

      {/* Filter & Gallery */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-body text-sm font-medium px-5 py-2 transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-coral text-white'
                      : 'bg-transparent text-muted border border-border-light hover:border-coral hover:text-coral'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-dark border border-border-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <span className="text-coral text-xs uppercase tracking-wider font-body font-semibold">
                  {selectedProject.category}
                </span>
                <h3 className="font-heading text-3xl font-extrabold text-white mt-2 mb-4">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-6 text-muted mb-6 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {selectedProject.year}
                  </span>
                </div>
                <p className="text-muted-light leading-relaxed">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
