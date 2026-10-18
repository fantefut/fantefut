"use client"; // Kancaların (useState, useEffect) çalışabilmesi için eklendi

import { useState, useEffect } from "react";
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

// Not: Next.js App Router'da "use client" kullanılan dosyalarda metadata bu şekilde export edilemez.
// Eğer build aşamasında hata alırsanız, bu metadata nesnesini kesip (cut) ayıracağımız bağımsız bir layout yapısına taşırız.
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
  // 🔘 Yukarı Çık Butonunun Görünürlük Durumu
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Sayfa 300 piksel aşağı kaydırıldığında butonu göster
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Yumuşak kayma efekti
    });
  };

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

        {/* 🚨 ONESIGNAL WEB PUSH BİLDİRİM MOTORU */}
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
                allowLocalhostAsSecureOrigin: true 
              });

              setTimeout(async () => {
                try {
                  const permission = await OneSignal.Notifications.permission;
                  if (!permission) {
                    console.log("FanteFut: OneSignal İzin İstemi Tetikleniyor...");
                    await OneSignal.Notifications.requestPermission();
                  } else {
                    console.log("FanteFut: Kullanıcı zaten bildirim izni vermiş.");
                  }
                } catch (error) {
                  console.error("FanteFut: OneSignal Prompt Hatası:", error);
                }
              }, 2000);
            });
          `}
        </Script>
      </head>
      
      <body className="min-h-full flex flex-col relative">
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-4NY71KD8TD" />
        
        {children}
        <CookieBanner />

        {/* 🔘 MODERN & ŞEFFAF YUKARI ÇIK BUTONU */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Yukarı Çık"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-semibold rounded-full shadow-sm hover:bg-white hover:text-green-600 transition-all duration-300 group active:scale-95"
          >
            {/* Minimalist Ok Simgesi */}
            <svg 
              xmlns="http://w3.org" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
            <span>Yukarı Çık</span>
          </button>
        )}
      </body>
    </html>
  );
}
