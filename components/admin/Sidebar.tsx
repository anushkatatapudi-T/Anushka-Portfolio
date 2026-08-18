'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  Award,
  Trophy,
  Image as ImageIcon,
  GraduationCap,
  Briefcase,
  User,
  Share2,
  LogOut,
  Sparkles,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Messages', href: '/admin/dashboard/messages', icon: Mail },
    { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderGit2 },
    { name: 'Skills', href: '/admin/dashboard/skills', icon: Wrench },
    { name: 'Certificates', href: '/admin/dashboard/certificates', icon: Award },
    { name: 'Achievements', href: '/admin/dashboard/achievements', icon: Trophy },
    { name: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Education', href: '/admin/dashboard/education', icon: GraduationCap },
    { name: 'Experience', href: '/admin/dashboard/experience', icon: Briefcase },
    { name: 'About', href: '/admin/dashboard/about', icon: User },
    { name: 'Social Links', href: '/admin/dashboard/socials', icon: Share2 },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/portfolio/api/admin/logout', { method: 'POST' });
    } catch {
      await fetch('/api/admin/logout', { method: 'POST' });
    }
    window.location.href = '/portfolio/admin/login';
  };

  return (
    <aside className="w-64 glass-panel border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 bg-dark-card z-30">
      <div className="p-6 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-cyan p-0.5 shadow-md">
            <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Admin CMS</h2>
            <span className="text-[10px] text-gray-400 font-mono">Portfolio Control</span>
          </div>
        </div>

        {/* View Live Portfolio Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-brand-cyan hover:bg-white/10 transition-colors font-medium"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
