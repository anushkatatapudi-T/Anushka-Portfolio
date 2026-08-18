'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, ExternalLink, Github, Save, X, Check, FolderGit2 } from 'lucide-react';
import { Project } from '@/components/Projects';
import { apiFetch } from '@/lib/api';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const res = await apiFetch('/api/portfolio/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const method = editingProject.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProject),
    });

    if (res.ok) {
      setEditingProject(null);
      fetchProjects();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/projects?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchProjects();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Projects</h1>
            <p className="text-xs text-gray-400">Add, edit, publish, or remove portfolio projects.</p>
          </div>
          <button
            onClick={() =>
              setEditingProject({
                title: '',
                type: 'Web Application',
                shortDescription: '',
                fullDescription: '',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                image: '',
                liveUrl: '',
                githubUrl: '',
                contribution: '',
                features: [],
                challenges: [],
                learned: [],
                status: 'published',
                order: projects.length + 1,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Project Form Modal */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <form onSubmit={handleSave} className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">
                  {editingProject.id ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button type="button" onClick={() => setEditingProject(null)} className="p-1 text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Project Type</label>
                  <input
                    type="text"
                    required
                    value={editingProject.type || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <ImageUploader
                value={editingProject.image || ''}
                onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                label="Project Screenshot / Banner"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Short Description</label>
                <input
                  type="text"
                  required
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Full Case Study Description</label>
                <textarea
                  rows={3}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Live Website Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">GitHub Repository URL (Optional)</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">My Contribution</label>
                <textarea
                  rows={2}
                  value={editingProject.contribution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, contribution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.status === 'published'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.checked ? 'published' : 'draft',
                      })
                    }
                    className="rounded bg-dark-bg border-white/20 text-brand-500 focus:ring-0"
                  />
                  <span>Publish on Public Portfolio</span>
                </label>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Project List Table */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Technologies</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{proj.title}</td>
                  <td className="px-6 py-4 text-brand-cyan">{proj.type}</td>
                  <td className="px-6 py-4">{proj.technologies?.join(', ')}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        proj.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(proj.id)}
                      className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal
          isOpen={!!deletingId}
          title="this project"
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      </main>
    </div>
  );
}
