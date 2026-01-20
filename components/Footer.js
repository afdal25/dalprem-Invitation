'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowUp, Instagram } from 'lucide-react';

export default function Footer() {

  // Fungsi Scroll ke Atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animasi
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <footer className="relative bg-dark text-light pt-20 pb-10 overflow-hidden border-t border-accent/30">
      
      {/* BACKGROUND ORNAMEN */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-script text-accent opacity-[0.03] select-none pointer-events-none whitespace-nowrap z-0">
        Thank You
      </div>
      
      {/* Cahaya Glow di bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-accent/5 rounded-t-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* --- KONTEN UTAMA --- */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false }}
           variants={fadeUpVariant}
        >
           {/* Ikon Hati Berdenyut */}
           <div className="flex justify-center mb-6">
              <Heart fill="currentColor" className="text-accent animate-pulse" size={24} />
           </div>

           {/* Ucapan Penutup */}
           <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
             Terima Kasih
           </h3>
           <p className="font-body text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
             Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
           </p>

           {/* Nama Mempelai */}
           <h2 className="font-script text-5xl md:text-7xl text-accent mb-8 drop-shadow-sm">
             Romeo & Juliet
           </h2>

           {/* Keluarga Besar */}
           <div className="font-heading text-xs uppercase tracking-widest text-slate-400 mb-12 space-y-2">
             <p>Keluarga Besar Bpk. Montague & Ibu Lady</p>
             <p>&</p>
             <p>Keluarga Besar Bpk. Capulet & Ibu Lady</p>
           </div>
        </motion.div>

        {/* --- DIVIDER --- */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8"></div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-slate-500 font-heading">
           
           {/* Copyright */}
           <p>
             © 2026 Romeo & Juliet Wedding. All Rights Reserved.
           </p>

           {/* Credit Developer */}
           <p className="flex items-center gap-1">
             Made with <Heart size={10} fill="currentColor" className="text-red-500" /> by
             <span className="text-accent font-bold">Dal Premium</span>
           </p>

        </div>

      </div>

      {/* --- TOMBOL BACK TO TOP (Floating) --- */}
      <motion.button
        onClick={scrollToTop}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-accent text-primary rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent/40 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
        aria-label="Back to Top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </motion.button>

    </footer>
  );
}