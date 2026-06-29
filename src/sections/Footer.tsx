import React from 'react';
import * as Icons from 'lucide-react';
import { SocialLink } from '../types';
import { navigationItems } from '../data/navigation';

interface FooterProps {
  socials: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ socials }) => {
  const currentYear = new Date().getFullYear();

  // Helper to dynamically render Lucide icons by string name
  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent size={18} />;
    }
    return <Icons.Globe size={18} />;
  };

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/60 py-16 px-6">
      <div className="max-w-container-max mx-auto space-y-12">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-headline-sm font-bold text-on-surface tracking-tight">Nisha Kushwah</h3>
            <p className="text-body-md text-secondary text-sm">
              Crafting premium digital solutions with math and code.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Dynamic Socials row */}
          <div className="flex items-center gap-4">
            {socials.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center text-secondary transition-all hover:bg-surface hover:-translate-y-0.5 shadow-sm"
                title={link.platform}
              >
                {renderIcon(link.iconName)}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom row: Copyright info */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-outline-variant/60 gap-4 text-xs text-secondary font-medium">
          <p>© {currentYear} Nisha Kushwah. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
