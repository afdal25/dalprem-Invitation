'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CLIENT_SLUG } from '@/lib/config'; // 1. IMPORT SLUG
import { Send, MessageCircle, PenTool, Clock, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. FETCH DATA AWAL ---
  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .eq('slug', CLIENT_SLUG) // 2. FILTER DATA BERDASARKAN SLUG
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (data) setWishes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishes();

    // --- 2. REALTIME LISTENER ---
    const channel = supabase
      .channel(`public:wishes:${CLIENT_SLUG}`) // Gunakan nama channel unik
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'wishes',
          filter: `slug=eq.${CLIENT_SLUG}` // 3. FILTER REALTIME BERDASARKAN SLUG
        }, 
        (payload) => {
          setWishes((prev) => {
            const exists = prev.find(item => item.id === payload.new.id);
            if (exists) return prev; 
            return [payload.new, ...prev];
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // --- 3. SUBMIT DATA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([
          { 
              slug: CLIENT_SLUG, // 4. MASUKKAN SLUG SAAT INSERT
              name: form.name, 
              message: form.message 
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setWishes((prev) => [data, ...prev]);
        setForm({ name: '', message: '' });
      }

    } catch (err) {
      console.error("Error sending wish:", err);
      alert('Gagal mengirim ucapan. Pastikan koneksi aman.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HELPER FORMAT TANGGAL ---
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date).replace('.', ':') + ' WIB';
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

  // --- RETURN JSX (TIDAK ADA PERUBAHAN TAMPILAN) ---
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[15rem] font-script text-[#D4AF37] opacity-[0.03] select-none pointer-events-none z-0 leading-none">
        Wishes
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]">
             <MessageCircle size={32} />
          </div>
          <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            Prayers & Wishes
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-[#1B4D3E] mb-4">
            Doa & Ucapan
          </h2>
          <p className="font-body text-slate-500 max-w-lg mx-auto">
            Tuliskan doa restu Anda untuk mengiringi perjalanan cinta kami.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          
          {/* KOLOM KIRI: FORMULIR */}
          <motion.div 
            className="md:col-span-5 sticky top-24"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={cinematicVariant}
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#D4AF37]/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/10 rounded-bl-[4rem]"></div>

               <h3 className="font-heading text-2xl text-[#1B4D3E] mb-6 flex items-center gap-2 font-bold">
                 <PenTool size={20} className="text-[#D4AF37]"/> Kirim Doa
               </h3>

               <form onSubmit={handleSubmit} className="space-y-5">
                 <div className="relative">
                   <User className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
                   <input
                     className="w-full bg-[#FDFBF7] border border-slate-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] font-heading text-[#1B4D3E] transition-colors placeholder:text-slate-400 font-bold"
                     placeholder="Nama Anda"
                     value={form.name}
                     onChange={(e) => setForm({...form, name: e.target.value})}
                     required
                     disabled={isSubmitting}
                   />
                 </div>
                 <div className="relative">
                   <MessageCircle className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
                   <textarea
                     className="w-full bg-[#FDFBF7] border border-slate-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] font-body text-slate-600 h-32 resize-none transition-colors placeholder:text-slate-400"
                     placeholder="Tuliskan doa terbaik..."
                     value={form.message}
                     onChange={(e) => setForm({...form, message: e.target.value})}
                     required
                     disabled={isSubmitting}
                   />
                 </div>
                 <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="w-full bg-[#1B4D3E] text-white py-4 rounded-xl font-heading tracking-widest uppercase text-xs font-bold hover:bg-[#153c30] transition-all shadow-lg hover:shadow-[#1B4D3E]/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   {isSubmitting ? 'Mengirim...' : <><Send size={16}/> Kirim Ucapan</>}
                 </button>
               </form>
            </div>
          </motion.div>

          {/* KOLOM KANAN: DAFTAR UCAPAN */}
          <motion.div 
            className="md:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={cinematicVariant}
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-4 md:p-6 border border-[#D4AF37]/10 h-[600px] overflow-y-auto custom-scrollbar relative">
              
              {loading && <p className="text-center py-20 text-slate-400 italic">Memuat doa-doa...</p>}

              {!loading && wishes.length === 0 && (
                 <div className="text-center py-20 text-slate-400 flex flex-col items-center">
                    <Heart size={40} className="mb-4 opacity-20 text-[#D4AF37]"/>
                    <p>Belum ada ucapan. Jadilah yang pertama!</p>
                 </div>
              )}

              <div className="space-y-5">
                {wishes.map((wish, index) => (
                  <motion.div 
                    key={wish.id} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-md transition-all hover:border-[#D4AF37]/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    {/* Header Item */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#D4AF37]/20 flex items-center justify-center text-[#1B4D3E] font-bold font-serif shadow-sm shrink-0">
                        {wish.name ? wish.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-heading text-lg font-bold text-[#1B4D3E] leading-tight">{wish.name}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-wider font-body mt-0.5">
                          <Clock size={10} />
                          {formatDateTime(wish.created_at)}
                        </div>
                      </div>
                    </div>

                    {/* Isi Pesan */}
                    <div className="bg-[#FDFBF7] p-4 rounded-xl rounded-tl-none relative">
                        <p className="text-slate-600 text-sm font-body leading-relaxed">
                        "{wish.message}"
                        </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; opacity: 0.5; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b8952b; }
      `}</style>
    </section>
  );
}