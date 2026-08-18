'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import { Save, CheckCircle2, Linkedin, Github, Mail, FileText } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function AdminSocialsPage() {
  const [socials, setSocials] = useState({
    linkedin: '',
    github: '',
    email: '',
    resumeUrl: '',
  });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    apiFetch('/api/portfolio/socials')
      .then((res) => res.json())
      .then((data) => setSocials(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    const res = await apiFetch('/api/portfolio/socials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(socials),
    });

    setSaving(false);
    if (res.ok) {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Social Links & Resume</h1>
            <p className="text-xs text-gray-400">Update verified contact channels, LinkedIn, GitHub, and resume link.</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Social links updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl border-white/10">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-2">
              <Linkedin className="w-4 h-4 text-brand-cyan" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="url"
              required
              value={socials.linkedin || ''}
              onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
              placeholder="https://www.linkedin.com/in/..."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-2">
              <Github className="w-4 h-4 text-white" />
              <span>GitHub Profile URL (Optional - leave empty if no public account)</span>
            </label>
            <input
              type="url"
              value={socials.github || ''}
              onChange={(e) => setSocials({ ...socials, github: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-brand-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={socials.email || ''}
              onChange={(e) => setSocials({ ...socials, email: e.target.value })}
              placeholder="anushkatatapudi@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resume File URL / Document Path</span>
            </label>
            <input
              type="text"
              required
              value={socials.resumeUrl || ''}
              onChange={(e) => setSocials({ ...socials, resumeUrl: e.target.value })}
              placeholder="/uploads/resume-anushka-tatapudi.pdf"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-brand-500/25"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Social Links'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
