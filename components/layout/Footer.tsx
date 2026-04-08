import Link from 'next/link';
import { Mountain, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const footerLinks = {
  trip: [
    { label: 'Trip Populer', href: '/trips' },
    { label: 'Paket Hemat', href: '/trips?filter=promo' },
    { label: 'Upcoming Trip', href: '/trips?filter=upcoming' },
    { label: 'Custom Trip', href: '/contact' },
  ],
  komunitas: [
    { label: 'Forum', href: '/komunitas' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Jajak Pendapat', href: '/voting' },
    { label: 'Event', href: '/events' },
  ],
  about: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Tim Guide', href: '/team' },
    { label: 'Testimoni', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
    { label: 'Hubungi Kami', href: '/contact' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="hidden md:block bg-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">Gunung<span className="text-accent">Kita</span></span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Setiap Langkah Menuju Puncak, Satu Langkah Menuju Dirimu. Bergabunglah dengan komunitas pendaki terbesar di Indonesia.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Trip Kami</h4>
            <ul className="space-y-3">
              {footerLinks.trip.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Komunitas</h4>
            <ul className="space-y-3">
              {footerLinks.komunitas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Tentang</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat 10220</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@gunungkita.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © 2026 GunungKita. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-text-secondary hover:text-accent transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-sm text-text-secondary hover:text-accent transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
