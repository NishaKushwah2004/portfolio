import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Video, Edit, Trash } from 'lucide-react';
import { Project } from '../types/types';

interface ProjectCardProps {
  project: Project;
  adminMode: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  adminMode,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Admin Action Buttons */}
      {adminMode && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => onEdit && onEdit(project)}
            className="p-2 bg-surface-container-lowest/95 border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all shadow-sm"
            title="Edit Project"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete && onDelete(project.id)}
            className="p-2 bg-surface-container-lowest/95 border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all shadow-sm"
            title="Delete Project"
          >
            <Trash size={16} />
          </button>
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden h-48 border-b border-outline-variant bg-surface-container-low">
        <img
          src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-label-md uppercase tracking-wider shadow-sm ${
            project.status === 'Completed'
              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              : project.status === 'In Progress'
              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
              : 'bg-primary/10 text-primary border border-primary/20'
          }`}>
            {project.status}
          </span>
          <span className="bg-surface-container-lowest/90 border border-outline-variant px-2 py-0.5 rounded-full text-[11px] font-label-md text-secondary shadow-sm">
            {project.date}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Tech Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-surface-container-high px-2.5 py-0.5 rounded-full text-label-md text-secondary text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-headline-sm font-semibold text-on-surface mb-2 leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-body-md text-secondary text-sm mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/60">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Github size={14} />
              <span>Source</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Video size={14} />
              <span>Video</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
