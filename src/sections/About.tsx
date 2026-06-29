import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Laptop, Zap, Shield, Rocket } from 'lucide-react';
import { profile } from '../data/profile';

interface AboutProps {
  adminMode: boolean;
}

export const About: React.FC<AboutProps> = ({ adminMode }) => {
  return (
    <section 
      id="about" 
      className="py-24 px-6 bg-surface-container-lowest border-y border-outline-variant/60"
    >
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3"
          >
            <div className="p-8 border border-outline-variant rounded-xl space-y-6 bg-surface hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <User size={18} className="text-primary" />
                <h3 className="text-headline-sm font-semibold text-on-surface">About Me</h3>
              </div>
              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                {profile.bio}
              </p>
              
              <div className="space-y-4 pt-4 border-t border-outline-variant/60">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-label-md font-semibold text-secondary">Name</span>
                  <span className="text-body-md font-medium text-on-surface">{profile.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-label-md font-semibold text-secondary">Email</span>
                  <span className="text-body-md font-medium text-on-surface truncate max-w-[180px]" title={profile.email}>
                    {profile.email}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-label-md font-semibold text-secondary">Location</span>
                  <span className="text-body-md font-medium text-on-surface text-right max-w-[180px] truncate" title={profile.location}>
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Focus Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Responsive Design */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 border border-outline-variant rounded-xl hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] bg-surface transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6 text-primary">
                <Laptop size={22} />
              </div>
              <h4 className="text-headline-sm font-semibold mb-3">Responsive Design</h4>
              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                Ensuring your website looks perfect on every screen size, from mobile phones to massive desktop monitors.
              </p>
            </motion.div>

            {/* Card 2: Fast Performance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 border border-outline-variant rounded-xl hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] bg-surface transition-shadow"
            >
              <div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center mb-6 text-on-secondary-fixed-variant">
                <Zap size={22} />
              </div>
              <h4 className="text-headline-sm font-semibold mb-3">Fast Performance</h4>
              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                Optimized code and assets to provide the lightning-fast loading speeds your users expect.
              </p>
            </motion.div>

            {/* Card 3: Secure & Clean */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 border border-outline-variant rounded-xl hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] bg-surface transition-shadow"
            >
              <div className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center mb-6 text-on-tertiary-fixed-variant">
                <Shield size={22} />
              </div>
              <h4 className="text-headline-sm font-semibold mb-3">Secure & Clean</h4>
              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                Writing maintainable, secure, and clean code that adheres to the latest industry standards.
              </p>
            </motion.div>

            {/* Card 4: SEO Ready */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 border border-outline-variant rounded-xl hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] bg-surface transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6 text-primary">
                <Rocket size={22} />
              </div>
              <h4 className="text-headline-sm font-semibold mb-3">SEO Ready</h4>
              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                Building with search engines in mind to help your project reach its full potential online.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
