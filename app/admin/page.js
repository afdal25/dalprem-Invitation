'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2, CheckCircle, Lock, LogIn } from 'lucide-react';

// --- KONFIGURASI PIN RAHASIA ---
// Ganti PIN ini dengan angka yang hanya Anda yang tahu!
const SECRET_PIN = '252005'; 

export default function AdminPage() {
  // State untuk Login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPin, setInputPin] = useState('');

  // State untuk Form Data
  const [form, setForm] = useState({
    couple_name: '',
    slug: '',
    wedding_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // --- FUNGSI LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPin === SECRET_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('PIN Salah! Anda bukan Admin.');
      setInputPin('');
    }
  };

  // --- FUNGSI AUTO SLUG ---
  const handleNameChange = (e) => {
    const val = e.target.value;
    // Otomatis ubah nama jadi slug yang aman (huruf kecil, spasi jadi strip)
    const autoSlug = val.toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    setForm({ ...form, couple_name: val, slug: autoSlug });
  };

  // --- FUNGSI SUBMIT DATA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      // 1. Cek apakah Slug sudah ada?
      const { data: existing } = await supabase
        .from('clients')
        .select('slug')
        .eq('slug', form.slug)
        .single();

      if (existing) {
        alert('Gawat! Slug ini sudah dipakai klien lain. Coba ganti slugnya.');
        setLoading(false);
        return;
      }

      // 2. Jika aman, simpan ke database
      const { error } = await supabase
        .from('clients')
        .insert([
          {
            couple_name: form.couple_name,
            slug: form.slug,
            wedding_date: form.wedding_date
          }
        ]);

      if (error) throw error;

      setMsg(`Sukses! Klien ${form.couple_name} berhasil dibuat.`);
      setForm({ couple_name: '', slug: '', wedding_date: '' });

    } catch (err) {
      console.error(err);
      alert('Gagal membuat klien. Pastikan koneksi internet aman.');
    } finally {
      setLoading(false);
    }
  };

  // --- TAMPILAN 1: BELUM LOGIN (Lock Screen) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-800">
            <Lock size={32} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Admin Access</h1>
          <p className="text-slate-500 text-sm mb-6">Masukkan PIN rahasia untuk melanjutkan.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Masukkan PIN..." 
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              className="w-full text-center text-2xl tracking-widest p-3 border border-slate-300 rounded-xl focus:border-slate-800 outline-none transition-all placeholder:text-sm placeholder:tracking-normal"
              autoFocus
            />
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex justify-center items-center gap-2"
            >
              <LogIn size={18}/> Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: SUDAH LOGIN (Dashboard Form) ---
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 relative">
        
        {/* Tombol Logout Kecil */}
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="absolute top-4 right-4 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Logout
        </button>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Panel 🛠️</h1>
        <p className="text-slate-500 mb-6 text-sm">Tambah klien undangan baru di sini.</p>

        {msg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm font-bold border border-green-200">
            <CheckCircle size={16}/> {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Pasangan</label>
            <input 
              type="text" 
              placeholder="Misal: Romeo & Juliet"
              value={form.couple_name}
              onChange={handleNameChange}
              className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug URL (Unik)</label>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
              <span className="text-slate-400 text-sm font-mono">.../</span>
              <input 
                type="text" 
                placeholder="romeo-juliet"
                value={form.slug}
                onChange={(e) => setForm({...form, slug: e.target.value})}
                className="w-full bg-transparent outline-none font-mono text-blue-600 font-bold"
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">
                *Slug ini adalah ID unik klien. Jangan pakai spasi.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Pernikahan</label>
            <input 
              type="date" 
              value={form.wedding_date}
              onChange={(e) => setForm({...form, wedding_date: e.target.value})}
              className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {loading ? <Loader2 className="animate-spin"/> : <><Save size={18}/> Simpan Klien</>}
          </button>

        </form>
      </div>
    </div>
  );
}