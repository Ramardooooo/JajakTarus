'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-text-primary">Gunung<span className="text-accent">Kita</span></span>
          </Link>

          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-text-secondary mb-8">
            Masuk untuk melanjutkan petualanganmu
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-12"
                  placeholder="kamu@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text-primary">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-surface text-accent focus:ring-accent"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn('btn btn-primary w-full', isLoading && 'opacity-70')}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-text-secondary">atau</span>
            </div>
          </div>

          <button className="btn btn-secondary w-full">
            <Chrome className="w-5 h-5" />
            Masuk dengan Google
          </button>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Belum punya akun?{' '}
            <Link href="/register" className="text-accent hover:underline font-medium">
              Daftar sekarang
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mountain className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Lanjutkan Perjalananmu
            </h2>
            <p className="text-text-secondary">
              Masuk untuk booking trip, voting destinasi favorit, dan bergabung dengan komunitas pendaki Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
