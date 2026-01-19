'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';

// --- DATA CERITA CINTA (Silakan edit isinya) ---
const storyData = [
  {
    year: "2018",
    title: "Pertemuan Pertama",
    desc: "Kami pertama kali bertemu di sebuah kedai kopi kecil di Jakarta. Tatapan mata yang tak sengaja, berujung pada perkenalan yang canggung namun manis."
  },
  {
    year: "2019",
    title: "Menjalin Kasih",
    desc: "Setelah satu tahun berteman, kami menyadari ada rasa yang lebih. Di bawah langit senja, kami memutuskan untuk memulai lembaran baru sebagai sepasang kekasih."
  },
  {
    year: "2023",
    title: "Lamaran",
    desc: "Sebuah kejutan manis di hari ulang tahun. Dengan cincin di tangan, ia meminta izin untuk menjadi teman hidup selamanya. Dan jawabannya adalah 'Ya'."
  },
  {
    year: "2026",
    title: "The Wedding",
    desc: "Hari ini, kami mengikat janji suci untuk saling mencintai, menjaga, dan menua bersama hingga maut memisahkan."
  }
];

export default function LoveStory() {

  // --- ANIMASI CINEMATIC (Zoom + Blur + Replay) ---
  const cardVariant = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,        // Zoom Out
      filter: "blur(5px)" // Blur
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const viewportSettings = { once: false, amount: 0.3 }; // Replay Aktif

  return (
    // Background Gelap (#1B4D3E) untuk kontras dengan section sebelumnya
    <section className="py-24 md:py-32 bg-[#1B4D3E] text-[#FDFBF7] relative overflow-hidden">
      
      {/* ORNAMEN BACKGROUND */}
      {/* Cahaya Emas Samar di pojok */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* HEADER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cardVariant}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]">
            <Heart fill="currentColor" size={32} className="animate-pulse"/>
          </div>
          <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-bold">
            Our Journey
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-[#F3E5AB]">
            Kisah Cinta
          </h2>
        </motion.div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          
          {/* GARIS TENGAH (Vertikal) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent md:-translate-x-1/2"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {storyData.map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={cardVariant}
                // Layout: Mobile (rata kiri) | Desktop (Zig-zag: Genap Kiri, Ganjil Kanan)
                className={`relative flex flex-col md:flex-row items-center md:justify-between ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* BAGIAN KOSONG (Penyeimbang untuk desktop) */}
                <div className="hidden md:block w-5/12"></div>

                {/* TITIK TIMELINE (Lingkaran Tengah) */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-[#1B4D3E] shadow-[0_0_15px_rgba(212,175,55,0.6)] z-10 md:-translate-x-1/2 transform -translate-x-2"></div>

                {/* KARTU KONTEN */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                   <div className={`p-6 md:p-8 rounded-2xl border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-500 relative group text-left ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left' // Teks rata kanan/kiri di desktop
                   }`}>
                      
                      {/* Tahun (Badge) */}
                      <div className={`inline-block px-4 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold mb-4 border border-[#D4AF37]/20`}>
                        <span className="flex items-center gap-2">
                           <Calendar size={12} /> {item.year}
                        </span>
                      </div>

                      {/* Judul Cerita */}
                      <h3 className="font-heading text-2xl md:text-3xl text-[#F3E5AB] mb-3 font-bold group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Deskripsi */}
                      <p className="font-body text-slate-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Hiasan Sudut (Kecil) */}
                      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                   </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* QUOTE PENUTUP */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={viewportSettings}
           variants={cardVariant}
           className="text-center mt-24 opacity-70"
        >
           <p className="font-script text-3xl text-[#D4AF37]">
             "Every love story is beautiful, but ours is my favorite."
           </p>
        </motion.div>

      </div>
    </section>
  );
}