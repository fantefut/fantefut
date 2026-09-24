import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script'; // 🚀 Next.js'in performanslı script mimarisini dahil ettik
import "./globals.css";
import CookieBanner from "./CookieBanner"; // 🍪 Ayrı dosyadan güvenle çağırıyoruz

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://fantefut.com"),
  title: "Süper Lig Sakatlar ve Cezalılar Güncel Eksikler - FanteFut",
  description: "En güncel Süper Lig sakat ve cezalı oyuncular listesi. Oynayacak oyuncular, puan durumu, haftalık fikstür analizleri ve fantezi lig tüyoları.",
  alternates: {
    canonical: "/",
  },
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
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* 🚀 GOOGLE ADSENSE ANA BAĞLANTI KODU ENTEGRASYONU (Tam ve Güvenli Sürüm) */}
        <Script
          id="adsense-init"
          src="https://googlesyndication.com"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Site açılış hızını korumak için arka planda yüklenmesini sağlar
        />

        {/* 🚨 5. GÜN: ONESIGNAL WEB PUSH BİLDİRİM MOTORU ENTEGRASYONU */}
        <Script
          src="https://onesignal.com"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            window.OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "38de0f5b-33a3-44f7-81c8-3a0cde9966b9",
                allowLocalhostAsSecureOrigin: true, // Yerelde test edebilmemiz için şart
                notifyButton: {
                  enable: false, // Sağ alttaki default çirkin zili kapatıp temiz prompt kurguluyoruz
                }
              });
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* 🍪 Mikro AdSense Yasal Onay Barı */}
        <CookieBanner />
      </body>
      <GoogleAnalytics gaId="G-4NY71KD8TD" />
    </html>
  );
}
