'use client';

import { User, Code2, Brain, Terminal, Compass, Award, Users, BookOpen } from 'lucide-react';

interface AboutProps {
  about: {
    fullBio: string;
    careerGoal: string;
    currentInterests: string[];
  };
}

export default function About({ about }: AboutProps) {
  const highlightPoints = [
    { icon: Code2, title: 'Web Development', desc: 'Designing & building practical web applications using front-end technologies.' },
    { icon: Brain, title: 'AI & ML Exploration', desc: 'Deeply interested in Artificial Intelligence and Machine Learning solutions.' },
    { icon: Users, title: 'Team Collaboration', desc: 'Associate member of SPECIANCIENS Projects Team supporting alumni-student initiatives.' },
    { icon: Award, title: 'Technical Competitions', desc: 'Active participant in hackathons, trivia quizzes, and presentation symposiums.' },
  ];

  return (
    <section id="about" className="py-20 relative bg-dark-bg/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Passionate Developer & <span className="gradient-text">Problem Solver</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Bridging computer science fundamentals with hands-on application development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Bio Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-brand-cyan" />
              <span>Background & Introduction</span>
            </h3>

            <p className="text-gray-300 text-base leading-relaxed">
              {about.fullBio || "I am a Computer Science Engineering student at St. Peter's Engineering College (2025–2029) driven by a passion for Web Development, Python programming, and Artificial Intelligence. Through active involvement in technical events, hackathons, and project teams like SPECIANCIENS, I focus on solving practical problems, collaborating with peers, and building impactful digital applications."}
            </p>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-3 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-brand-500" />
                <span>Currently Exploring & Learning</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {(about.currentInterests || ['Python', 'Artificial Intelligence', 'Machine Learning', 'Web Development']).map((interest) => (
                  <span
                    key={interest}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-cyan text-xs font-medium hover:bg-brand-500/20 transition-colors"
                  >
                    🚀 {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Feature Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="glass-panel p-5 rounded-xl border-white/10 hover:border-brand-500/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-cyan mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{point.title}</h4>
                  <p className="text-xs text-gray-400 leading-normal">{point.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
