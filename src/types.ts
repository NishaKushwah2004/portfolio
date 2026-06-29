export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  techStack: string[];
  github?: string;
  live?: string;
  video?: string;
  status: 'Completed' | 'In Progress' | 'Beta';
  date: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // percentage (0 - 100)
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologiesUsed: string[];
  companyLogo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date?: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface Profile {
  name: string;
  bio: string;
  profilePicture: string;
  resumeLink: string;
  roles: string[];
  interests: string[];
  leadershipExperience?: string[];
  email: string;
  phone: string;
  location: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string; // matches lucide icon names
}

export interface NavigationItem {
  name: string;
  href: string;
}
