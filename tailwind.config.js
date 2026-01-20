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
      // Midnight Sapphire
      colors: {
  primary: '#1e3a8a',   // Biru Navy
  dark: '#172554',      // Midnight Blue
  accent: '#94a3b8',    // Silver/Platinum
  light: '#e2e8f0',     // Putih Kebiruan
  paper: '#f8fafc',     // Putih Bersih
  text: '#334155',      // Slate Blue
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