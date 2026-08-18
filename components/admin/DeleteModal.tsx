'use client';

import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function DeleteModal({
  isOpen,
  title = 'this item',
  onConfirm,
  onCancel,
  loading = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border-white/20 p-6 space-y-6 shadow-2xl">
        <div className="flex items-center space-x-3 text-rose-400">
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
            <p className="text-xs text-gray-400">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-gray-300">
          Are you sure you want to delete <strong className="text-white">{title}</strong>?
        </p>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl glass-panel border-white/10 text-gray-300 hover:text-white text-xs font-semibold hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-lg shadow-rose-600/25 transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
