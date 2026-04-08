'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Vote, Users, Image, cn } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Beranda' },
  { href: '/trips', icon: Map, label: 'Trip' },
  { href: '/voting', icon: Vote, label: 'Voting' },
  { href: '/komunitas', icon: Users, label: 'Komunitas' },
  { href: '/galeri', icon: Image, label: 'Galeri' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[56px]',
                isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
