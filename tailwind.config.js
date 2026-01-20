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
      // Terracotta Bohemian
      colors: {
        primary: '#9A3412',   // Merah Bata/Terracotta
        dark: '#431407',      // Cokelat Kopi
        accent: '#B45309',    // Tembaga/Amber
        light: '#FFEDD5',     // Krem Persik
        paper: '#FFF7ED',     // Warm White
        text: '#78350F',      // Cokelat Kayu
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