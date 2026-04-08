'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Mountain, User, Bell, Search, ChevronDown, LogOut, Settings, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/trips', label: 'Trip Kami' },
  { href: '/voting', label: 'Voting' },
  { href: '/komunitas', label: 'Komunitas' },
  { href: '/galeri', label: 'Galeri' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">Gunung<span className="text-accent">Kita</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Search className="w-5 h-5 text-text-secondary" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-accent/50"
                  />
                  <ChevronDown className={cn('w-4 h-4 text-text-secondary transition-transform', isProfileOpen && 'rotate-180')} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-scale-in">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.displayName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-text-primary">{currentUser.displayName}</p>
                          <p className="text-sm text-text-secondary">@{currentUser.username}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
                        <div className="text-center">
                          <p className="font-mono font-bold text-accent">{currentUser.stats.tripsCompleted}</p>
                          <p className="text-xs text-text-secondary">Trip</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono font-bold text-accent">{currentUser.stats.peaksClimbed}</p>
                          <p className="text-xs text-text-secondary">Puncak</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono font-bold text-accent">{currentUser.stats.distanceClimbed}km</p>
                          <p className="text-xs text-text-secondary">Jarak</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <User className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm">Profil Saya</span>
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <Award className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm">Achievements</span>
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <Settings className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm">Pengaturan</span>
                      </Link>
                    </div>
                    <div className="p-2 border-t border-white/10">
                      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-danger/10 text-danger transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Keluar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-white/10 animate-slide-in-right">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-text-primary">{currentUser.displayName}</p>
                  <p className="text-sm text-text-secondary">@{currentUser.username}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-accent text-white font-medium rounded-xl"
              >
                Profil Saya
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
