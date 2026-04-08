'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Camera, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems } from '@/lib/data';
import { cn, formatRelativeTime } from '@/lib/utils';

const tags = ['Semua', 'Sunrise', 'Sunset', 'Camping', 'Summit', 'Trail', 'Nature', 'Night'];

export default function GaleriPage() {
  const [activeTag, setActiveTag] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(item => {
    const matchesTag = activeTag === 'Semua' || item.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase()));
    const matchesSearch = item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-surface/50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Galeri Pendakian
            </h1>
            <p className="text-text-secondary text-lg">
              Kumpulan momen dan pemandangan terbaik dari perjalanan para pendaki Indonesia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-white/10 sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Cari foto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                  activeTag === tag
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-secondary hover:text-text-primary'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-surface">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm mb-2 line-clamp-2">{item.caption}</p>
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <img src={item.authorAvatar} alt={item.author} className="w-5 h-5 rounded-full" />
                          {item.author}
                          <span className="mx-2">•</span>
                          {formatRelativeTime(item.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-9 h-9 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full text-white text-xs flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {item.likes}
                      </span>
                    </div>
                    {item.tripName && (
                      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-3 py-1 bg-accent/80 backdrop-blur-xl rounded-full text-white text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.tripName}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Tidak ada foto ditemukan</h3>
              <p className="text-text-secondary">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="h-full flex items-center justify-center p-8">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={filteredItems[selectedImage].image}
              alt={filteredItems[selectedImage].caption}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-4xl mx-auto">
              <p className="text-white font-medium mb-2">{filteredItems[selectedImage].caption}</p>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <img src={filteredItems[selectedImage].authorAvatar} alt="" className="w-6 h-6 rounded-full" />
                  {filteredItems[selectedImage].author}
                </div>
                <span>•</span>
                <span>{formatRelativeTime(filteredItems[selectedImage].createdAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {filteredItems[selectedImage].likes}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {filteredItems[selectedImage].tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
