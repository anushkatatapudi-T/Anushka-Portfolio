'use client';

import { Trophy, Calendar, Award, Sparkles, Building2 } from 'lucide-react';
import { formatImgUrl } from '@/lib/api';
import Image from 'next/image';

export interface Achievement {
  id: string;
  title: string;
  event: string;
  organization: string;
  description: string;
  date: string;
  image: string;
  category: string;
  status: 'published' | 'draft';
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-20 relative bg-dark-bg/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Competitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Awards, contest results, hackathons, and technical honors.
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="mb-16 glass-panel rounded-3xl p-6 sm:p-8 border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>Achievements Timeline</span>
          </h3>

          <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-8 pl-6">
            {achievements.map((item, idx) => (
              <div key={item.id} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-500 border-4 border-dark-bg group-hover:scale-125 transition-transform" />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono text-brand-cyan">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-medium">{item.organization} — {item.event}</p>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="glass-panel rounded-2xl p-6 border-white/10 hover:border-yellow-500/40 transition-all duration-300 flex flex-col sm:flex-row gap-6 group"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-full w-full sm:w-44 rounded-xl overflow-hidden bg-dark-card flex-shrink-0 border border-white/10">
                <img
                  src={formatImgUrl(ach.image || '/uploads/quantix-3rd-prize.png')}
                  alt={ach.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    {ach.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{ach.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {ach.title}
                </h3>

                <p className="text-xs font-semibold text-brand-cyan">
                  {ach.event}
                </p>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {ach.description}
                </p>

                <p className="text-[11px] text-gray-400 font-medium pt-1">
                  Org: {ach.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
