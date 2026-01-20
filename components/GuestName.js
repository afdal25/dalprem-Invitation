'use client'; 

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

// pisahkan logikanya ke komponen internal agar bisa dibungkus Suspense
function GuestContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get('to');
  
  // Logic: Ganti tanda -, _, atau + menjadi spasi
  const guestName = rawName ? rawName.replace(/[-_+]/g, ' ') : 'Tamu Undangan';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }}    
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} 
      className="z-20 mt-8 text-center relative"
    >
      <p className="font-body text-[10px] md:text-xs text-light tracking-[0.2em] uppercase mb-3 opacity-80">
        Kepada Yth. Bapak/Ibu/Saudara/i:
      </p>
      
      {/* Kotak Nama dengan Desain Kaca & Border Emas */}
      <div className="bg-dark/60 backdrop-blur-md border border-accent/50 px-8 py-3 rounded-full inline-block shadow-lg shadow-primary/20">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-white capitalize tracking-wide drop-shadow-md">
          {guestName}
        </h2>
      </div>
    </motion.div>
  );
}

// Komponen Utama yang diexport (dengan Suspense agar aman saat Build)
export default function GuestName() {
  return (
    <Suspense fallback={<div className="opacity-0">Loading...</div>}>
      <GuestContent />
    </Suspense>
  );
}