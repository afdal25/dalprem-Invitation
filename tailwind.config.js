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
      // Sage Green Minimalist
      colors: {
  primary: '#577c68',   // Hijau Sage Lembut
  dark: '#2f4b3a',      // Hijau Hutan Pudar
  accent: '#a89f91',    // Taupe/Cokelat Abu (Emas Matte)
  light: '#f0fdf4',     // Putih Mint
  paper: '#ffffff',     // Putih Polos
  text: '#4b5563',      // Abu-abu Netral
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