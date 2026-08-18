'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { EducationItem } from '@/components/Education';
import { apiFetch } from '@/lib/api';

export default function AdminEducationPage() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [editingEdu, setEditingEdu] = useState<Partial<EducationItem> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEdu = async () => {
    const res = await apiFetch('/api/portfolio/education');
    const data = await res.json();
    setEducation(data);
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    const method = editingEdu.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/education', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingEdu),
    });
    if (res.ok) {
      setEditingEdu(null);
      fetchEdu();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/education?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchEdu();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Education</h1>
            <p className="text-xs text-gray-400">Add, edit, or reorder academic history.</p>
          </div>
          <button
            onClick={() =>
              setEditingEdu({
                institution: '',
                degree: '',
                specialization: '',
                startYear: '',
                endYear: '',
                grade: '',
                description: '',
                order: education.length + 1,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>

        {editingEdu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <form onSubmit={handleSave} className="w-full max-w-xl glass-panel rounded-3xl p-6 space-y-4 border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">{editingEdu.id ? 'Edit Education' : 'Add Education'}</h3>
                <button type="button" onClick={() => setEditingEdu(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Institution Name</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="e.g. St. Peter's Engineering College"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Degree</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.degree || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    placeholder="e.g. B.Tech"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Specialization</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.specialization || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, specialization: e.target.value })}
                    placeholder="Computer Science Engineering"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Start Year</label>
                  <input
                    type="text"
                    value={editingEdu.startYear || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">End Year</label>
                  <input
                    type="text"
                    value={editingEdu.endYear || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Grade / Percentage</label>
                  <input
                    type="text"
                    value={editingEdu.grade || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  value={editingEdu.description || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setEditingEdu(null)} className="text-xs text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold">
                  Save Education
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Degree</th>
                <th className="px-6 py-4">Years</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {education.map((edu) => (
                <tr key={edu.id}>
                  <td className="px-6 py-4 font-bold text-white">{edu.institution}</td>
                  <td className="px-6 py-4 text-brand-cyan">{edu.degree} — {edu.specialization}</td>
                  <td className="px-6 py-4">{edu.startYear} – {edu.endYear}</td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">{edu.grade}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingEdu(edu)} className="p-1.5 rounded-lg bg-white/10 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(edu.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this education record" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
