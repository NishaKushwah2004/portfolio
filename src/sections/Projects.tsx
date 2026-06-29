import React, { useState } from 'react';
import { Plus, FolderOpen, ArrowRight } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  adminMode: boolean;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  adminMode,
  onAddProject,
  onEditProject,
  onDeleteProject
}) => {
  const [filter, setFilter] = useState<'All' | 'Featured' | 'In Progress' | 'Completed'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [github, setGithub] = useState('');
  const [live, setLive] = useState('');
  const [video, setVideo] = useState('');
  const [status, setStatus] = useState<Project['status']>('Completed');
  const [date, setDate] = useState('');
  const [featured, setFeatured] = useState(false);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setImage('');
    setTagsInput('');
    setTechStackInput('');
    setGithub('');
    setLive('');
    setVideo('');
    setStatus('Completed');
    setDate('');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image);
    setTagsInput(project.tags.join(', '));
    setTechStackInput(project.techStack.join(', '));
    setGithub(project.github || '');
    setLive(project.live || '');
    setVideo(project.video || '');
    setStatus(project.status);
    setDate(project.date);
    setFeatured(project.featured);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      ? tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean)
      : ['Project'];
    const techStack = techStackInput
      ? techStackInput.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const projectData = {
      title,
      description,
      image: image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
      tags,
      techStack,
      github: github || undefined,
      live: live || undefined,
      video: video || undefined,
      status,
      date: date || 'June 2026',
      featured
    };

    if (editingProject) {
      onEditProject({
        id: editingProject.id,
        ...projectData
      });
    } else {
      onAddProject(projectData);
    }
    setIsModalOpen(false);
  };

  // Filtering projects list
  const filteredProjects = projects.filter((p) => {
    if (filter === 'Featured') return p.featured;
    if (filter === 'In Progress') return p.status === 'In Progress';
    if (filter === 'Completed') return p.status === 'Completed';
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 bg-surface-container-low border-y border-outline-variant/60">
      <div className="max-w-container-max mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <span className="text-primary font-label-md text-xs uppercase tracking-widest">Portfolio</span>
            <h2 className="text-headline-lg font-bold">Latest Projects</h2>
            <p className="text-body-md text-secondary max-w-xl text-sm">
              A curated selection of academic, research, and personal projects showcasing core software engineering and AI implementations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {adminMode && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAddModal}
                icon={<Plus size={15} />}
              >
                Add New Project
              </Button>
            )}
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(['All', 'Featured', 'In Progress', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-label-md transition-all ${
                filter === tab
                  ? 'bg-primary text-on-primary shadow-sm shadow-primary/15'
                  : 'bg-surface-container-lowest text-secondary hover:text-primary border border-outline-variant/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-outline-variant rounded-2xl bg-surface max-w-4xl mx-auto">
            <FolderOpen className="text-outline text-5xl mb-4 mx-auto opacity-70 animate-pulse" size={50} />
            <h3 className="text-headline-sm font-semibold text-on-surface mb-2">Your Portfolio is Empty</h3>
            <p className="text-body-md text-secondary text-sm mb-8">
              Start adding your amazing projects to impress potential clients and recruiters.
            </p>
            {adminMode && (
              <Button
                variant="primary"
                size="md"
                onClick={handleOpenAddModal}
                icon={<Plus size={15} />}
              >
                Add New Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                adminMode={adminMode}
                onEdit={handleOpenEditModal}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Add New Project"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-name">
              Project Name
            </label>
            <input
              id="proj-name"
              type="text"
              required
              placeholder="e.g. Portfolio Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-desc">
              Description
            </label>
            <textarea
              id="proj-desc"
              required
              rows={3}
              placeholder="Short overview of the project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-img">
              Image URL
            </label>
            <input
              id="proj-img"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-tags">
                Tags (comma separated)
              </label>
              <input
                id="proj-tags"
                type="text"
                placeholder="GenAI, NLP"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-tech">
                Tech Stack
              </label>
              <input
                id="proj-tech"
                type="text"
                placeholder="React, Tailwind"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-date">
                Date / Duration
              </label>
              <input
                id="proj-date"
                type="text"
                placeholder="e.g. May 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-status">
                Status
              </label>
              <select
                id="proj-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Project['status'])}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm appearance-none"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Beta">Beta</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-github">
              GitHub Link
            </label>
            <input
              id="proj-github"
              type="url"
              placeholder="https://github.com/..."
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-live">
                Live Demo Link
              </label>
              <input
                id="proj-live"
                type="url"
                placeholder="https://..."
                value={live}
                onChange={(e) => setLive(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="proj-video">
                Video Link
              </label>
              <input
                id="proj-video"
                type="url"
                placeholder="https://youtube.com/..."
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              id="proj-featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
            />
            <label className="text-label-md text-xs text-on-surface uppercase" htmlFor="proj-featured">
              Feature this project
            </label>
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
