'use client';

import { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Image from 'next/image';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  visible: boolean;
}

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function Gallery({ gallery }: GalleryProps) {
  const categories = ['All', 'Events', 'Awards', 'Presentations', 'Certificates'];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  const handlePrev = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev as number) - 1));
    }
  };

  const handleNext = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filteredItems]);

  return (
    <section id="gallery" className="py-20 relative bg-dark-bg/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Beyond the Classroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Photo <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Real college technical experiences, presentations, awards, and team events.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'glass-panel text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(index)}
              className="glass-panel rounded-2xl overflow-hidden border-white/10 hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-64 w-full bg-dark-card overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-brand-500/80 text-white backdrop-blur-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-dark-bg/80 border border-white/10 text-brand-cyan backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in">
          
          {/* Close Button */}
          <button
            onClick={() => setActiveModalIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full glass-panel border-white/20 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel border-white/20 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel border-white/20 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-5xl w-full flex flex-col items-center space-y-4 max-h-[90vh]">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-dark-card border border-white/10">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center space-y-1 max-w-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-cyan border border-brand-500/30">
                {activeItem.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{activeItem.title}</h3>
              <p className="text-xs text-gray-300">{activeItem.caption}</p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
