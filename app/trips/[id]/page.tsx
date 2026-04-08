'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Clock, Users, Star, ChevronRight, ChevronLeft, Calendar, 
  CheckCircle, XCircle, Heart, Share2, Mountain, TrendingUp, Shield,
  Thermometer, Waves, TreePine
} from 'lucide-react';
import { trips } from '@/lib/data';
import { cn, formatPrice, formatDate, getDifficultyColor } from '@/lib/utils';
import BookingModal from '@/components/features/trips/BookingModal';

export default function TripDetailPage() {
  const params = useParams();
  const trip = trips.find(t => t.id === params.id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Mountain className="w-20 h-20 text-text-secondary mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-text-primary mb-2">Trip Tidak Ditemukan</h1>
          <p className="text-text-secondary mb-6">Maaf, trip yang kamu cari tidak tersedia</p>
          <a href="/trips" className="btn btn-primary">Lihat Trip Lainnya</a>
        </div>
      </div>
    );
  }

  const avgRating = trip.reviews.length > 0
    ? (trip.reviews.reduce((sum, r) => sum + r.rating, 0) / trip.reviews.length).toFixed(1)
    : '5.0';

  const terrainIcons: Record<string, any> = {
    'Savana': TreePine,
    'Hutan': TreePine,
    'Hutan pinus': TreePine,
    'Bebatuan': Mountain,
    'Bebatuan vulkanik': Mountain,
    'Pantai pasir': Waves,
    'Kawah': Thermometer,
    'Viewpoint': TrendingUp,
    'Ridge line': TrendingUp,
    'Puncak': Mountain,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Gallery */}
      <section className="relative">
        <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
          <img
            src={trip.images[selectedImage]}
            alt={trip.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Navigation */}
          <button
            onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : trip.images.length - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setSelectedImage(prev => prev < trip.images.length - 1 ? prev + 1 : 0)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {trip.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  selectedImage === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                'w-12 h-12 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center transition-colors',
                isLiked ? 'text-danger' : 'text-white hover:bg-black/70'
              )}
            >
              <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
            </button>
            <button className="w-12 h-12 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={cn('badge', getDifficultyColor(trip.difficulty))}>
                  {trip.difficulty}
                </span>
                <span className="badge bg-surface text-text-secondary border border-white/10">
                  {trip.duration} Hari {trip.duration - 1} Malam
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
                {trip.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {trip.location}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn('w-4 h-4', i < Math.floor(Number(avgRating)) ? 'fill-accent text-accent' : 'text-text-secondary')} />
                  ))}
                  <span className="ml-1">{avgRating}</span>
                  <span className="text-text-secondary">({trip.reviews.length} review)</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="card p-4 text-center">
                <Mountain className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-mono text-lg font-bold text-text-primary">{trip.mountain.elevation}m</p>
                <p className="text-xs text-text-secondary">Ketinggian</p>
              </div>
              <div className="card p-4 text-center">
                <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-mono text-lg font-bold text-text-primary">{trip.elevationGain}m</p>
                <p className="text-xs text-text-secondary">Kenaikan</p>
              </div>
              <div className="card p-4 text-center">
                <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-mono text-lg font-bold text-text-primary">{trip.currentParticipants}/{trip.maxParticipants}</p>
                <p className="text-xs text-text-secondary">Slot</p>
              </div>
              <div className="card p-4 text-center">
                <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-mono text-lg font-bold text-text-primary">100%</p>
                <p className="text-xs text-text-secondary">Safety Rate</p>
              </div>
            </motion.div>

            {/* Terrain Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4">Tipe Medan</h2>
              <div className="flex flex-wrap gap-2">
                {trip.terrainType.map((terrain) => {
                  const Icon = terrainIcons[terrain] || Mountain;
                  return (
                    <span key={terrain} className="flex items-center gap-2 px-4 py-2 bg-surface rounded-xl text-sm">
                      <Icon className="w-4 h-4 text-accent" />
                      {terrain}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4">Deskripsi Trip</h2>
              <p className="text-text-secondary leading-relaxed">{trip.description}</p>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4">Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-accent/30 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {day.day}
                    </div>
                    <div className="card p-4 ml-4">
                      <h3 className="font-semibold text-text-primary mb-2">{day.title}</h3>
                      <ul className="space-y-1">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                      {day.accommodation && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-sm text-text-secondary">
                            <span className="font-medium text-text-primary">Penginapan:</span> {day.accommodation}
                          </p>
                        </div>
                      )}
                      {day.meals && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {day.meals.map((meal, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-surface rounded-lg">{meal}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Include/Exclude */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Yang Termasuk</h2>
                <ul className="space-y-2">
                  {trip.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Yang Tidak Termasuk</h2>
                <ul className="space-y-2">
                  {trip.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <XCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* What to Bring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4">Yang Perlu Dibawa</h2>
              <div className="grid grid-cols-2 gap-3">
                {trip.whatToBring.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            {trip.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-text-primary mb-4">Review Pendaki</h2>
                <div className="space-y-4">
                  {trip.reviews.map((review) => (
                    <div key={review.id} className="card p-6">
                      <div className="flex items-start gap-4">
                        <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-text-primary">{review.userName}</p>
                              <p className="text-xs text-text-secondary">Trip: {formatDate(review.tripDate)}</p>
                            </div>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={cn('w-4 h-4', i < review.rating ? 'fill-accent text-accent' : 'text-text-secondary')} />
                              ))}
                            </div>
                          </div>
                          <p className="text-text-secondary text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <div className="mb-6">
                  <p className="text-sm text-text-secondary">Mulai dari</p>
                  <p className="font-mono text-3xl font-bold text-accent">{formatPrice(trip.price)}</p>
                  <p className="text-sm text-text-secondary">per orang</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Pilih Tanggal Keberangkatan
                  </label>
                  <div className="space-y-2">
                    {trip.departureDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          'w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3',
                          selectedDate === date
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-white/10 hover:border-white/30'
                        )}
                      >
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(date)}</span>
                        <span className={cn(
                          'ml-auto text-xs px-2 py-0.5 rounded-full',
                          trip.maxParticipants - trip.currentParticipants <= 3
                            ? 'bg-danger/10 text-danger'
                            : 'bg-success/10 text-success'
                        )}>
                          {trip.maxParticipants - trip.currentParticipants} slot
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Harga per orang</span>
                    <span className="text-text-primary">{formatPrice(trip.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Biaya layanan</span>
                    <span className="text-text-primary">Termasuk</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between">
                    <span className="font-medium text-text-primary">Total</span>
                    <span className="font-mono font-bold text-text-primary">{formatPrice(trip.price)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBooking(true)}
                  disabled={!selectedDate}
                  className={cn(
                    'btn w-full text-lg py-4',
                    selectedDate ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
                  )}
                >
                  {selectedDate ? 'Booking Sekarang' : 'Pilih Tanggal Dulu'}
                </button>

                <p className="text-xs text-text-secondary text-center mt-4">
                  Gratis pembatalan hingga 7 hari sebelum keberangkatan
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingModal
          trip={trip}
          selectedDate={selectedDate!}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
