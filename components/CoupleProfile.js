'use client';

import { motion } from 'framer-motion';

export default function CoupleProfile() {
  
  // --- KONFIGURASI ANIMASI CINEMATIC ---
  const cinematicVariant = {
    hidden: { 
      opacity: 0, 
      y: 50,           
      scale: 0.8,      // ZOOM OUT (Mulai dari kecil)
      filter: "blur(10px)" // BLUR (Mulai dari buram)
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,        // UKURAN NORMAL
      filter: "blur(0px)", // JADI TAJAM
      transition: { 
        duration: 1.2, 
        ease: "easeOut" 
      } 
    }
  };

  // Setting Viewport agar animasi bisa di-replay
  // once: false -> Animasi jalan setiap kali di-scroll
  // amount: 0.3 -> Animasi mulai saat 30% elemen terlihat
  const viewportSettings = { once: false, amount: 0.3 };

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Watermark '&' Raksasa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[40rem] font-script text-[#D4AF37] opacity-[0.04] select-none pointer-events-none z-0 leading-none">
        &
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings} // REPLAY AKTIF
          variants={cinematicVariant}
          className="text-center mb-16"
        >
          <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            The Groom & The Bride
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-[#1B4D3E] mb-6 drop-shadow-sm">
            Mempelai
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full opacity-70"></div>
        </motion.div>

        {/* AYAT SUCI */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={viewportSettings} // REPLAY AKTIF
           variants={cinematicVariant}
           className="max-w-2xl mx-auto text-center mb-20 bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-[#D4AF37]/20 shadow-sm"
        >
           <p className="font-heading text-[#1B4D3E] text-lg md:text-xl leading-relaxed italic mb-6">
             "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya..."
           </p>
           <p className="font-heading text-[#D4AF37] font-bold tracking-widest text-sm uppercase">
             (QS. Ar-Rum: 21)
           </p>
        </motion.div>

        {/* --- GRID FOTO MEMPELAI --- */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
           
           {/* FOTO PRIA */}
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={viewportSettings} // REPLAY AKTIF
             variants={cinematicVariant}
             className="text-center group w-full max-w-xs"
           >
              {/* Frame Foto */}
              <div className="relative w-full aspect-[3/4] mx-auto overflow-hidden rounded-t-[10rem] border-[3px] border-[#D4AF37]/30 p-2 shadow-xl bg-white transition-all duration-500 hover:border-[#D4AF37]">
                 <div className="w-full h-full rounded-t-[9.5rem] overflow-hidden relative">
                    <img 
                      src="/img/groom.jpg" 
                      alt="Romeo" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                 </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-script text-4xl md:text-5xl font-bold text-[#1B4D3E] mb-3">Romeo Montague</h3>
                <p className="font-body text-slate-500 text-sm leading-relaxed">
                  Putra tercinta dari <br/>
                  <span className="font-bold text-[#1B4D3E]">Bpk. Montague & Ibu Lady</span>
                </p>
                <a href="#" className="inline-block mt-3 px-4 py-1 border border-[#D4AF37]/50 rounded-full text-[10px] text-[#D4AF37] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors">
                  @romeo_montague
                </a>
              </div>
           </motion.div>

           {/* Simbol '&' Tengah */}
           <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={viewportSettings} // REPLAY AKTIF
             transition={{ delay: 0.5, duration: 0.5 }}
             className="font-script text-7xl text-[#D4AF37] hidden md:block opacity-50 -mt-20"
           >
             &
           </motion.div>

           {/* FOTO WANITA */}
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={viewportSettings} // REPLAY AKTIF
             variants={cinematicVariant}
             className="text-center group w-full max-w-xs"
           >
              {/* Frame Foto */}
              <div className="relative w-full aspect-[3/4] mx-auto overflow-hidden rounded-t-[10rem] border-[3px] border-[#D4AF37]/30 p-2 shadow-xl bg-white transition-all duration-500 hover:border-[#D4AF37]">
                 <div className="w-full h-full rounded-t-[9.5rem] overflow-hidden relative">
                    <img 
                      src="/img/bride.jpg" 
                      alt="Juliet" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                 </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-script text-4xl md:text-5xl font-bold text-[#1B4D3E] mb-3">Juliet Capulet</h3>
                <p className="font-body text-slate-500 text-sm leading-relaxed">
                  Putri tercinta dari <br/>
                  <span className="font-bold text-[#1B4D3E]">Bpk. Capulet & Ibu Lady</span>
                </p>
                 <a href="#" className="inline-block mt-3 px-4 py-1 border border-[#D4AF37]/50 rounded-full text-[10px] text-[#D4AF37] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors">
                  @juliet_capulet
                </a>
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  )
}