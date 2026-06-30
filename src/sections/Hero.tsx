import React from "react";
import { motion } from "motion/react";
import { Download, ArrowRight, Code, Shield } from "lucide-react";
import { profile } from "../data/profile";

interface HeroProps {
  adminMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ adminMode }) => {
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center py-20 px-6 max-w-container-max mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Left Side: Content */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider text-xs border border-outline-variant/60"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display-lg leading-tight md:text-display-lg text-headline-lg-mobile text-on-background font-black"
            >
              Hi, I'm{" "}
<span className="text-primary text-glow transition-all duration-300">
  {profile.name}
</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-headline-md text-secondary font-semibold"
            >
              {profile.roles.join(" • ")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-body-lg text-on-surface-variant max-w-xl"
            >
              {profile.bio}
            </motion.p>
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href={profile.resumeLink}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-xs flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all group"
            >
              <span>Download CV</span>
              <Download
                size={15}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </motion.a>
            <motion.button
              onClick={handleScrollToProjects}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="border border-primary text-primary px-8 py-4 rounded-xl font-label-md text-xs hover:bg-surface-container-low transition-all"
            >
              View Work
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side: Image illustration and dynamic stats badges */}
        <div className="md:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-square max-w-md mx-auto"
          >
            {/* Pulsing radial background accent */}
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-slow" />

            {/* floating code badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-surface-container-high border border-outline-variant rounded-2xl flex items-center justify-center shadow-md"
            >
              <Code size={36} className="text-primary" />
            </motion.div>


            {/* Main Avatar Drawing */}
            <div className="w-full h-full rounded-full border-8 border-surface-container-lowest overflow-hidden shadow-2xl bg-surface-variant flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={profile.profilePicture}
                alt={profile.name}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bounce-down indicator arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] uppercase font-label-md tracking-widest text-secondary">
          Scroll
        </span>
        <ArrowRight size={14} className="rotate-90 text-secondary" />
      </div>
    </section>
  );
};
