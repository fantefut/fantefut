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
        {/* 🚀 GOOGLE ADSENSE ENTEGRASYONU (Kusursuz ve Tam URL Yapısı) */}
        <Script
          id="adsense-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8150936873067102"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 🚨 ONESIGNAL WEB PUSH BİLDİRİM MOTORU (Canlı Mod Odaklı Kurşun Geçirmez Sürüm) */}
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
                autoRegister: true, // Tarayıcı desteklediği an otomatik kayıt mekanizmasını açar
                notifyButton: {
                  enable: false, // Temiz prompt düzeni için default çirkin zili kapatıyoruz
                }
              });
              
              // Canlı sunucudaki harf/domain uyuşmazlık kilitlerini çözen net tetikleyici fonksiyon
              const triggerPermission = async () => {
                try {
                  if (OneSignal.Notifications) {
                    await OneSignal.Notifications.requestPermission();
                  }
                } catch (e) {
                  console.log("OneSignal Tetikleme Hatası:", e);
                }
              };

              // Tarayıcı durumuna göre kodu en doğru zamanda ateşle
              if (document.readyState === "complete") {
                triggerPermission();
              } else {
                window.addEventListener("load", triggerPermission);
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
