'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import { Save, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function AdminAboutPage() {
  const [about, setAbout] = useState({
    name: '',
    title: '',
    shortBio: '',
    fullBio: '',
    profileImage: '',
    careerGoal: '',
    currentInterests: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    apiFetch('/api/portfolio/about')
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    const res = await apiFetch('/api/portfolio/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(about),
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
            <h1 className="text-3xl font-extrabold text-white">Edit Profile & Bio</h1>
            <p className="text-xs text-gray-400">Update personal statement, intro, goals, and interests.</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile info updated successfully! Changes are live on public website.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 max-w-4xl border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Full Name</label>
              <input
                type="text"
                required
                value={about.name || ''}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Title / Subtitle</label>
              <input
                type="text"
                required
                value={about.title || ''}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <ImageUploader
            value={about.profileImage || ''}
            onChange={(url) => setAbout({ ...about, profileImage: url })}
            label="Hero Profile Photograph"
          />

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Short Introduction (Hero Section)</label>
            <textarea
              rows={2}
              required
              value={about.shortBio || ''}
              onChange={(e) => setAbout({ ...about, shortBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Full Bio (About Section)</label>
            <textarea
              rows={4}
              required
              value={about.fullBio || ''}
              onChange={(e) => setAbout({ ...about, fullBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Career Goal</label>
              <input
                type="text"
                value={about.careerGoal || ''}
                onChange={(e) => setAbout({ ...about, careerGoal: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Currently Exploring Tags (Comma Separated)</label>
              <input
                type="text"
                value={about.currentInterests?.join(', ') || ''}
                onChange={(e) =>
                  setAbout({
                    ...about,
                    currentInterests: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-brand-500/25"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
