import React from 'react';
import { motion } from 'motion/react';
import { Edit, Trash } from 'lucide-react';
import { Skill } from '../types/types';

interface SkillCardProps {
  skill: Skill;
  adminMode: boolean;
  onEdit?: (skill: Skill) => void;
  onDelete?: (id: string) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  adminMode,
  onEdit,
  onDelete
}) => {
  return (
    <div className="relative group bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300">
      {/* Admin Action Buttons */}
      {adminMode && (
        <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit && onEdit(skill)}
            className="p-1.5 bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all shadow-sm"
            title="Edit Skill"
          >
            <Edit size={12} />
          </button>
          <button
            onClick={() => onDelete && onDelete(skill.id)}
            className="p-1.5 bg-surface-container-lowest border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all shadow-sm"
            title="Delete Skill"
          >
            <Trash size={12} />
          </button>
        </div>
      )}

      {/* Title & Percentage info */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider text-xs">
          {skill.name}
        </span>
        <span className="font-label-md text-label-md text-primary font-semibold text-xs">
          {skill.proficiency}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full bg-outline-variant/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
};
