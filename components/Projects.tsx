'use client';

import { useState } from 'react';
import { Rocket, ExternalLink, Github, ChevronRight, X, CheckCircle, Lightbulb, AlertTriangle, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { formatImgUrl } from '@/lib/api';

export interface Project {
  id: string;
  title: string;
  type: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  contribution: string;
  features: string[];
  challenges: string[];
  learned: string[];
  status: 'published' | 'draft';
  order: number;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative bg-dark-bg/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects & <span className="gradient-text">Applications</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Hands-on web development applications and institutional platforms.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden border-white/10 hover:border-brand-500/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-dark-card">
                <img
                  src={formatImgUrl(project.image || '/uploads/quantix-presentation-slide.png')}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/90 text-white backdrop-blur-md shadow-md">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-md shadow-brand-500/20"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl glass-panel border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-brand-cyan hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detailed Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-4xl glass-panel rounded-3xl border-white/20 p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-cyan border border-brand-500/30">
                  {selectedProject.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full glass-panel border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Sections */}
            <div className="space-y-6">
              
              {/* Image Preview */}
              <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-dark-card border border-white/10">
                <img
                  src={formatImgUrl(selectedProject.image || '/uploads/quantix-presentation-slide.png')}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span>Overview & Idea</span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Features */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Key Features</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contribution */}
              {selectedProject.contribution && (
                <div className="space-y-2 bg-brand-500/10 p-4 rounded-xl border border-brand-500/20">
                  <h4 className="text-sm font-bold text-brand-cyan uppercase tracking-wider">My Contribution</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">{selectedProject.contribution}</p>
                </div>
              )}

              {/* Challenges & Learned */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                  <div className="space-y-2 glass-panel p-4 rounded-xl border-white/10">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Challenges</span>
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.learned && selectedProject.learned.length > 0 && (
                  <div className="space-y-2 glass-panel p-4 rounded-xl border-white/10">
                    <h4 className="text-sm font-bold text-brand-cyan flex items-center space-x-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>What I Learned</span>
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      {selectedProject.learned.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-4">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 transition-colors"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
