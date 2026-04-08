'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, Mail, Lock, Eye, EyeOff, User, ArrowRight, Chrome, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { label: 'Minimal 8 karakter', met: formData.password.length >= 8 },
    { label: 'Setidaknya 1 angka', met: /\d/.test(formData.password) },
    { label: 'Setidaknya 1 huruf besar', met: /[A-Z]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every(r => r.met);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet || formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mountain className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Bergabung dengan Komunitas
            </h2>
            <p className="text-text-secondary mb-8">
              Daftar sekarang dan mulai petualangan pendakianmu bersama ribuan pendaki Indonesia.
            </p>
            <div className="space-y-4 text-left">
              {[
                'Booking trip dengan guide profesional',
                'Voting destinasi trip selanjutnya',
                'Bergabung di forum komunitas',
                'Kumpulkan achievements pendakian',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-text-secondary">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md py-8"
        >
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-text-primary">Gunung<span className="text-accent">Kita</span></span>
          </Link>

          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-text-secondary mb-8">
            Bergabung dan mulai petualanganmu
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input pl-12"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">@</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                  className="input pl-10"
                  placeholder="johndoe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input pl-12"
                  placeholder="kamu@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              
              {formData.password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className={cn('flex items-center gap-2 text-sm', req.met ? 'text-success' : 'text-text-secondary')}>
                      <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center', req.met ? 'border-success bg-success/20' : 'border-current')}>
                        {req.met && <Check className="w-2.5 h-2.5" />}
                      </div>
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={cn(
                    'input pl-12',
                    formData.confirmPassword && formData.password !== formData.confirmPassword && 'border-danger'
                  )}
                  placeholder="••••••••"
                  required
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-danger text-sm mt-1">Password tidak cocok</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-white/20 bg-surface text-accent focus:ring-accent"
                required
              />
              <label htmlFor="agree" className="ml-2 text-sm text-text-secondary">
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-accent hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="/privacy" className="text-accent hover:underline">Kebijakan Privasi</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !allRequirementsMet || formData.password !== formData.confirmPassword}
              className={cn('btn btn-primary w-full', isLoading && 'opacity-70')}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Daftar
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
            Daftar dengan Google
          </button>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Masuk
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
