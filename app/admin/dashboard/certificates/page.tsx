'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X, Award } from 'lucide-react';
import { Certificate } from '@/components/Certificates';
import { apiFetch } from '@/lib/api';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCertificates = async () => {
    const res = await apiFetch('/api/portfolio/certificates');
    const data = await res.json();
    setCertificates(data);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    const method = editingCert.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/certificates', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCert),
    });
    if (res.ok) {
      setEditingCert(null);
      fetchCertificates();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/certificates?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchCertificates();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Certificates</h1>
            <p className="text-xs text-gray-400">Add, edit, upload image, or publish verified certificates.</p>
          </div>
          <button
            onClick={() =>
              setEditingCert({
                title: '',
                issuer: '',
                date: new Date().toISOString().split('T')[0],
                credentialId: '',
                credentialUrl: '',
                image: '',
                category: 'Certification',
                description: '',
                status: 'published',
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        </div>

        {/* Certificate Form Modal */}
        {editingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <form onSubmit={handleSave} className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white">{editingCert.id ? 'Edit Certificate' : 'Add New Certificate'}</h3>
                <button type="button" onClick={() => setEditingCert(null)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Introduction to Generative AI"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Issuer / Organization</label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuer || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    placeholder="e.g. IBM SkillsBuild"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Completion Date</label>
                  <input
                    type="date"
                    required
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <ImageUploader
                value={editingCert.image || ''}
                onChange={(url) => setEditingCert({ ...editingCert, image: url })}
                label="Certificate Image / Badge Upload"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={editingCert.credentialId || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <input
                    type="text"
                    value={editingCert.category || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCert.status === 'published'}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.checked ? 'published' : 'draft' })}
                    className="rounded bg-dark-bg border-white/20 text-brand-500"
                  />
                  <span>Publish on Public Portfolio</span>
                </label>

                <div className="flex items-center space-x-3">
                  <button type="button" onClick={() => setEditingCert(null)} className="text-xs font-semibold text-gray-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center space-x-1.5">
                    <Save className="w-4 h-4" />
                    <span>Save Certificate</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Certificates Table */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Issuer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{cert.title}</td>
                  <td className="px-6 py-4 text-brand-cyan">{cert.issuer}</td>
                  <td className="px-6 py-4 font-mono">{cert.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingCert(cert)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(cert.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this certificate" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
