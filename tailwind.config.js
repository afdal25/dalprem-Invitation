/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Tambahkan baris SRC ini (untuk jaga-jaga jika file ada di dalam folder src)
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Path standar
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Tambahkan juga ini jika folder komponen Anda bernama 'component' (tanpa s)
    "./component/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // Royal Emerald Series
      colors: {
  primary: '#1B4D3E',   // Hijau Zamrud (Cover/Button)
  dark: '#0f2e24',      // Hijau Gelap (Footer)
  accent: '#D4AF37',    // Emas Mewah (Judul)
  light: '#F3E5AB',     // Krem Emas (Teks di background gelap)
  paper: '#FDFBF7',     // Putih Gading (Background Halaman)
  text: '#334155',      // Abu Gelap (Teks Bacaan)
},
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'], 
        body: ['var(--font-lato)', 'sans-serif'],    
        script: ['var(--font-great-vibes)', 'cursive'],   
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}