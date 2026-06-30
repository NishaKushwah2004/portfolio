import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, Edit, Trash } from 'lucide-react';
import { Experience } from '../types/types';

interface ExperienceCardProps {
  exp: Experience;
  adminMode: boolean;
  onEdit?: (exp: Experience) => void;
  onDelete?: (id: string) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  adminMode,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 md:pl-12 border-l border-primary/20 last:border-l-transparent pb-10 group"
    >
      {/* Timeline Node Point */}
      <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 transition-transform duration-300 group-hover:scale-125" />

      {/* Card Content Wrapper */}
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
        
        {/* Admin Action Buttons */}
        {adminMode && (
          <div className="absolute top-4 right-4 flex gap-1.5">
            <button
              onClick={() => onEdit && onEdit(exp)}
              className="p-1.5 bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all shadow-sm"
              title="Edit Experience"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => onDelete && onDelete(exp.id)}
              className="p-1.5 bg-surface-container-lowest border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all shadow-sm"
              title="Delete Experience"
            >
              <Trash size={14} />
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-primary/5 rounded-lg text-primary">
                <Briefcase size={16} />
              </span>
              <h3 className="text-headline-sm font-semibold text-on-surface text-lg md:text-xl">
                {exp.role}
              </h3>
            </div>
            <p className="text-primary font-semibold text-sm mt-1">{exp.company}</p>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-secondary font-medium md:text-right md:flex-col md:items-end">
            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-primary/70" />
              <span>{exp.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-primary/70" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        <p className="text-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
          {exp.description}
        </p>

        {/* Responsibilities list */}
        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <ul className="list-disc pl-5 mb-6 space-y-1.5 text-secondary text-sm">
            {exp.responsibilities.map((resp, i) => (
              <li key={i} className="leading-relaxed">{resp}</li>
            ))}
          </ul>
        )}

        {/* Technologies used */}
        {exp.technologiesUsed && exp.technologiesUsed.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-outline-variant/60">
            {exp.technologiesUsed.map((tech, i) => (
              <span
                key={i}
                className="bg-surface-container-low border border-outline-variant/60 px-2.5 py-0.5 rounded-full text-label-md text-secondary text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
