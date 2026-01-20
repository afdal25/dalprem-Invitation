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
    icon: '/favicon.ico', // Logo kecil di tab browser
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${cormorant.variable} ${lato.variable} ${greatVibes.variable} bg-[#FDFBF7] text-slate-800 overflow-x-hidden w-full antialiased`}>
        <TextureOverlay />
        {children}
      </body>
    </html>
  )
}