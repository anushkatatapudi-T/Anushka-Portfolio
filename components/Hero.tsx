'use client';

import { ArrowRight, Trophy, Download, Linkedin, Mail, Github, Sparkles, Brain, Code } from 'lucide-react';
import { formatImgUrl } from '@/lib/api';

interface HeroProps {
  about: {
    name: string;
    title: string;
    shortBio: string;
    profileImage: string;
  };
  socials: {
    linkedin: string;
    github?: string;
    email: string;
    resumeUrl: string;
  };
}

export default function Hero({ about, socials }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 via-brand-cyan/20 to-purple-500/20 border border-brand-cyan/40 text-brand-cyan text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-cyan/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
              <span>Computer Science Student & Aspiring AI/ML Engineer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-[#66FCF1] via-[#45A29E] to-[#C5C6C7] bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(102,252,241,0.35)]">{about.name || 'Tatapudi Anushka'}</span> 👋
            </h1>

            <p className="text-lg text-[#C5C6C7] max-w-2xl font-normal leading-relaxed">
              {about.shortBio || "I build web applications, explore AI-powered solutions, and continuously improve my technical skills through hands-on projects, competitions, certifications, and real-world experiences."}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#45A29E] to-[#66FCF1] hover:from-[#388D89] hover:to-[#52E8DC] text-[#0B0C10] font-bold text-sm shadow-xl shadow-[#66FCF1]/20 flex items-center space-x-2 hover:scale-[1.03] transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 text-[#0B0C10]" />
              </a>

              <a
                href="#achievements"
                className="px-6 py-3.5 rounded-xl glass-panel border-[#C5C6C7]/20 hover:border-[#66FCF1]/50 text-[#C5C6C7] hover:text-white font-semibold text-sm flex items-center space-x-2 hover:bg-white/10 transition-all shadow-md"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>View My Achievements</span>
              </a>

              <a
                href={socials.resumeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl glass-panel border-[#66FCF1]/40 text-[#66FCF1] hover:bg-[#66FCF1]/15 font-semibold text-sm flex items-center space-x-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex items-center space-x-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">Connect:</span>
              <div className="flex items-center space-x-3">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-panel border-white/10 text-gray-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-panel border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {socials.email && (
                  <a
                    href={`mailto:${socials.email}`}
                    className="p-2.5 rounded-lg glass-panel border-white/10 text-gray-300 hover:text-brand-500 hover:border-brand-500/40 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-cyan via-brand-500 to-indigo-500 opacity-50 group-hover:opacity-80 blur-xl transition duration-500" />
              <div className="relative rounded-3xl overflow-hidden glass-panel border-brand-cyan/40 p-3 shadow-2xl shadow-brand-cyan/20 ring-1 ring-brand-cyan/30">
                <div className="relative h-[460px] w-full rounded-2xl overflow-hidden bg-dark-card flex items-center justify-center">
                  <img
                    src={formatImgUrl(about.profileImage || '/uploads/anushka-profile-knee-studio.jpg')}
                    alt="Tatapudi Anushka"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border-brand-cyan/30 shadow-lg backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-brand-cyan/20 text-brand-cyan ring-1 ring-brand-cyan/40">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">St. Peter's Engineering College</h4>
                        <p className="text-xs text-brand-cyan font-medium">B.Tech CSE (2025–2029)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
