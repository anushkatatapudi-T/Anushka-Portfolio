'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ImageUploader from '@/components/admin/ImageUploader';
import DeleteModal from '@/components/admin/DeleteModal';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { GalleryItem } from '@/components/Gallery';
import { apiFetch } from '@/lib/api';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchGallery = async () => {
    const res = await apiFetch('/api/portfolio/gallery');
    const data = await res.json();
    setGallery(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const method = editingItem.id ? 'PUT' : 'POST';
    const res = await apiFetch('/api/portfolio/gallery', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem),
    });
    if (res.ok) {
      setEditingItem(null);
      fetchGallery();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await apiFetch(`/api/portfolio/gallery?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      setDeletingId(null);
      fetchGallery();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Manage Photo Gallery</h1>
            <p className="text-xs text-gray-400">Upload photos, set captions & categories for Beyond the Classroom gallery.</p>
          </div>
          <button
            onClick={() =>
              setEditingItem({
                title: '',
                category: 'Events',
                image: '',
                caption: '',
                visible: true,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>

        {/* Gallery Form Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <form onSubmit={handleSave} className="w-full max-w-xl glass-panel rounded-3xl p-6 space-y-4 border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white">{editingItem.id ? 'Edit Photo Entry' : 'Upload Gallery Photo'}</h3>
                <button type="button" onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ImageUploader
                value={editingItem.image || ''}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                label="Photograph File Upload"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Photo Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Quantix Award Ceremony"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Category</label>
                <select
                  value={editingItem.category || 'Events'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="Events">Events</option>
                  <option value="Awards">Awards</option>
                  <option value="Presentations">Presentations</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Caption / Context</label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Caption for lightbox view..."
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingItem.visible ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, visible: e.target.checked })}
                  className="rounded bg-dark-bg border-white/20 text-brand-500"
                />
                <span>Show in Gallery</span>
              </label>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setEditingItem(null)} className="text-xs font-semibold text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold">
                  Save Photo Entry
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Table */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Caption</th>
                <th className="px-6 py-4">Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {gallery.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{item.title}</td>
                  <td className="px-6 py-4 text-brand-cyan">{item.category}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{item.caption}</td>
                  <td className="px-6 py-4">
                    {item.visible ? <span className="text-emerald-400">Visible</span> : <span className="text-gray-500">Hidden</span>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setEditingItem(item)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeletingId(item.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal isOpen={!!deletingId} title="this gallery photo" onConfirm={handleDelete} onCancel={() => setDeletingId(null)} />
      </main>
    </div>
  );
}
