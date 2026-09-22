import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
// İstemci taraflı mikro çerez barını doğrudan layout içinde çalıştırmak için Client component mimarisini çağırıyoruz
import dynamic from 'next/dynamic';

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

// 🍪 Mikro Çerez Barı Bileşeni (Kullanıcıyı kaçırmayacak, ekranda yer kaplamayan akıllı kapsül)
const MiniCookieBar = dynamic(() => Promise.resolve(function CookieBanner() {
  // İstemci tarafı kodunu Next.js Hydration hatası vermeden çalıştırmak için useEffect kontrollü yapı
  const [goster, setGoster] = typeof window !== 'undefined' ? require('react').useState(false) : [false, () => {}];

  require('react').useEffect(() => {
    const onay = localStorage.getItem('fantefut_cerez_onay');
    if (!onay) setGoster(true);
  }, []);

  if (!goster) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(19, 36, 68, 0.96)', // Saydam fantezi laciverti
      color: '#ffffff',
      padding: '6px 12px', // İyice daraltılmış iç boşluk
      borderRadius: '20px', // Kibar kapsül oval tasarım
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      width: 'calc(100% - 24px)',
      maxWidth: '400px', // Maksimum genişliği iyice kıstık, ekranda kaybolacak kadar küçük
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      fontSize: '11px' // Yazı boyutunu mini seviyeye kilitledik
    }}>
      <span style={{ textAlign: 'left', lineHeight: '1.2' }}>
        Deneyiminiz için çerez kullanıyoruz. <a href="/site-hakkinda" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Detaylar</a>
      </span>
      <button 
        onClick={() => {
          localStorage.setItem('fantefut_cerez_onay', 'true');
          setGoster(false);
        }} 
        style={{
          backgroundColor: '#60a5fa',
          color: '#132444',
          border: 'none',
          padding: '3px 10px', // Buton boyutunu minicik yaptık
          borderRadius: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '10px',
          whiteSpace: 'nowrap'
        }}
      >
        Tamam
      </button>
    </div>
  );
}), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr" // 🇹🇷 Türkçe Dil Etiketi
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* 🍪 Mikro AdSense Yasal Onay Barı Burada Çakılıyor */}
        <MiniCookieBar />
      </body>
      {/* 📈 Canlı Analitik Takip Motoru */}
      <GoogleAnalytics gaId="G-4NY71KD8TD" />
    </html>
  );
}
