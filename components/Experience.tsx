'use client';

import { Briefcase, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { formatImgUrl } from '@/lib/api';

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  logo?: string;
  order: number;
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Organizational Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Roles & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Active team involvement and project management roles.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border-white/10 hover:border-brand-500/40 transition-all duration-300 space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <img
                      src={formatImgUrl(exp.logo || '/uploads/specanciens-award.png')}
                      alt={exp.organization}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                    <p className="text-sm text-brand-cyan font-medium flex items-center space-x-1.5 mt-0.5">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.organization}</span>
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" />
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
                    Verified Responsibilities & Initiatives:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 leading-normal"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
