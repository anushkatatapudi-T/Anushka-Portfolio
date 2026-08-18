'use client';

import { GraduationCap, Calendar, Award, Building } from 'lucide-react';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
  order: number;
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Academic degree, intermediate coursework, and secondary school achievements.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="glass-panel rounded-2xl p-6 border-white/10 hover:border-brand-cyan/40 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-cyan text-xs font-bold border border-brand-500/30">
                    {edu.degree}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-brand-500" />
                    <span>{edu.startYear} – {edu.endYear}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {edu.institution}
                </h3>

                <p className="text-sm font-semibold text-gray-300">
                  {edu.specialization}
                </p>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end justify-center bg-white/5 p-4 rounded-xl border border-white/5 min-w-[140px]">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Grade / Standing</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
