import { Cormorant_Garamond, Lato, Great_Vibes } from 'next/font/google'
import './globals.css'
import TextureOverlay from '@/components/TextureOverlay';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant'
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-lato'
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes'
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// --- METADATA WEBSITE ---
export const metadata = {
  title: 'The Wedding of Romeo & Juliet | Royal Emerald Series',
  description: 'Undangan Pernikahan Digital Romeo & Juliet',
  icons: {
    icon: '/favicon.ico', // Pastikan Anda punya favicon (opsional)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/*
        PERHATIKAN DI SINI:
        Kita WAJIB menambahkan 'overflow-x-hidden' dan 'w-full'.
        Ini adalah instruksi ke browser untuk memotong (hide) semua elemen animasi
        yang "bocor" ke luar layar sebelum mereka masuk.
      */}
      <body className={`${cormorant.variable} ${lato.variable} ${greatVibes.variable} bg-[#FDFBF7] text-slate-800 overflow-x-hidden w-full antialiased`}>
        <TextureOverlay />
        {children}
      </body>
    </html>
  )
}