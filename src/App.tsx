import React, { useState } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { ExperienceSec } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { EducationSec } from './sections/Education';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

// Initial data files
import { projects as initialProjects } from './data/projects';
import { skills as initialSkills, skillCategories } from './data/skills';
import { experience as initialExperience } from './data/experience';
import { education as initialEducation } from './data/education';
import { achievements as initialAchievements } from './data/achievements';
import { certifications as initialCertifications } from './data/certifications';
import { socials as initialSocials } from './data/socials';

// TypeScript Interfaces
import { Project, Skill, Experience, Education, Achievement, Certification, SocialLink } from './types/types';

export default function App() {
  // Optional Admin Mode (defaults to false for visitors, but fully toggleable in the Navigation bar!)
  const [adminMode, setAdminMode] = useState<boolean>(false);

  // Dynamic Portfolio States
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experienceList, setExperienceList] = useState<Experience[]>(initialExperience);
  const [educationList, setEducationList] = useState<Education[]>(initialEducation);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);

  // ==========================================
  // CRUD Handlers (Design for Future CMS integration)
  // ==========================================

  // Projects CRUD
  const handleAddProject = (newProj: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProj,
      id: `p-${Date.now()}`
    };
    setProjects((prev) => [project, ...prev]);
  };

  const handleEditProject = (updatedProj: Project) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === updatedProj.id ? updatedProj : proj))
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // Skills CRUD
  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    const skill: Skill = {
      ...newSkill,
      id: `s-${Date.now()}`
    };
    setSkills((prev) => [...prev, skill]);
  };

  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  // Experience CRUD
  const handleAddExperience = (newExp: Omit<Experience, 'id'>) => {
    const exp: Experience = {
      ...newExp,
      id: `e-${Date.now()}`
    };
    setExperienceList((prev) => [exp, ...prev]);
  };

  const handleEditExperience = (updatedExp: Experience) => {
    setExperienceList((prev) =>
      prev.map((exp) => (exp.id === updatedExp.id ? updatedExp : exp))
    );
  };

  const handleDeleteExperience = (id: string) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Achievements CRUD
  const handleAddAchievement = (newAch: Omit<Achievement, 'id'>) => {
    const ach: Achievement = {
      ...newAch,
      id: `a-${Date.now()}`
    };
    setAchievements((prev) => [ach, ...prev]);
  };

  const handleEditAchievement = (updatedAch: Achievement) => {
    setAchievements((prev) =>
      prev.map((ach) => (ach.id === updatedAch.id ? updatedAch : ach))
    );
  };

  const handleDeleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((ach) => ach.id !== id));
  };

  // Education CRUD
  const handleAddEducation = (newEdu: Omit<Education, 'id'>) => {
    const edu: Education = {
      ...newEdu,
      id: `edu-${Date.now()}`
    };
    setEducationList((prev) => [edu, ...prev]);
  };

  const handleEditEducation = (updatedEdu: Education) => {
    setEducationList((prev) =>
      prev.map((edu) => (edu.id === updatedEdu.id ? updatedEdu : edu))
    );
  };

  const handleDeleteEducation = (id: string) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  // Certifications CRUD
  const handleAddCertification = (newCert: Omit<Certification, 'id'>) => {
    const cert: Certification = {
      ...newCert,
      id: `cert-${Date.now()}`
    };
    setCertifications((prev) => [cert, ...prev]);
  };

  const handleEditCertification = (updatedCert: Certification) => {
    setCertifications((prev) =>
      prev.map((cert) => (cert.id === updatedCert.id ? updatedCert : cert))
    );
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20">
      
      {/* Navigation header */}
      <Navigation adminMode={adminMode} setAdminMode={setAdminMode} />

      {/* Main portfolio content layout */}
      <main className="pt-[80px]">
        {/* Hero segment */}
        <Hero adminMode={adminMode} />

        {/* About segment */}
        <About adminMode={adminMode} />

        {/* Skills segment */}
        <Skills
          skills={skills}
          categories={skillCategories}
          adminMode={adminMode}
          onAddSkill={handleAddSkill}
          onEditSkill={handleEditSkill}
          onDeleteSkill={handleDeleteSkill}
        />

        {/* Projects segment */}
        <Projects
          projects={projects}
          adminMode={adminMode}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />

        {/* Experience segment */}
        <ExperienceSec
          experienceList={experienceList}
          adminMode={adminMode}
          onAddExperience={handleAddExperience}
          onEditExperience={handleEditExperience}
          onDeleteExperience={handleDeleteExperience}
        />

        {/* Achievements segment */}
        <Achievements
          achievements={achievements}
          adminMode={adminMode}
          onAddAchievement={handleAddAchievement}
          onEditAchievement={handleEditAchievement}
          onDeleteAchievement={handleDeleteAchievement}
        />

        {/* Education segment */}
        <EducationSec
          educationList={educationList}
          adminMode={adminMode}
          onAddEducation={handleAddEducation}
          onEditEducation={handleEditEducation}
          onDeleteEducation={handleDeleteEducation}
        />

        {/* Certifications segment */}
        <Certifications
          certifications={certifications}
          adminMode={adminMode}
          onAddCertification={handleAddCertification}
          onEditCertification={handleEditCertification}
          onDeleteCertification={handleDeleteCertification}
        />

        {/* Contact segment */}
        <Contact />
      </main>

      {/* Footer segment */}
      <Footer socials={socials} />
    </div>
  );
}
