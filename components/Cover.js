'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUp, Heart } from 'lucide-react';
import GuestName from './GuestName'; 

export default function Cover({ onOpenClicked }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const ornamentVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <section ref={containerRef} className="h-[100dvh] w-full relative overflow-hidden flex items-center justify-center bg-primary">
      
      {/* --- LAYER 1: BACKGROUND --- */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 w-full h-[125%] z-0"
      >
        <img 
          src="/img/cover-bg.jpg" 
          alt="Wedding Cover Background" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/90 mix-blend-multiply"></div>
      </motion.div>

      {/* --- LAYER 2: ORNAMEN SUDUT --- */}
      <motion.div
        variants={ornamentVariant}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 w-40 md:w-64 z-10 pointer-events-none opacity-70 mix-blend-soft-light"
      >
      </motion.div>
      
      <motion.div
         variants={ornamentVariant}
         initial="hidden"
         animate="visible"
         className="absolute bottom-0 right-0 w-40 md:w-64 z-10 pointer-events-none opacity-70 mix-blend-soft-light rotate-180"
      >
      </motion.div>


      {/* --- LAYER 3: KONTEN UTAMA --- */}
      <div className="relative z-20 px-4 text-center w-full max-w-[90%] md:max-w-2xl">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="bg-primary/30 backdrop-blur-md p-6 py-10 md:p-14 rounded-[2.5rem] border border-accent/40 shadow-2xl relative mx-auto overflow-hidden"
        >
           {/* Hiasan Garis Sudut */}
           <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-accent/60 rounded-tl-xl opacity-80"></div>
           <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-accent/60 rounded-br-xl opacity-80"></div>
           
           {/* --- ICON LOVE --- */}
           <div className="mb-5 text-light flex justify-center">
             <Heart size={22} fill="currentColor" className="animate-pulse" />
           </div>

           {/* Intro Text */}
           <p className="font-heading uppercase tracking-[0.25em] text-light text-[10px] md:text-xs mb-3 opacity-90">
             The Wedding Celebration of
           </p>

           {/* --- NAMA & SIMBOL --- */}
           <h1 className="font-script text-6xl md:text-8xl mb-6 text-light drop-shadow-lg leading-none py-2">
             Romeo 
             <br className="md:hidden"/> 
             <span className="text-4xl md:text-6xl text-text mx-2">&</span> 
             Juliet
           </h1>

           {/* Tanggal Acara */}
           <div className="flex items-center justify-center gap-3 md:gap-4 font-heading uppercase tracking-[0.2em] text-xs md:text-sm text-light mb-10">
              <span>20</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              <span>Oktober</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              <span>2026</span>
           </div>

           {/* TOMBOL BUKA UNDANGAN */}
           <button
              onClick={onOpenClicked}
              className="group relative px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-accent via-light to-accent text-primary rounded-full font-heading uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold shadow-lg shadow-accent/20 hover:shadow-accent/50 hover:scale-105 transition-all duration-300 w-full md:w-auto z-20"
           >
              <span className="flex items-center justify-center gap-3">
                Buka Undangan <ArrowDown size={16} className="animate-bounce mt-0.5"/>
              </span>
           </button>

           {/* KOMPONEN NAMA TAMU */}
           <div className="mt-6 relative z-10">
             <GuestName />
           </div>

        </motion.div>

      </div>
    </section>
  );
}