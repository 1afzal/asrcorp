import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Project } from '@/types';

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-brand-charcoal noise-overlay">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Featured Projects"
          subtitle="A glimpse into our finest work across Mangaluru and beyond."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {featured.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/5]"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-brand-amber text-white text-xs tracking-wider uppercase mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl text-white font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {project.location}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-amber font-body font-semibold hover:text-brand-amber-light transition-colors tracking-wide"
          >
            View All Projects
            <span className="text-xl">&rarr;</span>
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
                <p className="text-gray-300 leading-relaxed">
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
