import React, { useState } from 'react';
import { Plus, Brain, Info } from 'lucide-react';
import { SkillCard } from '../components/SkillCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
  categories: string[];
  adminMode: boolean;
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onEditSkill: (skill: Skill) => void;
  onDeleteSkill: (id: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  categories,
  adminMode,
  onAddSkill,
  onEditSkill,
  onDeleteSkill
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Form states
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState(categories[0] || 'Frontend');
  const [skillProficiency, setSkillProficiency] = useState(80);

  const handleOpenAddModal = () => {
    setEditingSkill(null);
    setSkillName('');
    setSkillCategory(categories[0] || 'Frontend');
    setSkillProficiency(80);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillName(skill.name);
    setSkillCategory(skill.category);
    setSkillProficiency(skill.proficiency);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    if (editingSkill) {
      onEditSkill({
        id: editingSkill.id,
        name: skillName,
        category: skillCategory,
        proficiency: Number(skillProficiency)
      });
    } else {
      onAddSkill({
        name: skillName,
        category: skillCategory,
        proficiency: Number(skillProficiency)
      });
    }
    setIsModalOpen(false);
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-6 max-w-container-max mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-primary font-label-md text-xs uppercase tracking-widest">Expertise</span>
        <h2 className="text-headline-lg font-bold">My Skills</h2>
        <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
          A comprehensive overview of my core technical stack and development skills acquired through academic learning and internships.
        </p>

        {adminMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAddModal}
            icon={<Plus size={15} />}
            className="mt-4"
          >
            Add Skill
          </Button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-label-md transition-all ${
            selectedCategory === 'All'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-secondary hover:text-primary border border-outline-variant/60'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-label-md transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-secondary hover:text-primary border border-outline-variant/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container-low max-w-3xl mx-auto">
          <Brain className="text-outline text-4xl mb-4 mx-auto opacity-70 animate-pulse" size={40} />
          <p className="text-body-lg text-secondary font-medium">No skills added yet.</p>
          <p className="text-body-md text-outline text-sm mt-1">
            {adminMode ? "Click 'Add Skill' to showcase your expertise." : "Check back later for updates."}
          </p>
          {adminMode && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAddModal}
              icon={<Plus size={15} />}
              className="mt-6"
            >
              Add Skill
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              adminMode={adminMode}
              onEdit={handleOpenEditModal}
              onDelete={onDeleteSkill}
            />
          ))}
        </div>
      )}

      {/* Info Notice card */}
      <div className="mt-12 flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl max-w-xl mx-auto text-xs text-secondary font-medium">
        <Info size={16} className="text-primary flex-shrink-0" />
        <p>I constantly explore emerging technologies and refine my craft, driven by a passion for personal growth.</p>
      </div>

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? "Edit Skill" : "Add New Skill"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="skill-name">
              Skill Name
            </label>
            <input
              id="skill-name"
              type="text"
              required
              placeholder="e.g. PyTorch, Next.js"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="skill-cat">
              Category
            </label>
            <select
              id="skill-cat"
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-label-md text-xs text-on-surface uppercase" htmlFor="skill-prof">
                Proficiency (%)
              </label>
              <span className="text-xs font-bold text-primary">{skillProficiency}%</span>
            </div>
            <input
              id="skill-prof"
              type="range"
              min="0"
              max="100"
              value={skillProficiency}
              onChange={(e) => setSkillProficiency(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
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
              {editingSkill ? "Update Skill" : "Submit"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
