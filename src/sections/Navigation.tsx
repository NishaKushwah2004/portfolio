import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ShieldAlert } from 'lucide-react';
import { navigationItems } from '../data/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ adminMode, setAdminMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple intersection observer behavior for active nav item
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant py-4 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="flex justify-between items-center px-6 max-w-container-max mx-auto w-full">
        {/* Brand name */}
        <div className="text-headline-sm font-bold text-on-surface tracking-tight">
          Nisha Kushwah
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const href = item.href;
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(href)}
                className={`text-body-md transition-colors relative pb-1 font-medium ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Switch and Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Admin Toggle button */}
          <button
            onClick={() => setAdminMode(!adminMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-label-md transition-all ${
              adminMode 
                ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' 
                : 'bg-surface-container-low text-secondary border-outline-variant hover:text-primary hover:border-primary/40'
            }`}
            title={adminMode ? "Switch to Visitor Mode" : "Switch to Admin Mode"}
          >
            {adminMode ? <Shield size={14} className="text-primary animate-pulse" /> : <ShieldAlert size={14} />}
            <span className="hidden sm:inline">{adminMode ? 'Admin Mode: ON' : 'Admin Mode'}</span>
          </button>

          {/* Hire Me button */}
          <button 
            onClick={() => handleNavClick('#contact')}
            className="hidden sm:block bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md text-xs hover:bg-primary-container transition-all active:scale-95 shadow-sm"
          >
            Hire Me
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-secondary hover:text-primary rounded-lg transition-colors border border-outline-variant"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-left text-body-md font-medium py-2 border-b border-outline-variant/40 last:border-none ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-primary' 
                      : 'text-secondary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => handleNavClick('#contact')}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-sm mt-2 text-center"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
