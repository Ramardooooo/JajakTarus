'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Users, Calendar, Star, Clock, ChevronRight, Heart, MessageCircle, Share2, TrendingUp, MapPin, Award } from 'lucide-react';
import { formatPrice, getDifficultyColor } from '@/lib/utils';
import { trips, polls, forumPosts, galleryItems, currentUser } from '@/lib/data';
import PollCard from '@/components/features/voting/PollCard';
import TripCard from '@/components/features/trips/TripCard';

const stats = [
  { label: 'Pendaki Aktif', value: '2,500+', icon: Users },
  { label: 'Trip Diselesaikan', value: '850+', icon: Mountain },
  { label: 'Gunung Ditaklukkan', value: '45+', icon: MapPin },
  { label: 'Rating Rata-rata', value: '4.9', icon: Star },
];

const featuredMountains = trips.slice(0, 3);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-text-secondary">12 Trip Tersedia Bulan Ini</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              <span className="text-text-primary">Setiap Langkah Menuju</span>
              <br />
              <span className="gradient-text">Puncak, Satu Langkah Menuju</span>
              <br />
              <span className="text-text-primary">Dirimu</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Bergabunglah dengan komunitas pendaki terbesar di Indonesia. Booking trip, voting destinasi, dan temukan cerita dari para pendaki lain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trips" className="btn btn-primary text-lg px-8 py-4">
                Jelajahi Trip
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/komunitas" className="btn btn-secondary text-lg px-8 py-4">
                Gabung Komunitas
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="card p-6 text-center backdrop-blur-xl"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-mono text-2xl md:text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Mountains */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-accent font-medium mb-2">Gunung Populer</p>
              <h2 className="section-title">Destinasi Yang Menantang</h2>
            </div>
            <Link href="/trips" className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all">
              Lihat Semua <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {featuredMountains.map((trip) => (
              <motion.div key={trip.id} variants={itemVariants}>
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>

          <Link href="/trips" className="md:hidden flex items-center justify-center gap-2 text-accent mt-8">
            Lihat Semua Trip <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Active Poll Section */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-accent font-medium mb-2">Jajak Pendapat</p>
              <h2 className="section-title">Pilih Destinasimu</h2>
            </div>
            <Link href="/voting" className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all">
              Semua Polling <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {polls.filter(p => p.isActive).slice(0, 2).map((poll) => (
              <motion.div key={poll.id} variants={itemVariants}>
                <PollCard poll={poll} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-accent font-medium mb-2">Kenapa Harus Kami</p>
            <h2 className="section-title mx-auto">Pengalaman Pendakian Terbaik</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Award,
                title: 'Guide Profesional',
                description: 'Tim guide bersertifikat dengan pengalaman lebih dari 5 tahun mendaki berbagai gunung di Indonesia.'
              },
              {
                icon: Calendar,
                title: 'Trip Fleksibel',
                description: 'Pilih jadwal yang sesuai dengan waktumu. Available untuk weekend trip hingga expedition panjang.'
              },
              {
                icon: Users,
                title: 'Komunitas Solid',
                description: 'Bergabung dengan ribuan pendaki enthusiasts. Share pengalaman dan bangun relasi baru.'
              },
              {
                icon: Star,
                title: 'Rating Tinggi',
                description: '4.9/5 rating dari lebih dari 500+ pendaki yang sudah merasakan pengalaman bersama kami.'
              },
              {
                icon: TrendingUp,
                title: 'Progresif',
                description: 'Dari beginner hingga expert level. Kami bantu kamu naik level pendakian step by step.'
              },
              {
                icon: Heart,
                title: 'Lingkungan',
                description: 'Komitmen menjaga alam. Clean climbing policy dan waste management di setiap trip.'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-8 card-hover"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-accent font-medium mb-2">Komunitas</p>
              <h2 className="section-title">Dari Para Pendaki</h2>
            </div>
            <Link href="/komunitas" className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all">
              Lihat Forum <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {forumPosts.slice(0, 4).map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <article className="card card-hover p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">{post.authorName}</span>
                        {post.authorRole === 'admin' && (
                          <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">Admin</span>
                        )}
                        {post.authorRole === 'moderator' && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">Mod</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{post.category}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 hover:text-accent transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-6 text-text-secondary">
                    <button className={`flex items-center gap-2 hover:text-accent transition-colors ${post.userLiked ? 'text-accent' : ''}`}>
                      <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-accent transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-accent transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-accent font-medium mb-2">Galeri</p>
              <h2 className="section-title">Momen Yang Terabadikan</h2>
            </div>
            <Link href="/galeri" className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all">
              Lihat Semua <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm mb-1">{item.caption}</p>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <img src={item.authorAvatar} alt={item.author} className="w-5 h-5 rounded-full" />
                      {item.author}
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xl rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-background to-secondary p-12 md:p-16"
          >
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L20,60 L40,80 L60,40 L80,70 L100,50 L100,100 Z" fill="currentColor" className="text-white" />
              </svg>
            </div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
                Siap Memulai <span className="text-accent">Petualangan</span> Mu?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Bergabung dengan lebih dari 2,500 pendaki yang sudah merasakan pengalaman tak terlupakan bersama GunungKita.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="btn btn-primary text-lg px-8 py-4">
                  Daftar Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/trips" className="btn btn-ghost text-lg px-8 py-4 border border-white/20">
                  Lihat Trip Tersedia
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
