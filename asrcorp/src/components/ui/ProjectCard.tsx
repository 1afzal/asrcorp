import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/50" />

        {/* Category badge */}
        <span className="absolute top-4 left-4 rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {project.category}
        </span>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl font-bold text-white">
            {project.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-white/80">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
