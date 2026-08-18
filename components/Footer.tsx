'use client';

import { Sparkles, ArrowUp } from 'lucide-react';
import ViewTracker from '@/components/ViewTracker';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-dark-bg border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-cyan">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-base block">Tatapudi Anushka</span>
              <span className="text-xs text-gray-400">Computer Science Engineering Student & Aspiring AI/ML Engineer</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-xs text-gray-400">
            <ViewTracker />
            <span>&copy; {new Date().getFullYear()} Tatapudi Anushka. Built with Next.js & Tailwind CSS.</span>
            <a href="/portfolio/admin/login/" className="hover:text-brand-cyan transition-colors underline opacity-70 hover:opacity-100">
              Admin Portal
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full glass-panel border-white/10 text-gray-300 hover:text-white hover:border-brand-500/40 transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
