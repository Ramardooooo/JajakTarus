import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'GunungKita - Komunitas Pendaki Indonesia',
  description: 'Platform komunitas pendaki Indonesia. Booking trip pendakian, voting gunung favorit, dan sharing pengalaman bersama.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20 pb-20 md:pb-0">
          {children}
        </main>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
