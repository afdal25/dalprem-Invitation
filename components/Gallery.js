'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Heart } from 'lucide-react';

// --- DATA FOTO (Ganti src dengan foto asli Anda) ---
// row untuk foto panjang, col untuk foto lebar
const galleryImages = [
  { id: 1, src: '/img/gallery1.jpg', alt: 'Prewedding 1', span: 'md:col-span-1' },
  { id: 2, src: '/img/gallery2.jpg', alt: 'Prewedding 2', span: 'md:row-span-2' }, // Foto Lebar
  { id: 3, src: '/img/gallery3.jpg', alt: 'Prewedding 3', span: 'md:col-span-1' },
  { id: 4, src: '/img/gallery4.jpg', alt: 'Prewedding 4', span: 'md:col-span-1' },
  { id: 5, src: '/img/gallery5.jpg', alt: 'Prewedding 5', span: 'md:col-span-1' },
  { id: 6, src: '/img/gallery6.jpg', alt: 'Prewedding 6', span: 'md:col-span-1' },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState(null);

  // Animasi Cinematic (Sama seperti section lain)
  const cinematicVariant = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
    visible: { 
      opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const viewportSettings = { once: false, amount: 0.2 }; // Replay Aktif

  return (
    // Background Krem Terang (#FDFBF7) untuk selang-seling warna
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-10 left-0 text-[10rem] md:text-[20rem] font-script text-[#D4AF37] opacity-[0.03] select-none pointer-events-none z-0 leading-none">
        Moments
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* HEADER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
          className="text-center mb-16"
        >
           <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            Our Happy Moments
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-[#1B4D3E] mb-6 drop-shadow-sm">
            Galeri Foto
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full opacity-60"></div>
        </motion.div>

        {/* GRID GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              layoutId={`card-${img.id}`} // Untuk animasi transisi mulus ke lightbox
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={cinematicVariant}
              // Mengatur span agar ada foto yang lebar (Variasi Layout)
              className={`relative group overflow-hidden rounded-2xl cursor-pointer border border-[#D4AF37]/20 shadow-lg ${img.span}`}
              onClick={() => setSelectedId(img.id)}
            >
              {/* Gambar */}
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Hover (Efek Gelap + Ikon) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <ZoomIn size={24} />
                 </div>
              </div>

              {/* Sudut Hiasan Emas (Kecil) */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* --- LIGHTBOX (MODAL POP-UP) --- */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedId(null)} // Klik luar untuk tutup
          >
             {/* Tombol Close */}
             <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full backdrop-blur-md">
               <X size={32} />
             </button>

             {/* Container Gambar Full */}
             <motion.div 
               layoutId={`card-${selectedId}`} // Match ID dengan grid agar animasinya nyambung
               className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30"
               onClick={(e) => e.stopPropagation()} // Supaya klik gambar tidak menutup modal
             >
                <img 
                  src={galleryImages.find(img => img.id === selectedId)?.src}
                  alt="Full Preview"
                  className="w-full h-full object-contain bg-black"
                />
                
                {/* Caption Bawah (Opsional) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                   <p className="text-[#F3E5AB] font-script text-2xl">
                      Romeo & Juliet Moments
                   </p>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}