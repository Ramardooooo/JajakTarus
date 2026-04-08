'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Heart, MessageCircle, Share2, Pin, MoreHorizontal, Filter, Image } from 'lucide-react';
import { forumPosts } from '@/lib/data';
import { cn, formatRelativeTime } from '@/lib/utils';

const categories = ['Semua', 'Tips & Tricks', 'Trip Report', 'Question', 'Gear Review', 'Discussion'];

const categoryColors: Record<string, string> = {
  'Tips & Tricks': 'bg-primary/20 text-primary',
  'Trip Report': 'bg-accent/20 text-accent',
  'Question': 'bg-warning/20 text-warning',
  'Gear Review': 'bg-success/20 text-success',
  'Discussion': 'bg-purple-500/20 text-purple-400',
};

export default function KomunitasPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = activeCategory === 'Semua' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedPosts = filteredPosts.filter(p => p.isPinned);
  const regularPosts = filteredPosts.filter(p => !p.isPinned);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-surface/50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
                Komunitas Pendaki
              </h1>
              <p className="text-text-secondary">
                Berbagi pengalaman, tips, dan cerita dari para pendaki Indonesia
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5" />
              Buat Postingan
            </button>
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
                placeholder="Cari postingan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
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
        </div>
      </section>

      {/* Posts */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pinned Posts */}
          {pinnedPosts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Postingan Tersemat</span>
              </div>
              <div className="space-y-4">
                {pinnedPosts.map((post) => (
                  <PostCard key={post.id} post={post} isPinned />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 ? (
            <div className="space-y-4">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Tidak ada postingan ditemukan</h3>
              <p className="text-text-secondary">Coba ubah filter atau buat postingan baru</p>
            </div>
          )}
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function PostCard({ post, isPinned = false }: { post: typeof forumPosts[0]; isPinned?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(post.userLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className={cn('card overflow-hidden', isPinned && 'border-accent/30')}>
      {post.images && post.images.length > 0 && (
        <div className="relative aspect-video">
          <img src={post.images[0]} alt="" className="w-full h-full object-cover" />
          {post.images.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full text-white text-sm flex items-center gap-1">
              <Image className="w-4 h-4" />
              +{post.images.length - 1}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img src={post.authorAvatar} alt={post.authorName} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-text-primary">{post.authorName}</span>
              {post.authorRole === 'admin' && (
                <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">Admin</span>
              )}
              {post.authorRole === 'moderator' && (
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">Mod</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className={cn('badge', categoryColors[post.category])}>{post.category}</span>
              <span>•</span>
              <span>{formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-text-primary mb-3 cursor-pointer hover:text-accent transition-colors">
          {post.title}
        </h2>

        <div className={cn('text-text-secondary mb-4', !isExpanded && 'line-clamp-3')}>
          {post.content}
        </div>

        {!isExpanded && post.content.length > 200 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-accent text-sm hover:underline mb-4"
          >
            Selengkapnya
          </button>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-surface rounded-lg text-text-secondary">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
          <button
            onClick={handleLike}
            className={cn('flex items-center gap-2 transition-colors', liked ? 'text-danger' : 'text-text-secondary hover:text-danger')}
          >
            <Heart className={cn('w-5 h-5', liked && 'fill-current')} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function CreatePostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Discussion');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    console.log({ title, content, category, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-text-primary">Buat Postingan</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Judul postingan..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Konten</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input min-h-[200px]"
              placeholder="Tulis postingan kamu di sini..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input"
              placeholder="hiking, tips, pemula (pisahkan dengan koma)"
            />
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex gap-3">
          <button onClick={onClose} className="btn btn-secondary flex-1">Batal</button>
          <button onClick={handleSubmit} className="btn btn-primary flex-1">Posting</button>
        </div>
      </motion.div>
    </div>
  );
}
