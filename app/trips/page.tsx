'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal, X, MapPin, Clock, TrendingUp } from 'lucide-react';
import TripCard from '@/components/features/trips/TripCard';
import { trips } from '@/lib/data';
import { cn, getDifficultyValue } from '@/lib/utils';

const difficulties = ['Easy', 'Moderate', 'Hard', 'Expert'];
const durations = ['1 Hari', '2-3 Hari', '4-5 Hari', '6+ Hari'];
const priceRanges = [
  { label: 'Semua', min: 0, max: Infinity },
  { label: 'Di bawah 500rb', min: 0, max: 500000 },
  { label: '500rb - 1jt', min: 500000, max: 1000000 },
  { label: '1jt - 2jt', min: 1000000, max: 2000000 },
  { label: 'Di atas 2jt', min: 2000000, max: Infinity },
];

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'newest'>('popular');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.mountain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || trip.difficulty === selectedDifficulty;
    
    let matchesDuration = true;
    if (selectedDuration) {
      const dur = trip.duration;
      if (selectedDuration === '1 Hari') matchesDuration = dur === 1;
      else if (selectedDuration === '2-3 Hari') matchesDuration = dur >= 2 && dur <= 3;
      else if (selectedDuration === '4-5 Hari') matchesDuration = dur >= 4 && dur <= 5;
      else if (selectedDuration === '6+ Hari') matchesDuration = dur >= 6;
    }
    
    const matchesPrice = trip.price >= priceRanges[selectedPrice].min && 
      (priceRanges[selectedPrice].max === Infinity || trip.price <= priceRanges[selectedPrice].max);
    
    return matchesSearch && matchesDifficulty && matchesDuration && matchesPrice;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.departureDates[0]).getTime() - new Date(a.departureDates[0]).getTime();
      default:
        return b.currentParticipants - a.currentParticipants;
    }
  });

  const hasActiveFilters = selectedDifficulty || selectedDuration || selectedPrice > 0;

  const clearFilters = () => {
    setSelectedDifficulty(null);
    setSelectedDuration(null);
    setSelectedPrice(0);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-surface/50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Pilihan Trip Pendakian
            </h1>
            <p className="text-text-secondary text-lg">
              Temukan pengalaman pendakian terbaik dengan guide profesional dan fasilitas lengkap
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 border-b border-white/10 sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Cari trip atau gunung..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'btn btn-secondary',
                  hasActiveFilters && 'border-accent text-accent'
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {[(!!selectedDifficulty), (!!selectedDuration), (selectedPrice > 0)].filter(Boolean).length}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center gap-1 bg-surface rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-6 bg-surface rounded-2xl border border-white/10"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Tingkat Kesulitan
                  </h4>
                  <div className="space-y-2">
                    {difficulties.map((diff) => (
                      <label key={diff} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDifficulty === diff}
                          onChange={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                          className="w-4 h-4 rounded border-white/20 bg-surface text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-text-secondary">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Durasi
                  </h4>
                  <div className="space-y-2">
                    {durations.map((dur) => (
                      <label key={dur} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDuration === dur}
                          onChange={() => setSelectedDuration(selectedDuration === dur ? null : dur)}
                          className="w-4 h-4 rounded border-white/20 bg-surface text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-text-secondary">{dur}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-accent">Rp</span>
                    Range Harga
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPrice === index}
                          onChange={() => setSelectedPrice(index)}
                          className="w-4 h-4 border-white/20 bg-surface text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-text-secondary">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-accent">↓</span>
                    Urutkan
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="input"
                  >
                    <option value="popular">Terpopuler</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="newest">Terbaru</option>
                  </select>
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-accent hover:underline flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Hapus semua filter
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-text-secondary">
              Menampilkan <span className="text-text-primary font-medium">{sortedTrips.length}</span> trip
            </p>
          </div>

          {sortedTrips.length > 0 ? (
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1 lg:grid-cols-2'
            )}>
              {sortedTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <TripCard trip={trip} />
                  ) : (
                    <TripListCard trip={trip} />
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Trip tidak ditemukan</h3>
              <p className="text-text-secondary">Coba ubah filter atau kata kunci pencarian</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="mt-4 btn btn-secondary">
                  Hapus Filter
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TripListCard({ trip }: { trip: typeof trips[0] }) {
  return (
    <div className="card card-hover flex flex-col md:flex-row">
      <div className="relative md:w-72 aspect-video md:aspect-auto overflow-hidden">
        <img src={trip.images[0]} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 hidden md:block" />
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{trip.title}</h3>
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
          <MapPin className="w-4 h-4" />
          {trip.location}
        </div>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{trip.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl font-bold text-accent">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trip.price)}
            <span className="text-sm text-text-secondary font-normal">/org</span>
          </span>
          <a href={`/trips/${trip.id}`} className="btn btn-primary text-sm px-4 py-2">
            Lihat Detail
          </a>
        </div>
      </div>
    </div>
  );
}
