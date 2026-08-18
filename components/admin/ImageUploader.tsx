'use client';

import { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { apiFetch, formatImgUrl } from '@/lib/api';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Upload Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await apiFetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-300 block">{label}</label>

      {value ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-dark-card border border-white/10 group">
          <img src={formatImgUrl(value)} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <label className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-semibold cursor-pointer hover:bg-brand-600 transition-colors">
              Replace
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-rose-600 text-white text-xs hover:bg-rose-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-500/50 bg-white/[0.02] cursor-pointer transition-colors p-4 text-center">
          {uploading ? (
            <div className="flex items-center space-x-2 text-brand-cyan text-xs font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading image...</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="p-2.5 rounded-full bg-brand-500/10 text-brand-cyan mx-auto w-max">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-gray-200">Click to upload image</p>
              <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}

      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
}
