'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Edit2, Award, Mountain, Users, Clock, TrendingUp,
  Heart, Bookmark, Settings, LogOut, ChevronRight, Star, Shield, Zap, Trophy
} from 'lucide-react';
import { currentUser } from '@/lib/data';
import { cn, formatDate } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Mountain },
  { id: 'trips', label: 'Trip Saya', icon: Clock },
  { id: 'saved', label: 'Tersimpan', icon: Bookmark },
  { id: 'achievements', label: 'Achievements', icon: Award },
];

const achievements = [
  { id: '1', name: 'Summit Seeker', description: 'Raih 10 puncak berbeda', icon: Mountain, progress: 75, earned: true },
  { id: '2', name: 'Trail Master', description: 'Ikuti 20 trip komunitas', icon: Trophy, progress: 65, earned: false },
  { id: '3', name: 'Early Bird', description: 'Booking 5 trip di awal', icon: Zap, progress: 40, earned: false },
  { id: '4', name: 'Social Butterfly', description: 'Komentari 50 postingan', icon: Users, progress: 80, earned: true },
  { id: '5', name: 'Photographer', description: 'Upload 10 foto ke galeri', icon: Award, progress: 30, earned: false },
  { id: '6', name: 'Guardian', description: '100% clean hiking', icon: Shield, progress: 100, earned: true },
];

const recentTrips = [
  { id: '1', name: 'Rinjani 3D2N', date: '2026-03-10', status: 'completed', rating: 5 },
  { id: '2', name: 'Merbabu 2D1N', date: '2026-02-20', status: 'completed', rating: 5 },
  { id: '3', name: 'Bromo Sunrise', date: '2026-02-05', status: 'completed', rating: 4 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const user = currentUser;

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-surface/50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 L30,60 L50,75 L80,40 L100,60 L100,100 Z" fill="currentColor" className="text-accent" />
            </svg>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-accent/30 mx-auto"
              />
              {user.role !== 'member' && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mt-4 mb-1">
              {user.displayName}
            </h1>
            <p className="text-text-secondary">@{user.username}</p>
            <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">{user.bio}</p>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-secondary">
              <MapPin className="w-4 h-4" />
              {user.location}
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4" />
              Bergabung {formatDate(user.joinedAt)}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profil
              </button>
              <button className="btn btn-ghost">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-mono text-2xl md:text-3xl font-bold text-accent">{user.stats.tripsCompleted}</p>
              <p className="text-sm text-text-secondary">Trip</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl md:text-3xl font-bold text-accent">{user.stats.peaksClimbed}</p>
              <p className="text-sm text-text-secondary">Puncak</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl md:text-3xl font-bold text-accent">{user.stats.distanceClimbed}km</p>
              <p className="text-sm text-text-secondary">Jarak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-white/10 sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all',
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Activity Summary */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Ringkasan Aktivitas</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">Tren Aktivitas</p>
                      <p className="text-sm text-text-secondary">Naik 20% dari bulan lalu</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">Rating Rata-rata</p>
                      <p className="text-sm text-text-secondary">5.0 dari 5 bintang</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Achievements</h3>
                  <button onClick={() => setActiveTab('achievements')} className="text-sm text-accent hover:underline">
                    Lihat Semua
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {earnedAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="card p-4 text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <achievement.icon className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-sm font-medium text-text-primary">{achievement.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'trips' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">Trip Yang Pernah Diikuti</h3>
              {recentTrips.map((trip) => (
                <div key={trip.id} className="card p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Mountain className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{trip.name}</p>
                    <p className="text-sm text-text-secondary">{formatDate(trip.date)}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn('w-4 h-4', i < trip.rating ? 'fill-accent text-accent' : 'text-text-secondary')} />
                    ))}
                  </div>
                  <span className="badge bg-success/20 text-success">Completed</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Bookmark className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Trip Tersimpan</h3>
              <p className="text-text-secondary mb-6">Trip yang kamu simpan akan muncul di sini</p>
              <button className="btn btn-secondary">Jelajahi Trip</button>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Semua Achievements</h3>
                <span className="text-sm text-text-secondary">
                  {earnedAchievements.length}/{achievements.length} earned
                </span>
              </div>
              {achievements.map((achievement) => (
                <div key={achievement.id} className={cn('card p-4', !achievement.earned && 'opacity-60')}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      achievement.earned ? 'bg-accent/10' : 'bg-surface'
                    )}>
                      <achievement.icon className={cn('w-7 h-7', achievement.earned ? 'text-accent' : 'text-text-secondary')} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-text-primary">{achievement.name}</p>
                        {achievement.earned && (
                          <span className="badge bg-success/20 text-success text-xs">Earned</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{achievement.description}</p>
                      {!achievement.earned && (
                        <div className="mt-2">
                          <div className="h-2 bg-surface rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{achievement.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
