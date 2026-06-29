import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profile } from '../data/profile';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status & UI States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('error', 'Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      // In a real application, the user configures their EmailJS variables.
      // We will read from standard process.env / environment, and support a smooth, graceful simulator
      // so it is delightful to test in the AI Studio preview.
      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
        showToast('success', 'Thank you! Your message has been sent successfully.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        // Fallback simulator for AI Studio preview
        console.warn("EmailJS environment variables not set. Simulating success state for preview.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showToast('success', 'Message simulated successfully! (To enable real delivery, configure EmailJS variables in .env).');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err: any) {
      console.error(err);
      showToast('error', err?.text || 'Failed to send the message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-container-max mx-auto relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border text-sm max-w-md w-[90%] ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                : 'bg-error/10 text-error border-error/20'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="font-medium leading-normal">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-16 space-y-4">
        <span className="text-primary font-label-md text-xs uppercase tracking-widest">Get In Touch</span>
        <h2 className="text-headline-lg font-bold">Contact Me</h2>
        <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
          Have a question or want to work together on a project? Drop a message below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 border border-outline-variant bg-surface-container-lowest rounded-xl space-y-8 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-shadow">
            <h3 className="text-headline-sm font-semibold mb-6">Contact Info</h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-label-md text-xs text-secondary uppercase font-semibold">Email Me</p>
                <a href={`mailto:${profile.email}`} className="text-body-md text-on-surface font-medium hover:text-primary transition-colors text-sm break-all mt-1 block">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-label-md text-xs text-secondary uppercase font-semibold">Call Me</p>
                <a href={`tel:${profile.phone}`} className="text-body-md text-on-surface font-medium hover:text-primary transition-colors text-sm mt-1 block">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-label-md text-xs text-secondary uppercase font-semibold">Location</p>
                <span className="text-body-md text-on-surface font-medium text-sm mt-1 block">
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3 text-xs text-secondary font-medium items-start">
            <Info size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-on-surface mb-0.5">Recruiter Config Guide</p>
              <p className="leading-normal">To wire this up to real mailboxes, add your EmailJS Service, Template, and Public Keys into the environment variables panel.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7">
          <form 
            ref={formRef} 
            onSubmit={handleSendMessage} 
            className="p-8 border border-outline-variant bg-surface-container-lowest rounded-xl space-y-6 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="contact-name">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="contact-email">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="user_subject"
                type="text"
                placeholder="Collaboration Opportunity"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="contact-msg">
                Message *
              </label>
              <textarea
                id="contact-msg"
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              icon={<Send size={15} />}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
};
