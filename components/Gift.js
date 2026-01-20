'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift as GiftIcon, MapPin } from 'lucide-react';

export default function Gift() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // --- DATA REKENING DENGAN LOGO & WARNA ASLI ---
  const giftData = [
    {
      id: 1,
      bank: "BCA",
      number: "1234567890",
      name: "DAL PREMIUM",
      // Warna BCA
      color: "from-[#005E9F] to-[#003566]",
      logo: "/img/bca.png",
      darkText: false
    },
    {
      id: 2,
      bank: "MANDIRI",
      number: "0987654321",
      name: "DAL PREMIUM",
      // Warna Mandiri
      color: "from-[#FFC629] to-[#FF9F0E]", 
      logo: "/img/mandiri.png",
      darkText: true 
    },
    {
      id: 3,
      bank: "DANA",
      number: "08123456789",
      name: "DAL PREMIUM",
      // Warna DANA
      color: "from-[#118EEA] to-[#094d82]",
      logo: "/img/dana.png",
      darkText: false
    }
  ];

  const address = "Jl. Gatot Subroto No. 289, Cibangkong, Kec. Batununggal, Kota Bandung, Jawa Barat 40273";

  // --- FUNGSI COPY ---
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index); 
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  // --- ANIMASI ---
  const cinematicVariant = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(5px)", y: 30 },
    visible: { 
      opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const viewportSettings = { once: false, amount: 0.2 };

  return (
    <section className="py-24 md:py-32 bg-primary text-paper relative overflow-hidden">
      
      {/* ORNAMEN BACKGROUND */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* HEADER */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
        >
          <div className="flex justify-center mb-4 text-accent">
             <GiftIcon size={32} />
          </div>
          <p className="font-heading text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            Wedding Gift
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-light mb-6">
            Amplop Digital
          </h2>
          <p className="font-body text-slate-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara nontunai.
          </p>
        </motion.div>

        {/* --- GRID KARTU REKENING --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 justify-center">
          {giftData.map((item) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={cinematicVariant}
              // Card Styling - bg gradient tetap hardcoded karena warna bank
              className={`relative overflow-hidden rounded-2xl p-6 border border-white/20 shadow-2xl bg-gradient-to-br ${item.color} group hover:scale-[1.02] transition-transform duration-500`}
            >
              {/* Efek Kilau */}
              <div className="absolute top-0 -right-20 w-40 h-full bg-white/10 skew-x-12 blur-xl group-hover:-translate-x-80 transition-transform duration-1000"></div>

              {/* Chip Kartu */}
              <div className="w-12 h-9 bg-gradient-to-br from-[#E5C56C] to-[#b8952b] rounded-md mb-6 opacity-90 border border-light/40 shadow-sm"></div>

              {/* Logo Bank (Kanan Atas) */}
              <div className="absolute top-6 right-6 w-20 h-10 flex items-start justify-end">
                  <img 
                    src={item.logo} 
                    alt={item.bank} 
                    className={`h-full object-contain ${!item.darkText ? 'brightness-0 invert' : 'brightness-0 opacity-80'}`} 
                  />
              </div>

              {/* Nomor Rekening */}
              <p className={`font-mono text-xl md:text-2xl tracking-widest mb-1 drop-shadow-md truncate mt-8 ${item.darkText ? 'text-primary' : 'text-white'}`}>
                {item.number}
              </p>

              {/* Nama & Tombol Copy */}
              <div className="flex justify-between items-end mt-6">
                 <p className={`text-[10px] uppercase tracking-[0.2em] truncate max-w-[120px] ${item.darkText ? 'text-primary/70' : 'text-slate-200'}`}>
                    a.n {item.name}
                 </p>
                 
                 <button 
                   onClick={() => handleCopy(item.number, item.id)}
                   className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                     item.darkText 
                        ? 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white'
                        : 'bg-white/20 border border-white/40 text-white hover:bg-white hover:text-primary'
                   }`}
                 >
                   {copiedIndex === item.id ? (
                      <>Disalin <Check size={12} /></>
                   ) : (
                      <>Salin <Copy size={12} /></>
                   )}
                 </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}