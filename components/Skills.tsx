'use client';

import { useState } from 'react';
import { Wrench, Code2, FileCode, Palette, Terminal, Atom, Cpu, Table, Database, GitBranch, Sparkles } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  order: number;
  visible: boolean;
}

interface SkillsProps {
  skills: Skill[];
}

const iconMap: Record<string, any> = {
  Code2,
  FileCode,
  Palette,
  Terminal,
  Atom,
  Cpu,
  Table,
  Database,
  GitBranch,
};

export default function Skills({ skills }: SkillsProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Languages, frameworks, web technologies, and developer tools.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'glass-panel text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'glass-panel text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={skill.id}
                className="glass-panel p-5 rounded-2xl border-white/10 hover:border-brand-cyan/40 hover:bg-white/[0.03] transition-all duration-300 group flex items-center space-x-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-500/20 to-brand-cyan/20 border border-brand-500/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-brand-cyan transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">{skill.category}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
