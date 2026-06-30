import { Profile } from '../types/types';
import { images } from '../assets/images';
import resume from "../assets/resume/Nisha_Kushwah_Resume.pdf";

export const profile: Profile = {
  name: "Nisha Kushwah",
  bio: "I'm a passionate Computer Science Engineering student, Full-Stack Developer, and aspiring AI Engineer who enjoys building intelligent, scalable, and user-focused digital solutions. My interests span Web Development, Artificial Intelligence, Machine Learning, Deep Learning, Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and Agentic AI.",
  profilePicture: images.profile.photo,
  resumeLink: resume,
  roles: [
    "Computer Science Student",
    "Software Engineer",
    "AI/ML Enthusiast",
    "Full Stack Developer"
  ],
  interests: [
    "Artificial Intelligence & Machine Learning",
    "Responsive Web Design",
    "Data Structures & Algorithms",
    "Generative AI, Agentic AI and Automations"
  ],
  leadershipExperience: [
    "National Cadet Corps (NCC) - Cadet Captain (Under Officer)"
  ],
  email: "2004nishakushwah@gmail.com",
  phone: "+91 74711 01731",
  location: "Madhya Pradesh, India"
};
