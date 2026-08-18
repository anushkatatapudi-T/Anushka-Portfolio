'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Eye } from 'lucide-react';

export default function ViewTracker() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Record view once per session
    const hasViewed = sessionStorage.getItem('portfolio_viewed');
    if (!hasViewed) {
      apiFetch('/api/portfolio/views', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          if (data.count) {
            setViews(data.count);
            sessionStorage.setItem('portfolio_viewed', 'true');
          }
        })
        .catch(() => {});
    } else {
      apiFetch('/api/portfolio/views')
        .then((res) => res.json())
        .then((data) => {
          if (data.count) setViews(data.count);
        })
        .catch(() => {});
    }
  }, []);

  if (views === null) return null;

  return (
    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-panel border-[#66FCF1]/30 text-[#66FCF1] text-xs font-medium">
      <Eye className="w-3.5 h-3.5" />
      <span>{views.toLocaleString()} Total Views</span>
    </div>
  );
}
