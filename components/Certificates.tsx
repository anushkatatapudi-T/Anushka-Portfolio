'use client';

import { useState } from 'react';
import { Award, ExternalLink, Maximize2, X, Calendar, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { formatImgUrl } from '@/lib/api';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  category: string;
  description: string;
  status: 'published' | 'draft';
}

interface CertificatesProps {
  certificates: Certificate[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & <span className="gradient-text">Badges</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Verified technical certifications from recognized industry issuers.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel rounded-2xl overflow-hidden border-white/10 hover:border-brand-cyan/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-52 w-full overflow-hidden bg-dark-card cursor-pointer group-hover:opacity-90 transition-opacity"
              >
                <img
                  src={formatImgUrl(cert.image || '/uploads/ibm-gen-ai-certificate.png')}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-brand-500/80 text-white backdrop-blur-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-dark-bg/80 border border-white/10 text-brand-cyan backdrop-blur-md">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-300">
                    Issuer: <span className="text-gray-100">{cert.issuer}</span>
                  </p>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-brand-500" />
                    <span>Completed: {cert.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cert.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  {cert.credentialId && (
                    <span className="text-[11px] text-gray-400 font-mono">ID: {cert.credentialId}</span>
                  )}
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-semibold text-brand-cyan hover:text-white flex items-center space-x-1 ml-auto"
                  >
                    <span>View Certificate</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Accessible Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl glass-panel rounded-3xl border-white/20 p-6 space-y-4 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                <p className="text-xs text-gray-400">Issued by {selectedCert.issuer} ({selectedCert.date})</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full glass-panel border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden bg-dark-card border border-white/10">
              <img
                src={formatImgUrl(selectedCert.image)}
                alt={selectedCert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-300">{selectedCert.description}</p>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
