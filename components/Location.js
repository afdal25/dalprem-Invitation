'use client';

import { motion } from 'framer-motion';
import { Map, Navigation, ExternalLink } from 'lucide-react';

export default function Location() {

  // --- CONFIG ANIMASI CINEMATIC ---
  const cinematicVariant = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9, 
      filter: "blur(5px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const viewportSettings = { once: false, amount: 0.3 };

  // Link Google Maps
  // Cara dapat embed: Buka Google Maps > Share > Embed a map > Copy HTML > Ambil src-nya saja
  const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.672695844074!2d107.6358872749965!3d-6.929694193069941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62c864627d3%3A0x6b77209930419230!2sThe%20Trans%20Luxury%20Hotel!5e0!3m2!1sen!2sid!4v1705663675000!5m2!1sen!2sid";
  
  const mapDirectLink = "https://goo.gl/maps/contohLinkLokasi";

  return (
    <section className="py-24 md:py-32 bg-paper relative overflow-hidden">
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-script text-accent opacity-[0.03] select-none pointer-events-none z-0 leading-none">
        Venue
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* HEADER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4 text-accent">
            <Map size={32} />
          </div>
          <p className="font-heading text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            Get Directions
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-primary mb-4 drop-shadow-sm">
            Peta Lokasi
          </h2>
          <p className="font-body text-slate-500 max-w-lg mx-auto">
            Kami menantikan kehadiran Anda. Mohon ikuti petunjuk peta di bawah ini untuk menuju lokasi acara dengan mudah.
          </p>
        </motion.div>

        {/* MAP CONTAINER (FRAME MEWAH) */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={viewportSettings}
           variants={cinematicVariant}
           className="relative"
        >
           {/* Frame Emas Luar */}
           <div className="absolute -inset-2 bg-gradient-to-br from-accent/50 to-accent/50 rounded-[2.5rem] blur-sm opacity-60 pointer-events-none"></div>
           
           {/* Container Peta */}
           <div className="relative bg-white p-2 md:p-4 rounded-[2rem] shadow-2xl border border-accent/30">
             
             {/* Iframe Peta */}
             <div className="w-full h-[400px] md:h-[500px] rounded-[1.5rem] overflow-hidden relative z-10 bg-slate-100">
               <iframe 
                 src={mapEmbedSrc}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale hover:grayscale-0 transition-all duration-700"
               ></iframe>
               
               {/* Overlay Interaktif */}
               <div className="absolute inset-0 bg-black/5 pointer-events-none shadow-inner"></div>
             </div>

             {/* Ornamen Sudut Frame */}
             <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-2xl pointer-events-none z-20"></div>
             <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-2xl pointer-events-none z-20"></div>
           
           </div>

           {/* TOMBOL NAVIGASI FLOATING */}
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full text-center z-30 px-4">
             <a 
               href={mapDirectLink}
               target="_blank"
               rel="noreferrer"
               className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-accent/50"
             >
               <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                 <Navigation size={20} className="text-light" />
               </div>
               <div className="text-left">
                  <p className="text-[10px] text-accent uppercase tracking-widest font-bold leading-none mb-1">Buka Aplikasi</p>
                  <p className="font-heading text-lg font-bold leading-none">Google Maps</p>
               </div>
               <ExternalLink size={16} className="ml-2 opacity-50 group-hover:opacity-100" />
             </a>
           </div>

        </motion.div>

        {/* INFO ALAMAT TAMBAHAN */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={viewportSettings}
           variants={cinematicVariant}
           className="mt-16 text-center"
        >
           <div className="inline-block px-8 py-4 bg-white border border-accent/20 rounded-xl shadow-sm">
             <h3 className="font-heading text-xl font-bold text-primary mb-1">The Trans Luxury Hotel</h3>
             <p className="font-body text-slate-500 text-sm">Jl. Gatot Subroto No. 289, Bandung</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
}