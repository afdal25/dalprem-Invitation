/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Warna Royal Emerald Series
        emerald: {
          900: '#0f2e24', // Hijau Paling Gelap (Footer)
          800: '#1B4D3E', // Hijau Utama (Background Cover)
        },
        gold: {
          DEFAULT: '#D4AF37', // Emas Mewah (Teks Judul)
          light: '#F3E5AB',   // Emas Muda / Krem (Teks Body)
        },
      },
      fontFamily: {
        // PENTING: Menghubungkan variable layout.js ke class komponen
        
        // Saat komponen panggil 'font-heading', pakai font Cormorant
        heading: ['var(--font-cormorant)', 'serif'], 
        
        // Saat komponen panggil 'font-body', pakai font Lato
        body: ['var(--font-lato)', 'sans-serif'],    
        
        // Saat komponen panggil 'font-script', pakai font Great Vibes
        script: ['var(--font-great-vibes)', 'cursive'],   
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}