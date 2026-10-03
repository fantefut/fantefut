import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import "./globals.css";
import CookieBanner from "./CookieBanner";

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
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
        {/* 🚀 GOOGLE ADSENSE ENTEGRASYONU */}
        <Script
          id="adsense-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8150936873067102"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 🚨 ONESIGNAL WEB PUSH BİLDİRİM MOTORU (v16 Next.js Uyumlu Güncel Sürüm) */}
<Script
  src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
  strategy="afterInteractive"
/>
<Script id="onesignal-init" strategy="afterInteractive">
  {`
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
      // 1. OneSignal Başlatma Ayarları
      await OneSignal.init({
        appId: "38de0f5b-33a3-44f7-81c8-3a0cde9966b9",
        allowLocalhostAsSecureOrigin: true // Lokal testlerde HTTPS kilidine takılmamak için
      });

      // 2. Bildirim İzin Kutusu Tetikleyicisi
      // Kullanıcı siteye girdikten 2 saniye sonra prompt kutusunu yumuşakça fırlatır
      setTimeout(async () => {
        try {
          if (OneSignal.Notifications && !OneSignal.Notifications.permission) {
            console.log("FanteFut: OneSignal İzin İstemi Tetikleniyor...");
            await OneSignal.Notifications.requestPermission();
          } else {
            // OneSignal v16 modern slidedown tetikleme kanalı
            await OneSignal.Slidedown.prompt();
          }
        } catch (error) {
          console.error("FanteFut: OneSignal Prompt Hatası:", error);
        }
      }, 2000);
    });
  `}
</Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
      <GoogleAnalytics gaId="G-4NY71KD8TD" />
    </html>
  );
}
