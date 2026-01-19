'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Disc } from 'lucide-react';

// Import semua komponen
import Cover from '@/components/Cover';
import CoupleProfile from '@/components/CoupleProfile';
import LoveStory from '@/components/LoveStory';
import Gallery from '@/components/Gallery';
import EventDetail from '@/components/EventDetail';
import Location from '@/components/Location';
import RSVP from '@/components/RSVP';
import Gift from '@/components/Gift';
import Wishes from '@/components/Wishes';
import Footer from '@/components/Footer';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Efek: Kunci Scroll body secara permanen jika belum dibuka
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
  }, [isOpen]);

  const openInvitation = () => {
    setIsOpen(true); // 1. Memicu animasi tirai naik

    // 2. Putar Musik
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Autoplay blocked:", error);
          setIsPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Play error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // PERBAIKAN DI SINI:
    // Saya menambahkan "overflow-x-hidden" dan "w-full"
    // Ini mencegah halaman bisa digeser ke kanan/kiri (double protection)
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#FDFBF7] text-slate-800 font-body">
      
      {/* Background Music */}
      <audio ref={audioRef} src="/assets/musik.mp3" loop preload="auto" />

      {/* --- BAGIAN COVER (TIRAI NAIK) --- */}
      <div 
        className={`fixed inset-0 w-full h-full z-50 bg-slate-900 transition-transform duration-1000 ease-in-out ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <Cover onOpenClicked={openInvitation} />
      </div>

      {/* --- ISI KONTEN UTAMA --- */}
      <div className="relative z-0">
        <CoupleProfile />
        <LoveStory />
        <Gallery />
        <EventDetail />
        <Location />
        <RSVP />
        <Wishes />
        <Gift />
        <Footer />
      </div>

      {/* TOMBOL MUSIK (Floating) */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <button 
          onClick={toggleMusic}
          className={`bg-white/90 backdrop-blur border border-[#D4AF37] p-3 rounded-full shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-110 ${isPlaying ? 'animate-spin-slow' : ''}`}
          style={{ animationDuration: '3s' }}
        >
          {isPlaying ? (
            <Disc className="text-[#D4AF37]" size={24} />
          ) : (
            <Play className="text-slate-500 ml-1" size={24} />
          )}
        </button>
      </div>

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}