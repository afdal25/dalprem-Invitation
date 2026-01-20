'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function Dashboard() {
  // --- STATE AUTH ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  // --- STATE GENERATOR LINK ---
  const [guestName, setGuestName] = useState('');
  const [guestCategory, setGuestCategory] = useState('Bapak/Ibu/Saudara/i');
  const [generatedLink, setGeneratedLink] = useState('');
  
  // --- STATE DATA RSVP ---
  const [rsvps, setRsvps] = useState([]);
  const [stats, setStats] = useState({ totalHadir: 0, totalPax: 0 });
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------------------
  // 1. FUNGSI LOGIN
  // ----------------------------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') { 
      setIsAuthenticated(true);
    } else {
      alert("PIN Salah! Coba lagi.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVP();
    }
  }, [isAuthenticated]);

  // ----------------------------------------------------------------
  // 2. FUNGSI GENERATOR LINK
  // ----------------------------------------------------------------
  const generateMessage = (name, link) => {
    return `*Undangan Pernikahan Romeo & Juliet* 💍
    
Kepada Yth. ${guestCategory} ${name},

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir dalam acara pernikahan kami.

Berikut link undangan kami:
${link}

Merupakan suatu kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Terima kasih,
Romeo & Juliet`;
  };

  const handleGenerate = () => {
    if (!guestName) return alert("Isi nama tamu dulu dong!");
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/?to=${encodeURIComponent(guestName)}`;
    setGeneratedLink(link);
  };

  const shareToWA = () => {
    if (!generatedLink) return;
    const message = generateMessage(guestName, generatedLink);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const copyToClipboard = () => {
    const message = generateMessage(guestName, generatedLink);
    navigator.clipboard.writeText(message);
    alert("Pesan berhasil disalin!");
  };

  // ----------------------------------------------------------------
  // 3. FUNGSI DATA RSVP
  // ----------------------------------------------------------------
  const fetchRSVP = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert("Gagal mengambil data: " + error.message);
    } else {
      setRsvps(data);
      const hadir = data.filter(r => r.status === 'Hadir');
      const totalPax = hadir.reduce((acc, curr) => acc + (Number(curr.total_pax) || 0), 0);
      setStats({ totalHadir: hadir.length, totalPax: totalPax });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!confirm("Hapus data tamu ini permanen?")) return;
    const { error } = await supabase.from('rsvp').delete().eq('id', id);
    if (!error) {
        setRsvps(rsvps.filter(item => item.id !== id));
        fetchRSVP(); 
    } else {
        alert("Gagal menghapus");
    }
  };

  // ----------------------------------------------------------------
  // UI: HALAMAN LOGIN (TEMA: HIJAU ZAMRUD ELEGAN)
  // ----------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1B4D3E] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ornamen Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin} 
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm border border-[#D4AF37]/30 relative z-10"
        >
          <div className="text-center mb-8">
            <p className="font-heading text-[#D4AF37] uppercase tracking-[0.2em] text-sm">Wedding Admin</p>
            <h1 className="font-script text-4xl text-[#1B4D3E] mt-2">Login Area</h1>
          </div>
          
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Masukkan PIN"
            className="w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/30 text-[#1B4D3E] text-center p-4 mb-8 focus:border-[#D4AF37] outline-none transition-all font-heading text-xl placeholder:text-slate-400"
          />
          
          <button type="submit" className="w-full bg-[#1B4D3E] text-white font-heading uppercase tracking-widest py-4 rounded-full shadow-lg hover:bg-[#153c30] hover:scale-105 transition-all duration-300">
            Masuk Dashboard
          </button>
        </motion.form>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // UI: DASHBOARD (TEMA: KREM & EMAS - SEPERTI BAGIAN ISI UNDANGAN)
  // ----------------------------------------------------------------
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1B4D3E] p-4 md:p-8 font-body">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
              <h1 className="font-heading text-3xl md:text-4xl text-[#1B4D3E] font-bold">Dashboard Pengantin</h1>
              <p className="text-slate-500 text-sm mt-1 italic font-serif">"Pantau kehadiran tamu dengan mudah"</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 text-xs uppercase tracking-widest border border-[#1B4D3E] rounded-full hover:bg-[#1B4D3E] hover:text-white transition-all">
            Keluar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: GENERATOR LINK --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#D4AF37]/20 sticky top-8 relative overflow-hidden">
               {/* Hiasan Sudut */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 rounded-bl-full"></div>

              <h2 className="font-heading text-xl font-bold mb-6 text-[#1B4D3E] flex items-center gap-2">
                <span>🔗</span> Buat Link Undangan
              </h2>
              
              <div className="space-y-5">
                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 text-[#D4AF37] font-bold">Nama Tamu</label>
                    <input 
                        type="text" 
                        value={guestName}
                        onChange={(e) => {
                        setGuestName(e.target.value);
                        setGeneratedLink('');
                        }}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full bg-[#FDFBF7] border-b border-[#D4AF37]/30 p-3 focus:border-[#D4AF37] outline-none transition-colors text-[#1B4D3E] font-heading text-lg placeholder:font-body placeholder:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 text-[#D4AF37] font-bold">Kategori</label>
                    <div className="relative">
                        <select 
                            value={guestCategory}
                            onChange={(e) => setGuestCategory(e.target.value)}
                            className="w-full bg-[#FDFBF7] border-b border-[#D4AF37]/30 p-3 outline-none focus:border-[#D4AF37] cursor-pointer text-[#1B4D3E] appearance-none"
                        >
                            <option>Bapak/Ibu/Saudara/i</option>
                            <option>Sahabat</option>
                            <option>Teman-teman</option>
                            <option>Keluarga Besar</option>
                        </select>
                        <div className="absolute right-3 top-4 text-[#D4AF37] pointer-events-none text-xs">▼</div>
                    </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    className="w-full bg-[#1B4D3E] hover:bg-[#153c30] text-white py-3 rounded-full font-heading uppercase tracking-widest text-xs shadow-lg shadow-[#1B4D3E]/20 mt-4 transition-all"
                >
                    Generate Link
                </button>
              </div>

              {generatedLink && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 bg-[#FDFBF7] p-4 rounded-xl border border-[#D4AF37]/30"
                >
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider mb-3 text-center">Siap Dikirim</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={shareToWA} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                      <span>💬</span> Kirim WhatsApp
                    </button>
                    <button onClick={copyToClipboard} className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <span>📋</span> Salin Teks
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* --- KOLOM KANAN: DATA RSVP --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Kartu Statistik */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D4AF37]/20 text-center">
                <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-2">Total Respon</p>
                <p className="font-heading text-4xl text-[#1B4D3E]">{rsvps.length}</p>
              </div>
              <div className="bg-[#1B4D3E] p-6 rounded-2xl shadow-lg shadow-[#1B4D3E]/20 text-center text-white">
                <p className="text-[#F3E5AB] text-[10px] uppercase tracking-widest font-bold mb-2">Hadir</p>
                <p className="font-heading text-4xl">{stats.totalHadir}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D4AF37]/20 text-center">
                <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-2">Total Pax</p>
                <p className="font-heading text-4xl text-[#1B4D3E]">{stats.totalPax}</p>
              </div>
            </div>

            {/* Tabel Data */}
            <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <h3 className="font-heading font-bold text-[#1B4D3E] text-xl flex items-center gap-2">
                  📝 Daftar Tamu
                </h3>
                <button 
                  onClick={fetchRSVP} 
                  disabled={loading}
                  className="text-xs px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
                >
                  {loading ? 'Loading...' : 'Refresh Data'}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-[#FDFBF7] text-[#1B4D3E] uppercase font-bold text-[10px] tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Nama Tamu</th>
                      <th className="px-6 py-4">Kehadiran</th>
                      <th className="px-6 py-4 text-center">Pax</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">Sedang memuat data...</td></tr>
                    ) : rsvps.length === 0 ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400">Belum ada data masuk.</td></tr>
                    ) : (
                      rsvps.map((row) => (
                        <tr key={row.id} className="hover:bg-[#FDFBF7] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-heading font-bold text-[#1B4D3E] text-lg">{row.name}</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                              {new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })} WIB
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide border ${
                              row.status === 'Hadir' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : row.status === 'Ragu-ragu'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-[#1B4D3E]">
                            {row.status === 'Hadir' ? row.total_pax : '-'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleDelete(row.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-2"
                              title="Hapus Data"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}