import { getDbData } from '@/lib/db';
import Sidebar from '@/components/admin/Sidebar';
import Link from 'next/link';
import { FolderGit2, Wrench, Award, Trophy, Image as ImageIcon, GraduationCap, Eye, ArrowRight, Mail } from 'lucide-react';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const data = getDbData();

  const stats = [
    { title: 'Received Messages', count: data.messages?.length || 0, href: '/admin/dashboard/messages', icon: Mail, color: 'from-cyan-500 to-blue-600' },
    { title: 'Total Visitors / Views', count: data.views?.count || 0, href: '#', icon: Eye, color: 'from-teal-500 to-emerald-600' },
    { title: 'Total Projects', count: data.projects.length, href: '/admin/dashboard/projects', icon: FolderGit2, color: 'from-blue-500 to-indigo-600' },
    { title: 'Total Skills', count: data.skills.length, href: '/admin/dashboard/skills', icon: Wrench, color: 'from-emerald-500 to-teal-600' },
    { title: 'Certificates', count: data.certificates.length, href: '/admin/dashboard/certificates', icon: Award, color: 'from-amber-500 to-orange-600' },
    { title: 'Achievements', count: data.achievements.length, href: '/admin/dashboard/achievements', icon: Trophy, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Overview Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, Tatapudi Anushka. Manage your entire portfolio dynamically.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="glass-panel rounded-3xl p-6 border-white/10 hover:border-brand-500/40 transition-all duration-300 group flex items-center justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">{stat.title}</span>
                  <span className="text-4xl font-extrabold text-white group-hover:text-brand-cyan transition-colors">
                    {stat.count}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${stat.color} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Management Links */}
        <div className="glass-panel rounded-3xl p-6 border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white">Content Management Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/dashboard/messages"
              className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 hover:border-brand-cyan flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>View Received Messages</span>
              <ArrowRight className="w-4 h-4 text-brand-cyan" />
            </Link>
            <Link
              href="/admin/dashboard/projects"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/dashboard/skills"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Manage Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/dashboard/certificates"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Manage Certificates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/dashboard/achievements"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Manage Achievements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/dashboard/gallery"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Manage Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/dashboard/about"
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 flex items-center justify-between text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Edit Bio & Profile Info</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
