'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { ExperienceItem } from '@/components/Experience';
import { apiFetch } from '@/lib/api';

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchExp = async () => {
    const res = await apiFetch('/api/portfolio/experience');
    const data = await res.json();
    setExperience(data);
  };

  useEffect(() => {
    fetchExp();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    const method = editingExp.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/experience', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingExp),
    });
    if (res.ok) {
      setEditingExp(null);
      fetchExp();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/experience?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchExp();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Experience</h1>
            <p className="text-xs text-gray-400">Manage organizational positions, roles, and responsibilities.</p>
          </div>
          <button
            onClick={() =>
              setEditingExp({
                organization: '',
                position: '',
                startDate: '',
                endDate: 'Present',
                description: '',
                responsibilities: [],
                logo: '',
                order: experience.length + 1,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>

        {editingExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <form onSubmit={handleSave} className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white">{editingExp.id ? 'Edit Experience' : 'Add Experience'}</h3>
                <button type="button" onClick={() => setEditingExp(null)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Position / Title</label>
                  <input
                    type="text"
                    required
                    value={editingExp.position || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                    placeholder="Associate — Projects Team"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Organization</label>
                  <input
                    type="text"
                    required
                    value={editingExp.organization || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    placeholder="SPECIANCIENS"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <ImageUploader
                value={editingExp.logo || ''}
                onChange={(url) => setEditingExp({ ...editingExp, logo: url })}
                label="Organization Logo / Photograph"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="2025"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">End Date</label>
                  <input
                    type="text"
                    value={editingExp.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder="Present"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={2}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Responsibilities (One per line)</label>
                <textarea
                  rows={4}
                  value={editingExp.responsibilities?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      responsibilities: e.target.value.split('\n').filter((r) => r.trim().length > 0),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setEditingExp(null)} className="text-xs text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold">
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {experience.map((exp) => (
                <tr key={exp.id}>
                  <td className="px-6 py-4 font-bold text-white">{exp.position}</td>
                  <td className="px-6 py-4 text-brand-cyan">{exp.organization}</td>
                  <td className="px-6 py-4 font-mono">{exp.startDate} – {exp.endDate}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingExp(exp)} className="p-1.5 rounded-lg bg-white/10 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(exp.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this experience entry" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
