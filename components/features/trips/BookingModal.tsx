'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, Users, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Trip } from '@/types';
import { cn, formatPrice, formatDate, generateId } from '@/lib/utils';

interface BookingModalProps {
  trip: Trip;
  selectedDate: string;
  onClose: () => void;
}

type Step = 'form' | 'confirm' | 'payment' | 'success';

export default function BookingModal({ trip, selectedDate, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId] = useState(() => `GK${generateId().slice(0, 8).toUpperCase()}`);

  const totalPrice = trip.price * formData.participants;
  const maxParticipants = trip.maxParticipants - trip.currentParticipants;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap diperlukan';
    if (!formData.email.trim()) newErrors.email = 'Email diperlukan';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon diperlukan';
    else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) newErrors.phone = 'Nomor telepon tidak valid';
    if (formData.participants < 1) newErrors.participants = 'Minimal 1 peserta';
    if (formData.participants > maxParticipants) newErrors.participants = `Maksimal ${maxParticipants} peserta`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (step === 'form') {
      if (validateForm()) {
        setStep('confirm');
      }
    } else if (step === 'confirm') {
      setStep('payment');
    } else if (step === 'payment') {
      setTimeout(() => setStep('success'), 1500);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              {step === 'success' ? 'Booking Berhasil!' : 'Booking Trip'}
            </h2>
            <p className="text-sm text-text-secondary">{trip.title}</p>
          </div>
          {step !== 'success' && (
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          )}
        </div>

        {/* Progress */}
        {step !== 'success' && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2">
              {['form', 'confirm', 'payment'].map((s, i) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    step === s ? 'bg-accent text-white' :
                    (step === 'confirm' && i === 0) || (step === 'payment' && i <= 1)
                      ? 'bg-success text-white'
                      : 'bg-surface text-text-secondary'
                  )}>
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div className={cn(
                      'flex-1 h-0.5 mx-2',
                      (step === 'confirm' && i === 0) || (step === 'payment')
                        ? 'bg-success'
                        : 'bg-surface'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {step === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={cn('input pl-12', errors.name && 'border-danger')}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-danger text-sm mt-1">{errors.name}</p>}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn('input pl-12', errors.email && 'border-danger')}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  No. Telepon / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={cn('input pl-12', errors.phone && 'border-danger')}
                    placeholder="+62 812 3456 7890"
                  />
                </div>
                {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Jumlah Peserta
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <select
                    value={formData.participants}
                    onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
                    className={cn('input pl-12 appearance-none', errors.participants && 'border-danger')}
                  >
                    {Array.from({ length: Math.min(maxParticipants, 10) }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Orang' : 'Orang'}</option>
                    ))}
                  </select>
                </div>
                {errors.participants && <p className="text-danger text-sm mt-1">{errors.participants}</p>}
                <p className="text-xs text-text-secondary mt-1">Slot tersedia: {maxParticipants}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Alergi makanan, kondisi kesehatan, dll..."
                />
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="card p-4 bg-surface/50">
                <h3 className="font-medium text-text-primary mb-3">Detail Booking</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Trip</span>
                    <span className="text-text-primary">{trip.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tanggal</span>
                    <span className="text-text-primary">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Peserta</span>
                    <span className="text-text-primary">{formData.participants} Orang</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 bg-surface/50">
                <h3 className="font-medium text-text-primary mb-3">Data Pemesan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Nama</span>
                    <span className="text-text-primary">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email</span>
                    <span className="text-text-primary">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Telepon</span>
                    <span className="text-text-primary">{formData.phone}</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 bg-accent/10 border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary">Total Pembayaran</span>
                  <span className="font-mono text-xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {formData.participants} × {formatPrice(trip.price)}
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-xl">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-text-primary">Penting!</p>
                  <p className="text-text-secondary">
                    Booking akan dikonfirmasi setelah pembayaran diterima. Silakan lakukan pembayaran dalam 24 jam.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CreditCard className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Metode Pembayaran</h3>
                <p className="text-text-secondary text-sm">Pilih metode pembayaran yang tersedia</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Bank Transfer BCA', code: 'BCA', icon: '🏦' },
                  { name: 'Bank Transfer Mandiri', code: 'Mandiri', icon: '🏦' },
                  { name: 'OVO', code: 'OVO', icon: '📱' },
                  { name: 'GoPay', code: 'GoPay', icon: '📱' },
                  { name: 'Dana', code: 'Dana', icon: '📱' },
                ].map((method) => (
                  <button
                    key={method.code}
                    className="w-full p-4 rounded-xl border border-white/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-4"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium text-text-primary">{method.name}</p>
                      <p className="text-xs text-text-secondary">Transfer Mudah & Cepat</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                  </button>
                ))}
              </div>

              <div className="card p-4 bg-surface/50">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Bayar</span>
                  <span className="font-mono text-xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-success" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-text-primary mb-2">Booking Berhasil!</h3>
              <p className="text-text-secondary mb-6">
                Terima kasih telah memesan trip bersama kami. Detail booking telah dikirim ke email {formData.email}
              </p>
              <div className="card p-4 bg-surface/50 mb-6">
                <p className="text-sm text-text-secondary mb-1">Kode Booking</p>
                <p className="font-mono text-2xl font-bold text-accent">{bookingId}</p>
              </div>
              <div className="text-sm text-text-secondary">
                <p>Trip: {trip.title}</p>
                <p>Tanggal: {formatDate(selectedDate)}</p>
                <p>Peserta: {formData.participants} Orang</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          {step === 'form' && (
            <button onClick={handleSubmit} className="btn btn-primary w-full">
              Lanjut ke Konfirmasi
            </button>
          )}
          {step === 'confirm' && (
            <div className="flex gap-3">
              <button onClick={() => setStep('form')} className="btn btn-secondary flex-1">
                Kembali
              </button>
              <button onClick={handleSubmit} className="btn btn-primary flex-1">
                Bayar Sekarang
              </button>
            </div>
          )}
          {step === 'payment' && (
            <div className="flex gap-3">
              <button onClick={() => setStep('confirm')} className="btn btn-secondary flex-1">
                Kembali
              </button>
              <button onClick={handleSubmit} className="btn btn-primary flex-1">
                Konfirmasi Pembayaran
              </button>
            </div>
          )}
          {step === 'success' && (
            <button onClick={onClose} className="btn btn-primary w-full">
              Selesai
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
