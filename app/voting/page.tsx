'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import PollCard from '@/components/features/voting/PollCard';
import { polls } from '@/lib/data';
import { cn } from '@/lib/utils';

const categories = ['Semua', 'Aktif', 'Selesai', 'Buatan Saya'];

export default function VotingPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredPolls = polls.filter(poll => {
    const matchesCategory = 
      activeCategory === 'Semua' ||
      (activeCategory === 'Aktif' && poll.isActive && new Date(poll.deadline) > new Date()) ||
      (activeCategory === 'Selesai' && (!poll.isActive || new Date(poll.deadline) <= new Date())) ||
      activeCategory === 'Buatan Saya';
    const matchesSearch = poll.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activePolls = polls.filter(p => p.isActive && new Date(p.deadline) > new Date());
  const completedPolls = polls.filter(p => !p.isActive || new Date(p.deadline) <= new Date());

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-surface/50 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="currentColor" className="text-accent" />
            <circle cx="20" cy="30" r="15" fill="currentColor" className="text-accent" opacity="0.3" />
            <circle cx="80" cy="50" r="20" fill="currentColor" className="text-accent" opacity="0.2" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
                Jajak Pendapat
              </h1>
              <p className="text-text-secondary">
                Pilih destinasi dan kegiatan untuk trip komunitas selanjutnya
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5" />
              Buat Poll Baru
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 p-4 bg-surface/50 rounded-xl">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-text-primary">{activePolls.length}</p>
                <p className="text-sm text-text-secondary">Poll Aktif</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-surface/50 rounded-xl">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-text-primary">{completedPolls.length}</p>
                <p className="text-sm text-text-secondary">Poll Selesai</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-surface/50 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-text-primary">
                  {polls.reduce((sum, p) => sum + p.totalVotes, 0)}
                </p>
                <p className="text-sm text-text-secondary">Total Vote</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-surface/50 rounded-xl">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-text-primary">{polls.length}</p>
                <p className="text-sm text-text-secondary">Total Poll</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-white/10 sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                    activeCategory === cat
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-secondary hover:text-text-primary'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Cari poll..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Polls Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPolls.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPolls.map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PollCard poll={poll} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Tidak ada poll ditemukan</h3>
              <p className="text-text-secondary">Coba ubah filter atau buat poll baru</p>
            </div>
          )}
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold text-text-primary mb-6">Buat Poll Baru</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Pertanyaan</label>
                <input type="text" className="input" placeholder="Apa pertanyaan poll-nya?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Deskripsi (Opsional)</label>
                <textarea className="input min-h-[100px]" placeholder="Tambahkan deskripsi..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Opsi</label>
                <div className="space-y-2">
                  <input type="text" className="input" placeholder="Opsi 1" />
                  <input type="text" className="input" placeholder="Opsi 2" />
                  <input type="text" className="input" placeholder="Opsi 3" />
                </div>
                <button type="button" className="mt-2 text-sm text-accent hover:underline">
                  + Tambah Opsi
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Batas Waktu</label>
                <input type="datetime-local" className="input" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary flex-1">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Buat Poll
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
