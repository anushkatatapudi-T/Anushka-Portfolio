'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X, Trophy } from 'lucide-react';
import { Achievement } from '@/components/Achievements';
import { apiFetch } from '@/lib/api';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAch, setEditingAch] = useState<Partial<Achievement> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAchievements = async () => {
    const res = await apiFetch('/api/portfolio/achievements');
    const data = await res.json();
    setAchievements(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch) return;
    const method = editingAch.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/achievements', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingAch),
    });
    if (res.ok) {
      setEditingAch(null);
      fetchAchievements();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/achievements?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchAchievements();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Achievements</h1>
            <p className="text-xs text-gray-400">Add, edit, upload photo, or manage awards & competition milestones.</p>
          </div>
          <button
            onClick={() =>
              setEditingAch({
                title: '',
                event: '',
                organization: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                image: '',
                category: 'Awards',
                status: 'published',
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Achievement</span>
          </button>
        </div>

        {/* Achievement Edit Form Modal */}
        {editingAch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <form onSubmit={handleSave} className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white">{editingAch.id ? 'Edit Achievement' : 'Add New Achievement'}</h3>
                <button type="button" onClick={() => setEditingAch(null)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Achievement Title</label>
                <input
                  type="text"
                  required
                  value={editingAch.title || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                  placeholder="e.g. 3rd Prize — Quantix"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Event / Competition Name</label>
                  <input
                    type="text"
                    required
                    value={editingAch.event || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, event: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Organization / Host</label>
                  <input
                    type="text"
                    required
                    value={editingAch.organization || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <ImageUploader
                value={editingAch.image || ''}
                onChange={(url) => setEditingAch({ ...editingAch, image: url })}
                label="Achievement / Event Photograph"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Date</label>
                  <input
                    type="date"
                    required
                    value={editingAch.date || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <input
                    type="text"
                    value={editingAch.category || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, category: e.target.value })}
                    placeholder="Awards / Recognition / Hackathons"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  value={editingAch.description || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAch.status === 'published'}
                    onChange={(e) => setEditingAch({ ...editingAch, status: e.target.checked ? 'published' : 'draft' })}
                    className="rounded bg-dark-bg border-white/20 text-brand-500"
                  />
                  <span>Publish on Portfolio</span>
                </label>

                <div className="flex items-center space-x-3">
                  <button type="button" onClick={() => setEditingAch(null)} className="text-xs font-semibold text-gray-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center space-x-1.5">
                    <Save className="w-4 h-4" />
                    <span>Save Achievement</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Achievements Table */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {achievements.map((ach) => (
                <tr key={ach.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{ach.title}</td>
                  <td className="px-6 py-4 text-brand-cyan">{ach.event}</td>
                  <td className="px-6 py-4">{ach.category}</td>
                  <td className="px-6 py-4 font-mono">{ach.date}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingAch(ach)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(ach.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this achievement" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
