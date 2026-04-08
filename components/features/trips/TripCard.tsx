'use client';

import Link from 'next/link';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { Trip } from '@/types';
import { formatPrice, getDifficultyColor } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const avgRating = trip.reviews.length > 0
    ? (trip.reviews.reduce((sum, r) => sum + r.rating, 0) / trip.reviews.length).toFixed(1)
    : '5.0';

  return (
    <Link href={`/trips/${trip.id}`} className="block">
      <article className="card card-hover h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={trip.images[0]}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`badge ${getDifficultyColor(trip.difficulty)}`}>
              {trip.difficulty}
            </span>
            {trip.currentParticipants >= trip.maxParticipants * 0.8 && (
              <span className="badge bg-danger/20 text-danger border border-danger/30">
                Hampir Penuh
              </span>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{trip.title}</h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4" />
              {trip.location}
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {trip.duration}D{trip.duration - 1}N
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {trip.mountain.elevation}m
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {trip.currentParticipants}/{trip.maxParticipants}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(Number(avgRating)) ? 'fill-accent text-accent' : 'text-text-secondary'}`}
                />
              ))}
            </div>
            <span className="text-sm text-text-secondary">{avgRating}</span>
            <span className="text-sm text-text-secondary">({trip.reviews.length} review)</span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">Mulai dari</p>
              <p className="font-mono text-xl font-bold text-accent">{formatPrice(trip.price)}</p>
              <p className="text-xs text-text-secondary">/ orang</p>
            </div>
            <div className="text-accent text-sm font-medium flex items-center gap-1">
              Lihat Detail
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
