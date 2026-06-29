import React, { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import { ExperienceCard } from '../components/ExperienceCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Experience } from '../types';

interface ExperienceProps {
  experienceList: Experience[];
  adminMode: boolean;
  onAddExperience: (exp: Omit<Experience, 'id'>) => void;
  onEditExperience: (exp: Experience) => void;
  onDeleteExperience: (id: string) => void;
}

export const ExperienceSec: React.FC<ExperienceProps> = ({
  experienceList,
  adminMode,
  onAddExperience,
  onEditExperience,
  onDeleteExperience
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  // Form states
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const handleOpenAddModal = () => {
    setEditingExp(null);
    setCompany('');
    setRole('');
    setDuration('');
    setLocation('');
    setDescription('');
    setResponsibilitiesInput('');
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setCompany(exp.company);
    setRole(exp.role);
    setDuration(exp.duration);
    setLocation(exp.location);
    setDescription(exp.description);
    setResponsibilitiesInput(exp.responsibilities.join('\n'));
    setTechInput(exp.technologiesUsed.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !duration.trim()) return;

    const responsibilities = responsibilitiesInput
      ? responsibilitiesInput.split('\n').map(r => r.trim()).filter(Boolean)
      : [];
    const technologiesUsed = techInput
      ? techInput.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const expData = {
      company,
      role,
      duration,
      location,
      description,
      responsibilities,
      technologiesUsed
    };

    if (editingExp) {
      onEditExperience({
        id: editingExp.id,
        ...expData
      });
    } else {
      onAddExperience(expData);
    }
    setIsModalOpen(false);
  };

  return (
    <section id="experience" className="py-24 px-6 max-w-container-max mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-primary font-label-md text-xs uppercase tracking-widest">Expertise</span>
        <h2 className="text-headline-lg font-bold">Professional Experience</h2>
        <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
          A log of my engineering contributions, technical responsibilities, and team leadership roles.
        </p>

        {adminMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAddModal}
            icon={<Plus size={15} />}
            className="mt-4"
          >
            Add Experience
          </Button>
        )}
      </div>

      {experienceList.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container-low max-w-3xl mx-auto">
          <Briefcase className="text-outline text-4xl mb-4 mx-auto opacity-70 animate-pulse" size={40} />
          <p className="text-body-lg text-secondary font-medium">No experience history available.</p>
          {adminMode && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAddModal}
              icon={<Plus size={15} />}
              className="mt-6"
            >
              Add Experience
            </Button>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto relative pl-4 sm:pl-0">
          {experienceList.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              adminMode={adminMode}
              onEdit={handleOpenEditModal}
              onDelete={onDeleteExperience}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Experience Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? "Edit Experience" : "Add Experience"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-role">
                Role / Title
              </label>
              <input
                id="exp-role"
                type="text"
                required
                placeholder="e.g. Software Intern"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-company">
                Company
              </label>
              <input
                id="exp-company"
                type="text"
                required
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-duration">
                Duration
              </label>
              <input
                id="exp-duration"
                type="text"
                required
                placeholder="e.g. Aug 2025 - Present"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-loc">
                Location
              </label>
              <input
                id="exp-loc"
                type="text"
                placeholder="e.g. Remote, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-desc">
              Short Description
            </label>
            <textarea
              id="exp-desc"
              rows={2}
              placeholder="Provide a quick overview..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-resp">
              Responsibilities (one per line)
            </label>
            <textarea
              id="exp-resp"
              rows={4}
              placeholder="e.g. Optimized DB queries by 30%&#10;Built and tested React elements"
              value={responsibilitiesInput}
              onChange={(e) => setResponsibilitiesInput(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="exp-tech">
              Technologies Used (comma separated)
            </label>
            <input
              id="exp-tech"
              type="text"
              placeholder="React, PyTorch, Node.js"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
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
