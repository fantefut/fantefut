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
        {/* 🚀 GOOGLE ADSENSE ENTEGRASYONU (Eksiksiz Tam URL Yapısı) */}
        <Script
          id="adsense-init"
          src="https://googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8150936873067102"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 🚨 5. GÜN: ONESIGNAL WEB PUSH BİLDİRİM MOTORU (v16 Güncel Tetikleyici Yapısı) */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
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
              
              // ⚡️ v16 Standartlarına Uygun Güvenli İzin İsteme Tetikleyicisi
              if (OneSignal.Notifications && !OneSignal.Notifications.permission) {
                await OneSignal.Notifications.requestPermission();
              }
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
