import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'p1',
    title: "AI-Powered Medical Diagnosis Agent",
    description: "An advanced healthcare assistant using Gemini 2.5 Flash to analyze patient symptoms, generate safe diagnostic reports, and recommend specialist visits with grounded healthcare references.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
    tags: ["GenAI", "Healthcare", "Full-Stack"],
    techStack: ["React", "Express", "@google/genai", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/nishakushwah/ai-med-agent",
    live: "https://ai-med-agent.demo",
    video: "https://youtube.com/watch?v=med-agent-demo",
    status: "Completed",
    date: "May 2026",
    featured: true
  },
  {
    id: 'p2',
    title: "Smart Crop Disease Classifier",
    description: "A machine learning solution for farmers that detects tomato leaf diseases with 98.4% accuracy using a lightweight PyTorch CNN model deployed on a web dashboard.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=800&auto=format&fit=crop&q=60",
    tags: ["Machine Learning", "Computer Vision", "Python"],
    techStack: ["Python", "PyTorch", "React", "Tailwind CSS", "Flask"],
    github: "https://github.com/nishakushwah/crop-classifier",
    live: "https://crop-classifier.demo",
    video: "https://youtube.com/watch?v=crop-classifier-demo",
    status: "Completed",
    date: "Feb 2026",
    featured: true
  },
  {
    id: 'p3',
    title: "Real-time Interactive Whiteboard",
    description: "Collaborative multiplayer vector workspace allowing concurrent drawing, chat, and auto-generated AI shapes via drawing recognition pipelines.",
    image: "https://images.unsplash.com/photo-1540350390147-ad3df4794e11?w=800&auto=format&fit=crop&q=60",
    tags: ["WebSockets", "Canvas", "Collab"],
    techStack: ["React", "Node.js", "Express", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/nishakushwah/collab-board",
    live: "https://collab-board.demo",
    video: "",
    status: "In Progress",
    date: "Active Development",
    featured: false
  },
  {
    id: 'p4',
    title: "Semantic Code Search Engine",
    description: "Indexes open-source code repositories and allows natural language queries by embedding abstract syntax trees (AST) into vector search spaces.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    tags: ["Vector Search", "NLP", "Python"],
    techStack: ["Python", "FastAPI", "React", "Qdrant", "Tailwind CSS"],
    github: "https://github.com/nishakushwah/semantic-code-search",
    live: "",
    video: "",
    status: "Beta",
    date: "Nov 2025",
    featured: false
  }
];
