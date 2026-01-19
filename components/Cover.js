'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUp, Heart } from 'lucide-react';
// Pastikan komponen GuestName sudah dibuat di folder yang sama
import GuestName from './GuestName'; 

export default function Cover({ onOpenClicked }) {
  const containerRef = useRef(null);
  
  // --- SETUP PARALLAX BACKGROUND ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Background bergerak perlahan (0% -> 20%) saat discroll
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Variabel animasi untuk ornamen sudut
  const ornamentVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    // PENTING: 
    // 1. h-[100dvh]: Tinggi dinamis menyesuaikan layar HP (anti terpotong address bar).
    // 2. bg-[#1B4D3E]: Warna background sementara saat gambar loading (mencegah kedipan putih/biru).
    <section ref={containerRef} className="h-[100dvh] w-full relative overflow-hidden flex items-center justify-center bg-[#1B4D3E]">
      
      {/* --- LAYER 1: BACKGROUND IMAGE & GRADIENT --- */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 w-full h-[125%] z-0"
      >
        {/* Ganti dengan foto prewed/background utama Anda */}
        <img 
          src="/img/cover-bg.jpg" 
          alt="Wedding Cover Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        {/* Overlay Gradasi Hijau agar teks lebih terbaca dan dramatis */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4D3E]/50 via-[#1B4D3E]/30 to-[#1B4D3E]/90 mix-blend-multiply"></div>
      </motion.div>

      {/* --- LAYER 2: ORNAMEN SUDUT (TAMBAHAN VISUAL) --- */}
      {/* Pojok Kiri Atas */}
      <motion.div
        variants={ornamentVariant}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 w-40 md:w-64 z-10 pointer-events-none opacity-70 mix-blend-soft-light"
      >
         {/* Siapkan gambar bunga sudut transparan (PNG) */}
         {/* <img src="/img/flower-corner.png" alt="ornament" className="w-full" /> */}
      </motion.div>
      
      {/* Pojok Kanan Bawah */}
      <motion.div
         variants={ornamentVariant}
         initial="hidden"
         animate="visible"
         className="absolute bottom-0 right-0 w-40 md:w-64 z-10 pointer-events-none opacity-70 mix-blend-soft-light rotate-180"
      >
         {/* <img src="/img/flower-corner.png" alt="ornament" className="w-full" /> */}
      </motion.div>


      {/* --- LAYER 3: KONTEN UTAMA (KARTU KACA) --- */}
      <div className="relative z-20 px-4 text-center w-full max-w-[90%] md:max-w-2xl">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          // Style Kartu Kaca (Glassmorphism)
          className="bg-[#1B4D3E]/30 backdrop-blur-md p-6 py-10 md:p-14 rounded-[2.5rem] border border-[#D4AF37]/40 shadow-2xl relative mx-auto overflow-hidden"
        >
           {/* Hiasan Garis Sudut Emas di dalam kartu */}
           <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-xl opacity-80"></div>
           <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-xl opacity-80"></div>
           
           {/* Ikon Hati */}
           <div className="mb-5 text-[#D4AF37]/80 flex justify-center">
             <Heart size={22} fill="currentColor" className="animate-pulse" />
           </div>

           {/* Intro Text */}
           <p className="font-heading uppercase tracking-[0.25em] text-[#F3E5AB] text-[10px] md:text-xs mb-3 opacity-90">
             The Wedding Celebration of
           </p>

           {/* NAMA MEMPELAI (Font Script Besar) */}
           <h1 className="font-script text-6xl md:text-8xl mb-6 text-[#D4AF37] drop-shadow-lg leading-none py-2">
             Romeo <br className="md:hidden"/> <span className="text-4xl md:text-6xl text-[#F3E5AB]">&</span> Juliet
           </h1>

           {/* Tanggal Acara */}
           <div className="flex items-center justify-center gap-3 md:gap-4 font-heading uppercase tracking-[0.2em] text-xs md:text-sm text-[#F3E5AB] mb-10">
              <span>20</span>
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              <span>Oktober</span>
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              <span>2026</span>
           </div>

           {/* TOMBOL BUKA UNDANGAN (Pemicu Animasi Tirai) */}
           <button
              onClick={onOpenClicked}
              // Tombol Gradient Emas
              className="group relative px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C56C] to-[#b8952b] text-[#1B4D3E] rounded-full font-heading uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/50 hover:scale-105 transition-all duration-300 w-full md:w-auto z-20"
           >
              <span className="flex items-center justify-center gap-3">
                Buka Undangan <ArrowDown size={16} className="animate-bounce mt-0.5"/>
              </span>
           </button>

           {/* KOMPONEN NAMA TAMU (Otomatis dari URL) */}
           <div className="mt-6 relative z-10">
             <GuestName />
           </div>

        </motion.div>

      </div>
      
      {/* Indikator Scroll di bawah */}
      <motion.div 
        className="absolute bottom-6 text-[#F3E5AB]/70 z-20 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-heading animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="mb-1">Open Now</span>
        <ArrowUp size={14} />
      </motion.div>

    </section>
  );
}