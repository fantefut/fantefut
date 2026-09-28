'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';

export default function SiteHakkindaSayfasi() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      
      {/* 🚀 Diğer sayfalarla birebir aynı, milimetrik eşitlenen merkezi Header bileşenimiz */}
      <Header altBaslik="Site Bilgileri & Kurumsal" />

      {/* 
        Tailwind v4 tabanlı responsive genişletme sarmalayıcısı:
        - Mobilde max-w-[650px] sınırıyla eski dar ve güvenli yapıyı korur.
        - Masaüstünde (lg:) max-w-[1024px] seviyesine açılarak kurumsal blokları genişletir.
      */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni (Kurumsal bütünlük için eklendi) */}
        <Navbar aktifSayfa="hakkinda" />

        {/* 🎯 SIKIŞTIRILMIŞ VE RESPONSIVE İÇERİK ALANI - Geniş ekran uyumlu yapıldı */}
        <div className="w-full flex flex-col gap-4 mt-4">
          
          {/* ⬅️ ANASAYFAYA DÖNÜŞ OKU */}
          <div className="px-1">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-[#132444] transition-colors group"
            >
              <svg 
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Anasayfaya Dön
            </Link>
          </div>

          {/* 📚 HAKKIMIZDA BÖLÜMÜ */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg text-[#132444] font-bold mb-2">ℹ️ Hakkımızda</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              <strong className="text-slate-800 font-bold">FanteFut</strong>, fantezi futbol oyuncuları ve futbolseverler için kurulmuş bağımsız bir bilgi platformudur. Amacımız, takımların en güncel sakat, cezalı ve kadro dışı oyuncu verilerini, form durumlarını ve istatistiklerini en hızlı ve sade şekilde fantezi futbol teknik direktörlerine sunarak kadro kurgularında doğru kararlar almalarına yardımcı olmaktır.
            </p>
          </div>

          {/* ✉️ İLETİŞİM BÖLÜMÜ */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg text-[#132444] font-bold mb-2">✉️ İletişim</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              Sitemizle ilgili her türlü soru, görüş, öneri, telif hakkı bildirimi ellerinizle veya reklam iş birlikleri için bizimle kurumsal e-posta adresimiz üzerinden doğrudan iletişime geçebilirsiniz:
              <br /><br />
              <strong className="text-slate-800 font-bold">E-posta:</strong> info.fantefut@gmail.com
            </p>
          </div>

          {/* 🔒 GIZLILIK POLITIKASI VE ÇEREZLER */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs mb-4">
            <h2 className="text-lg text-[#132444] font-bold mb-2">🔒 Gizlilik Politikası & Çerezler</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed mb-3">
              FanteFut olarak ziyaretçilerimizin gizliliğine büyük önem veriyoruz. Sitemiz, kullanıcı deneyimini artırmak ve reklam hizmetleri sunmak amacıyla çerezler (cookies) kullanmaktadır. Sitemizde yayınlanan reklamlar ve veri toplama süreçleri hakkında daha detaylı bilgi edinmek için dilerseniz <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 'bold' }}>Google Gizlilik ve Şartlar</a> sayfasını inceleyebilirsiniz.
            </p>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              <strong className="text-slate-800 font-bold">Google AdSense Reklamları:</strong> Sitemiz, üçüncü taraf satıcı olarak Google dahil olmak üzere reklam yayınlamak için çerezlerden yararlanır. Google'ın reklam çerezlerini kullanması, kullanıcılarımızın sitemize ve internetteki diğer sitelere yaptığı ziyaretlere dayalı olarak reklamlar sunmasına olanak tanır. Kullanıcılar, dilerlerse kişiselleştirilmiş reklamları kapatmak veya çerezleri yönetmek için resmi <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 'bold' }}>Google Reklam Ayarları</a> sayfasını ziyaret ederek bu çerezlerin kullanımını diledikleri zaman kolayca devre dışı bırakabilirler. Sitemizi kullanarak bu çerez politikalarını kabul etmiş sayılırsınız.
            </p>
          </div>

                    {/* 
            Ortak Footer bileşeni yerine buraya özel, 
            kendi linkini barındırmayan sadece telif hakkı damgası bırakan sade alan yerleştirildi 
          */}
          <footer style={{
            textAlign: 'center', 
            marginTop: '40px', 
            paddingTop: '20px', 
            paddingBottom: '20px', 
            borderTop: '1px solid #f1f5f9',
            fontFamily: ICERIK_FONTU,
            boxSizing: 'border-box'
          }}>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px', fontFamily: ICERIK_FONTU }}>
              © {currentYear} FanteFut. Tüm Hakları Saklıdır. Veriler lokal havuzdan beslenmektedir.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
