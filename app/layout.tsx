import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; // 📈 Canlı takip motoru paketi aktif
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // 🎯 Google Search Console Yönlendirme Hatası Çözüm Kilitleri
  metadataBase: new URL("https://fantefut.com"),
  title: "Süper Lig Sakatlar ve Cezalılar Güncel Eksikler - FanteFut",
  description: "En güncel Süper Lig sakat ve cezalı oyuncular listesi. Oynayacak oyuncular, puan durumu, haftalık fikstür analizleri ve fantezi lig tüyoları.",
  alternates: {
    canonical: "/",
  },
  // 📱 Yüksek Çözünürlüklü Mobil & Web İkonları (Piksellenme Çözümü)
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr" // 🇹🇷 Türkçe Dil Etiketi
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
      {/* 🎯 CANLI ANALİTİK TAKİBİ: G- kodumuz Next.js altyapısına başarıyla entegre edildi */}
      <GoogleAnalytics gaId="G-4NY71KD8TD" />
    </html>
  );
}
