import { MapPin } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden cursor-pointer border border-border-dark hover:border-b-2 hover:border-b-coral transition-all duration-500"
      onClick={onClick}
    >
      {/* Full image */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity duration-500 group-hover:from-dark/70" />

      {/* Category badge */}
      <span className="absolute top-4 left-4 z-10 text-xs font-body font-semibold uppercase tracking-wider text-coral border border-coral/30 px-3 py-1 bg-dark/50 backdrop-blur-sm">
        {project.category}
      </span>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="font-heading text-2xl font-bold text-white">
          {project.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-muted-light text-sm">
          <MapPin size={14} />
          <span>{project.location}</span>
        </div>
        <p className="text-muted text-xs mt-1">{project.year}</p>
      </div>
    </div>
  );
}
