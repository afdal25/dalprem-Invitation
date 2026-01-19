'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Users, User, X } from 'lucide-react'; // MessageSquare dihapus
import { supabase } from '@/lib/supabase'; 
import { CLIENT_SLUG } from '@/lib/config';

export default function RSVP() {
  
  // Hapus 'message' dari state
  const [formData, setFormData] = useState({
    name: '',
    status: '', 
    pax: 1
  });
  
  // State untuk mode input manual pax
  const [isManualPax, setIsManualPax] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler Dropdown Pax
  const handlePaxChange = (e) => {
    const val = e.target.value;
    if (val === 'manual') {
        setIsManualPax(true);
        setFormData(prev => ({ ...prev, pax: '' }));
    } else {
        setFormData(prev => ({ ...prev, pax: val }));
    }
  };

  const resetPaxMode = () => {
      setIsManualPax(false);
      setFormData(prev => ({ ...prev, pax: 1 }));
  };

  const handleStatus = (status) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!formData.name || !formData.status) {
      setErrorMsg('Mohon isi Nama dan Konfirmasi Kehadiran.');
      return;
    }

    if (formData.status === 'Hadir' && (!formData.pax || formData.pax < 1)) {
        setErrorMsg('Mohon isi jumlah tamu yang akan hadir.');
        return;
    }

    setIsSubmitting(true);

    try {
      // Hapus field 'message' dari payload insert
      const { error } = await supabase
        .from('rsvp')
        .insert([
          {
            slug: CLIENT_SLUG,
            name: formData.name,
            status: formData.status,
            total_pax: formData.status === 'Hadir' ? parseInt(formData.pax) : 0,
            // message: dihapus, karena sudah ada di Wishes.js
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', status: '', pax: 1 }); // Reset form
      setIsManualPax(false);

    } catch (err) {
      console.error('Error:', err);
      setErrorMsg('Maaf, terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cinematicVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(5px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const viewportSettings = { once: false, amount: 0.3 };

  return (
    <section className="py-24 md:py-32 bg-[#1B4D3E] text-[#FDFBF7] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={cinematicVariant}
          className="text-center mb-12"
        >
          <p className="font-heading text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-semibold">
            RSVP
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-[#F3E5AB] mb-4">
            Konfirmasi Kehadiran
          </h2>
          <p className="font-body text-slate-300 text-sm md:text-base max-w-lg mx-auto">
            Kehadiran Anda adalah kado terindah bagi kami. Mohon isi formulir di bawah ini untuk konfirmasi kehadiran.
          </p>
        </motion.div>

        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={viewportSettings}
           variants={cinematicVariant}
           className="bg-[#0f2e24]/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

           <AnimatePresence mode="wait">
             
             {!isSuccess ? (
               <motion.form 
                 key="form"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, x: -50 }}
                 onSubmit={handleSubmit}
                 className="space-y-6"
               >
                  {/* INPUT NAMA */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" size={18} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        className="w-full bg-black/20 border border-[#D4AF37]/20 rounded-xl py-4 pl-12 pr-4 text-[#F3E5AB] placeholder:text-slate-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* INPUT STATUS */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold ml-1">Apakah Anda akan hadir?</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                       {['Hadir', 'Maaf Tidak', 'Ragu-ragu'].map((option) => (
                         <button
                           key={option}
                           type="button"
                           onClick={() => handleStatus(option === 'Maaf Tidak' ? 'Tidak Hadir' : option)}
                           className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all duration-300 ${
                             (formData.status === (option === 'Maaf Tidak' ? 'Tidak Hadir' : option))
                               ? 'bg-[#D4AF37] text-[#1B4D3E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                               : 'bg-transparent text-slate-400 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#F3E5AB]'
                           }`}
                         >
                           {option}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* INPUT JUMLAH PAX */}
                  <AnimatePresence>
                    {formData.status === 'Hadir' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold ml-1">Jumlah Orang</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" size={18} />
                          
                          {isManualPax ? (
                              <div className="relative">
                                <input 
                                    type="number"
                                    name="pax"
                                    value={formData.pax}
                                    onChange={handleChange}
                                    placeholder="Masukkan jumlah..."
                                    min="1"
                                    autoFocus
                                    className="w-full bg-black/20 border border-[#D4AF37]/20 rounded-xl py-4 pl-12 pr-12 text-[#F3E5AB] focus:border-[#D4AF37] outline-none appearance-none"
                                />
                                <button 
                                    type="button"
                                    onClick={resetPaxMode}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                              </div>
                          ) : (
                              <div className="relative">
                                <select 
                                    name="pax"
                                    value={formData.pax}
                                    onChange={handlePaxChange}
                                    className="w-full bg-black/20 border border-[#D4AF37]/20 rounded-xl py-4 pl-12 pr-4 text-[#F3E5AB] focus:border-[#D4AF37] outline-none appearance-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num} className="bg-[#1B4D3E] text-[#F3E5AB]">{num} Orang</option>
                                    ))}
                                    <option value="manual" className="bg-[#1B4D3E] text-[#D4AF37] font-bold">Lebih dari 5 (Isi Sendiri)...</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">▼</div>
                              </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* KOLOM UCAPAN DIHAPUS DI SINI */}

                  {errorMsg && (
                    <p className="text-red-400 text-xs text-center bg-red-900/20 p-2 rounded-lg border border-red-500/20">{errorMsg}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b8952b] text-[#1B4D3E] font-heading font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Konfirmasi <Send size={18} />
                      </>
                    )}
                  </button>

               </motion.form>
             ) : (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center py-10"
               >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-400 rounded-full mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="font-heading text-3xl text-[#D4AF37] mb-3">Terima Kasih!</h3>
                  <p className="font-body text-slate-300 mb-8">
                    Konfirmasi kehadiran Anda telah kami terima.<br/>
                    Jangan lupa mengisi doa & ucapan di kolom buku tamu di bawah ya.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#D4AF37] underline hover:text-white transition-colors"
                  >
                    Kirim lagi untuk tamu lain
                  </button>
               </motion.div>
             )}

           </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}