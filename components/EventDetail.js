'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, MoveRight } from 'lucide-react';

// --- DATA ACARA ---
const events = [
  {
    id: 1,
    title: "Akad Nikah",
    date: "Minggu, 20 Oktober 2026",
    time: "08.00 WIB - Selesai",
    location: "Masjid Agung Trans Studio",
    address: "Jl. Gatot Subroto No. 289, Bandung, Jawa Barat",
    mapLink: "https://maps.google.com/?q=Masjid+Agung+Trans+Studio",
  },
  {
    id: 2,
    title: "Resepsi Pernikahan",
    date: "Minggu, 20 Oktober 2026",
    time: "11.00 WIB - 14.00 WIB",
    location: "Grand Ballroom The Trans Luxury Hotel",
    address: "Jl. Gatot Subroto No. 289, Bandung, Jawa Barat",
    mapLink: "https://maps.google.com/?q=The+Trans+Luxury+Hotel",
  }
];

export default function EventDetail() {
  
  // --- STATE COUNTDOWN ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Tanggal (Ganti sesuai tanggal nikah)
    const targetDate = new Date("2026-10-20T08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // --- ANIMASI CINEMATIC REPLAY ---
  const cinematicVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(5px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const viewportSettings = { once: false, amount: 0.3 };

  return (
    // Background Gelap (#1B4D3E)
    <section className="py-24 md:py-32 bg-[#1B4D3E] text-[#FDFBF7] relative overflow-hidden">
      
      {/* ORNAMEN BACKGROUND (Cahaya Emas) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">

        {/* --- HEADER TITLE --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
          className="text-center mb-16"
        >
          <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-4 font-bold">
            Save The Date
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-[#F3E5AB] mb-8">
            Waktu & Tempat
          </h2>

          {/* COUNTDOWN BOX */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-4 w-20 md:w-24 text-center">
                 <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                   {item.value}
                 </div>
                 <div className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                   {item.label}
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- GRID KARTU ACARA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={cinematicVariant}
              // STYLE KARTU: Glassmorphism Gelap + Border Emas
              className="group relative bg-[#0f2e24]/60 backdrop-blur-md border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-10 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              {/* Ornamen Sudut Kartu */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#D4AF37]/50 rounded-tl-xl"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#D4AF37]/50 rounded-br-xl"></div>

              {/* Header Kartu (Judul) */}
              <div className="text-center mb-8 border-b border-[#D4AF37]/20 pb-6">
                 <h3 className="font-script text-4xl md:text-5xl text-[#D4AF37] mb-2 drop-shadow-sm">
                   {event.title}
                 </h3>
              </div>

              {/* Detail List */}
              <div className="space-y-6 font-body text-slate-200">
                 
                 {/* Tanggal */}
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full text-[#D4AF37]">
                       <Calendar size={20} />
                    </div>
                    <div>
                       <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 mb-1">Tanggal</p>
                       <p className="text-lg font-medium">{event.date}</p>
                    </div>
                 </div>

                 {/* Jam */}
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full text-[#D4AF37]">
                       <Clock size={20} />
                    </div>
                    <div>
                       <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 mb-1">Waktu</p>
                       <p className="text-lg font-medium">{event.time}</p>
                    </div>
                 </div>

                 {/* Lokasi */}
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full text-[#D4AF37]">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 mb-1">Lokasi</p>
                       <p className="text-lg font-bold text-white leading-tight mb-1">{event.location}</p>
                       <p className="text-sm text-slate-400 leading-relaxed">{event.address}</p>
                    </div>
                 </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}