import React, { useState } from 'react';
import { GraduationCap, Plus, Calendar, Edit, Trash } from 'lucide-react';
import { motion } from 'motion/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Education } from '../types/types';

interface EducationProps {
  educationList: Education[];
  adminMode: boolean;
  onAddEducation: (edu: Omit<Education, 'id'>) => void;
  onEditEducation: (edu: Education) => void;
  onDeleteEducation: (id: string) => void;
}

export const EducationSec: React.FC<EducationProps> = ({
  educationList,
  adminMode,
  onAddEducation,
  onEditEducation,
  onDeleteEducation
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  // Form states
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [duration, setDuration] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenAddModal = () => {
    setEditingEdu(null);
    setInstitution('');
    setDegree('');
    setDuration('');
    setGrade('');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (edu: Education) => {
    setEditingEdu(edu);
    setInstitution(edu.institution);
    setDegree(edu.degree);
    setDuration(edu.duration);
    setGrade(edu.grade || '');
    setDescription(edu.description || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !degree.trim() || !duration.trim()) return;

    if (editingEdu) {
      onEditEducation({
        id: editingEdu.id,
        institution,
        degree,
        duration,
        grade: grade || undefined,
        description: description || undefined
      });
    } else {
      onAddEducation({
        institution,
        degree,
        duration,
        grade: grade || undefined,
        description: description || undefined
      });
    }
    setIsModalOpen(false);
  };

  return (
    <section id="education" className="py-24 px-6 max-w-container-max mx-auto border-b border-outline-variant/60">
      <div className="text-center mb-16 space-y-4">
        <span className="text-primary font-label-md text-xs uppercase tracking-widest">Academic Pathway</span>
        <h2 className="text-headline-lg font-bold">Education History</h2>
        <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
          A review of my structured academic learning and engineering studies.
        </p>

        {adminMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAddModal}
            icon={<Plus size={15} />}
            className="mt-4"
          >
            Add Education
          </Button>
        )}
      </div>

      {educationList.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container-low max-w-2xl mx-auto">
          <GraduationCap className="text-outline text-4xl mb-4 mx-auto opacity-70" size={40} />
          <p className="text-body-lg text-secondary font-medium">No education history recorded.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educationList.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between group"
            >
              {/* Admin Mode buttons */}
              {adminMode && (
                <div className="absolute top-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEditModal(edu)}
                    className="p-1 bg-surface border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => onDeleteEducation(edu.id)}
                    className="p-1 bg-surface border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all"
                  >
                    <Trash size={12} />
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-medium text-xs">
                  <GraduationCap size={16} />
                  <span className="font-label-md uppercase tracking-wider">{edu.duration}</span>
                </div>

                <div>
                  <h3 className="text-headline-sm font-semibold text-on-surface text-lg leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-semibold text-sm mt-1">{edu.institution}</p>
                </div>

                {edu.grade && (
                  <div className="inline-flex bg-primary/5 border border-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md">
                    {edu.grade}
                  </div>
                )}

                {edu.description && (
                  <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Education Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEdu ? "Edit Education" : "Add Education"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="edu-inst">
              Institution
            </label>
            <input
              id="edu-inst"
              type="text"
              required
              placeholder="e.g. Stanford University"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="edu-deg">
              Degree / Program
            </label>
            <input
              id="edu-deg"
              type="text"
              required
              placeholder="e.g. B.Tech in Computer Science"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="edu-dur">
                Duration
              </label>
              <input
                id="edu-dur"
                type="text"
                required
                placeholder="e.g. 2022 - 2026"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="edu-grd">
                Grade / CGPA (Optional)
              </label>
              <input
                id="edu-grd"
                type="text"
                placeholder="e.g. CGPA: 9.0 / 10.0"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="edu-desc">
              Additional Details (Optional)
            </label>
            <textarea
              id="edu-desc"
              rows={3}
              placeholder="Explain coursework, clubs, activities, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
