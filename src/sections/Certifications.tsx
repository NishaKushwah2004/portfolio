import React, { useState } from 'react';
import { Award, Plus, ExternalLink, Calendar, Edit, Trash } from 'lucide-react';
import { motion } from 'motion/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Certification } from '../types/types';

interface CertificationsProps {
  certifications: Certification[];
  adminMode: boolean;
  onAddCertification: (cert: Omit<Certification, 'id'>) => void;
  onEditCertification: (cert: Certification) => void;
  onDeleteCertification: (id: string) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({
  certifications,
  adminMode,
  onAddCertification,
  onEditCertification,
  onDeleteCertification
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');

  const handleOpenAddModal = () => {
    setEditingCert(null);
    setTitle('');
    setIssuer('');
    setDate('');
    setCredentialUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cert: Certification) => {
    setEditingCert(cert);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setDate(cert.date);
    setCredentialUrl(cert.credentialUrl || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim() || !date.trim()) return;

    if (editingCert) {
      onEditCertification({
        id: editingCert.id,
        title,
        issuer,
        date,
        credentialUrl: credentialUrl || undefined
      });
    } else {
      onAddCertification({
        title,
        issuer,
        date,
        credentialUrl: credentialUrl || undefined
      });
    }
    setIsModalOpen(false);
  };

  return (
    <section id="certifications" className="py-24 px-6 bg-surface-container-low border-b border-outline-variant/60">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-label-md text-xs uppercase tracking-widest">Credentials</span>
          <h2 className="text-headline-lg font-bold">Certifications</h2>
          <p className="text-body-md text-secondary max-w-xl mx-auto text-sm">
            Professional certifications, tech specializations, and cloud competency verifications.
          </p>

          {adminMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenAddModal}
              icon={<Plus size={15} />}
              className="mt-4"
            >
              Add Certification
            </Button>
          )}
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-2xl bg-surface max-w-2xl mx-auto">
            <Award className="text-outline text-4xl mb-4 mx-auto opacity-70" size={40} />
            <p className="text-body-lg text-secondary font-medium">No certifications registered.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between group"
              >
                {/* Admin Mode triggers */}
                {adminMode && (
                  <div className="absolute top-3 right-3 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditModal(cert)}
                      className="p-1 bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary rounded-lg transition-all"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteCertification(cert.id)}
                      className="p-1 bg-surface-container-lowest border border-outline-variant hover:border-error hover:text-error rounded-lg transition-all"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                    <Award size={18} />
                  </div>

                  <div>
                    <h3 className="text-headline-sm font-semibold text-on-surface text-base md:text-lg leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-secondary font-medium text-xs mt-1">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/60 text-xs">
                  <div className="flex items-center gap-1 text-secondary font-medium">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-container font-semibold inline-flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? "Edit Certification" : "Add Certification"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="cert-title">
              Certification Title
            </label>
            <input
              id="cert-title"
              type="text"
              required
              placeholder="e.g. AWS Certified Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="cert-issuer">
              Issuer
            </label>
            <input
              id="cert-issuer"
              type="text"
              required
              placeholder="e.g. Amazon Web Services"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="cert-date">
                Date Issued
              </label>
              <input
                id="cert-date"
                type="text"
                required
                placeholder="e.g. Nov 2024"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-label-md text-xs text-on-surface uppercase" htmlFor="cert-url">
                Verification URL
              </label>
              <input
                id="cert-url"
                type="url"
                placeholder="https://..."
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
