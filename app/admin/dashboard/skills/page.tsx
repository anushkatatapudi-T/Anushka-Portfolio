'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, Wrench } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  order: number;
  visible: boolean;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSkills = async () => {
    const res = await apiFetch('/api/portfolio/skills');
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    const method = editingSkill.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/skills', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSkill),
    });
    if (res.ok) {
      setEditingSkill(null);
      fetchSkills();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/skills?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchSkills();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Skills</h1>
            <p className="text-xs text-gray-400">Add, edit, organize categories, or reorder verified skills.</p>
          </div>
          <button
            onClick={() =>
              setEditingSkill({
                name: '',
                category: 'Programming',
                icon: 'Code2',
                order: skills.length + 1,
                visible: true,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>

        {/* Skill Edit Modal */}
        {editingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <form onSubmit={handleSave} className="w-full max-w-md glass-panel rounded-3xl p-6 space-y-4 border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">{editingSkill.id ? 'Edit Skill' : 'Add Skill'}</h3>
                <button type="button" onClick={() => setEditingSkill(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. Python, React"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Category</label>
                <input
                  type="text"
                  required
                  value={editingSkill.category || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  placeholder="Programming / Web Development / Frameworks / Tools"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Lucide Icon Symbol</label>
                  <input
                    type="text"
                    value={editingSkill.icon || 'Code2'}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Display Order</label>
                  <input
                    type="number"
                    value={editingSkill.order || 1}
                    onChange={(e) => setEditingSkill({ ...editingSkill, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={editingSkill.visible ?? true}
                  onChange={(e) => setEditingSkill({ ...editingSkill, visible: e.target.checked })}
                  className="rounded bg-dark-bg border-white/20 text-brand-500"
                />
                <span>Visible on Portfolio</span>
              </label>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setEditingSkill(null)} className="text-xs font-semibold text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills Table */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Skill Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Icon Symbol</th>
                <th className="px-6 py-4">Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{skill.name}</td>
                  <td className="px-6 py-4 text-brand-cyan">{skill.category}</td>
                  <td className="px-6 py-4 font-mono">{skill.icon}</td>
                  <td className="px-6 py-4">
                    {skill.visible ? (
                      <span className="text-emerald-400 flex items-center space-x-1 font-semibold">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible</span>
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center space-x-1">
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingSkill(skill)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(skill.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this skill" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
