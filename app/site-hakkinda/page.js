'use client';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU } from '../utils';

export default function SiteHakkindaSayfasi() {
  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="Site Bilgileri & Kurumsal Bilgilendirme" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="hakkinda" />

        <div className="w-full flex flex-col gap-4">
          
          {/* SİTENİN GÖRSEL STANDARTLARINA GÖRE HİZALANMIŞ ÜST ALAN BOŞLUĞU */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '16px' }}>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-[#132444] transition-colors group">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Anasayfaya Dön
            </Link>
          </div>

          {/* 📚 HAKKIMIZDA & VİZYON */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg text-[#132444] font-bold mb-2">ℹ️ Hakkımızda</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              <strong className="text-slate-800 font-bold">FanteFut</strong>, fantezi futbol oyunlarına dahil olan menajerler ve Süper Lig özelinde futbol analizlerini takip eden futbolseverler için kurulmuş tamamen bağımsız bir bilgi ve istatistik platformudur. Platformumuzun temel amacı; takımların en güncel sakat, cezalı, kadro dışı ve teknik direktör kararıyla rotasyonda olan oyuncu verilerini en şeffaf, sade ve hızlı şekilde fantezi futbol teknik direktörlerine ulaştırmaktır. Kullanıcılarımızın kadro kurgularında ve transfer tercihlerinde en doğru stratejik kararları alabilmeleri için veri havuzumuzu düzenli periyotlarla güncelliyoruz.
            </p>
          </div>

          {/* 🏢 KÜNYE VE VİZYONUMUZ */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg text-[#132444] font-bold mb-2">🎯 Vizyonumuz</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              FanteFut olarak, karmaşık futbol istatistiklerini ve anlık gelişen sakatlık/ceza raporlarını fantezi futbol menajerlerinin en hızlı anlayabileceği yalın formatlara indirgemeyi hedefliyoruz. Tamamen lokal veri kaynaklarından beslenen ve kullanıcı deneyimini ön planda tutan yapımızla, Süper Lig fantezi futbol dünyasının en güvenilir başvuru rehberi olmak adına bağımsız yayıncılık ilkeleriyle çalışmalarımızı sürdürüyoruz.
            </p>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
