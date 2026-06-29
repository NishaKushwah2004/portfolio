import { Experience } from '../types';

export const experience: Experience[] = [
  {
    id: 'e1',
    company: "AI Innovation Labs",
    role: "Generative AI Developer Intern",
    duration: "Jan 2026 - Present",
    location: "Remote / Bangalore, India",
    description: "Spearheaded integration of multimodal generative models into production client workflows, automating data extraction and conversational analysis.",
    responsibilities: [
      "Designed and implemented secure server-side API proxy routes for Gemini SDK integrating with Express backend.",
      "Optimized custom prompt architectures, reducing token utilization by 23% while improving accuracy.",
      "Developed high-fidelity, interactive React widgets utilizing Framer Motion for natural-feeling streaming model output displays."
    ],
    technologiesUsed: ["React", "TypeScript", "Node.js", "@google/genai", "Tailwind CSS"],
    companyLogo: ""
  },
  {
    id: 'e2',
    company: "Zenith Software Systems",
    role: "Full Stack Engineer Intern",
    duration: "Aug 2025 - Dec 2025",
    location: "Bhopal, India",
    description: "Built and optimized user-facing and backend architectures for highly responsive web applications.",
    responsibilities: [
      "Collaborated on refactoring a legacy dashboard into a responsive React SPA with Tailwind CSS, improving lighthouse performance scores from 65 to 94.",
      "Developed a robust client-side caching engine reducing overall DB reads by 40%.",
      "Integrated secure authentication protocols and dynamic input verification modules for external contact widgets."
    ],
    technologiesUsed: ["React", "JavaScript", "Express", "PostgreSQL", "Tailwind CSS"],
    companyLogo: ""
  }
];
