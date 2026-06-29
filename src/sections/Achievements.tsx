import React, { useState } from 'react';
import { Award, Plus, Calendar, Edit, Trash } from 'lucide-react';
import { motion } from 'motion/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  adminMode: boolean;
  onAddAchievement: (ach: Omit<Achievement, 'id'>) => void;
  onEditAchievement: (ach: Achievement) => void;
  onDeleteAchievement: (id: string) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  adminMode,
  onAddAchievement,
  onEditAchievement,
  onDeleteAchievement
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenAddModal = () => {
    setEditingAch(null);
    setTitle('');
    setDate('');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ach: Achievement) => {
    setEditingAch(ach);
    setTitle(ach.title);
    setDate(ach.date || '');
    setDescription(ach.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingAch) {
      onEditAchievement({
        id: editingAch.id,
        title,
        date: date || undefined,
        description
      });
    } else {
      onAddAchievement({
        title,
        date: date || undefined,
        description
      });
    }
    setIsModalOpen(false);
  };

  return (
    <section id="achievements" className="py-24 px-6 bg-surface-container-low border-y border-outline-variant/60">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-label-md text-xs uppercase tracking-widest">Milestones</span>
          <h2 className="text-headline-lg font-bold">Key Achievements</h2>
          <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
            Recognitions, competitive milestones, and leadership merits.
          </p>

          {adminMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenAddModal}
              icon={<Plus size={15} />}
              className="mt-4"
            >
              Add Achievement
            </Button>
          )}
        </div>

        {achievements.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-2xl bg-surface max-w-2xl mx-auto">
            <Award className="text-outline text-4xl mb-4 mx-auto opacity-70" size={40} />
            <p className="text-body-lg text-secondary font-medium">No achievements logged.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between group"
              >
                {/* Admin Operations */}
                {adminMode && (
                  <div className="absolute top-3 right-3 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditModal(ach)}
                      className="p-1 bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteAchievement(ach.id)}
                      className="p-1 bg-surface-container-lowest border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                )}

                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-5">
                    <Award size={18} />
                  </div>
                  
                  {ach.date && (
                    <div className="flex items-center gap-1 text-xs text-secondary font-medium mb-2">
                      <Calendar size={12} />
                      <span>{ach.date}</span>
                    </div>
                  )}

                  <h3 className="text-headline-sm font-semibold mb-3 text-on-surface leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAch ? "Edit Achievement" : "Add Achievement"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="ach-title">
              Achievement Title
            </label>
            <input
              id="ach-title"
              type="text"
              required
              placeholder="e.g. 1st Place - Smart Hackathon"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="ach-date">
              Date
            </label>
            <input
              id="ach-date"
              type="text"
              placeholder="e.g. Oct 2025"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="ach-desc">
              Description
            </label>
            <textarea
              id="ach-desc"
              required
              rows={3}
              placeholder="Explain details of this milestone..."
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
