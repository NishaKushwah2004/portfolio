import { Skill } from '../types';

export const skills: Skill[] = [
  // Programming Languages
  { id: 's1', name: 'Python', category: 'Programming Languages', proficiency: 90 },
  { id: 's2', name: 'JavaScript', category: 'Programming Languages', proficiency: 85 },
  { id: 's3', name: 'TypeScript', category: 'Programming Languages', proficiency: 80 },
  { id: 's4', name: 'C++', category: 'Programming Languages', proficiency: 75 },
  { id: 's5', name: 'Java', category: 'Programming Languages', proficiency: 70 },
  
  // Frontend
  { id: 's6', name: 'React', category: 'Frontend', proficiency: 85 },
  { id: 's7', name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
  { id: 's8', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95 },
  
  // Backend & Databases
  { id: 's9', name: 'Node.js', category: 'Backend', proficiency: 80 },
  { id: 's10', name: 'Express', category: 'Backend', proficiency: 80 },
  { id: 's11', name: 'PostgreSQL', category: 'Databases', proficiency: 75 },
  { id: 's12', name: 'MongoDB', category: 'Databases', proficiency: 70 },
  
  // AI & Machine Learning
  { id: 's13', name: 'Machine Learning (Scikit-Learn)', category: 'Artificial Intelligence', proficiency: 80 },
  { id: 's14', name: 'Deep Learning (PyTorch)', category: 'Artificial Intelligence', proficiency: 75 },
  { id: 's15', name: 'Generative AI (Gemini SDK)', category: 'Artificial Intelligence', proficiency: 85 },
  
  // Developer Tools
  { id: 's16', name: 'Git & GitHub', category: 'Developer Tools', proficiency: 90 },
  { id: 's17', name: 'Docker', category: 'Developer Tools', proficiency: 70 },
  { id: 's18', name: 'VS Code', category: 'Developer Tools', proficiency: 95 }
];

export const skillCategories = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Artificial Intelligence',
  'Developer Tools'
];
