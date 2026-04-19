import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import type { Project } from '@/types';

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 5);

  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="PORTFOLIO"
          title="Selected Projects"
          light
        />
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 mt-16 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {featured.map((project) => (
          <div
            key={project.id}
            className="snap-start flex-shrink-0 w-[350px] md:w-[450px]"
          >
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </div>
        ))}

        {/* View All indicator */}
        <div className="snap-start flex-shrink-0 w-[200px] flex items-center justify-center">
          <a
            href="/projects"
            className="text-coral font-body font-semibold text-lg flex items-center gap-2 hover:gap-4 transition-all duration-300"
          >
            View All <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

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
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-dark border border-border-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-coral text-white text-xs tracking-wider uppercase font-bold mb-4">
                  {selectedProject.category}
                </span>
                <h3 className="font-heading text-3xl text-white font-bold mb-4">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-6 text-muted-light mb-6 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {selectedProject.year}
                  </span>
                </div>
                <p className="text-muted leading-relaxed font-body">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
