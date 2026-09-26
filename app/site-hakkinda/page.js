'use client';
import Link from 'next/link';
import { Navbar, Header, ICERIK_FONTU } from '../utils';

export default function SiteHakkindaSayfasi() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      
      {/* 🚀 Diğer sayfalarla birebir aynı, milimetrik eşitlenen merkezi Header bileşenimiz */}
      <Header altBaslik="Site Bilgileri & Kurumsal" />

      <div className="max-w-[900px] mx-auto">
        
        {/* Ortak Navbar Bileşeni (Kurumsal bütünlük için eklendi) */}
        <Navbar aktifSayfa="hakkinda" />

        {/* 🎯 SIKIŞTIRILMIŞ VE RESPONSIVE İÇERİK ALANI */}
        <div className="max-w-[600px] mx-auto flex flex-col gap-4 mt-4">
          
          {/* ⬅️ ANASAYFAYA DÖNÜŞ OKU (Kullanıcı deneyimi ve Googlebot iç linkleme dostu) */}
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
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong className="text-slate-800 font-bold">FanteFut</strong>, fantezi futbol oyuncuları ve futbolseverler için kurulmuş bağımsız bir bilgi platformudur. Amacımız, takımların en güncel sakat, cezalı og liste dışı oyuncu verilerini, form durumlarını ve istatistiklerini en hızlı ve sade şekilde fantezi futbol teknik direktörlerine sunarak kadro kurgularında doğru kararlar almalarına yardımcı olmaktır.
            </p>
          </div>

          {/* ✉️ İLETİŞİM BÖLÜMÜ */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg text-[#132444] font-bold mb-2">✉️ İletişim</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sitemizle ilgili her türlü soru, görüş, öneri, telif hakkı bildirimi veya reklam iş birlikleri için bizimle kurumsal e-posta adresimiz üzerinden doğrudan iletişime geçebilirsiniz:
              <br /><br />
              <strong className="text-slate-800 font-bold">E-posta:</strong> info.fantefut@gmail.com
            </p>
          </div>

          {/* 🔒 GIZLILIK POLITIKASI VE ÇEREZLER */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs mb-4">
            <h2 className="text-lg text-[#132444] font-bold mb-2">🔒 Gizlilik Politikası & Çerezler</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              FanteFut olarak ziyaretçilerimizin gizliliğine büyük önem veriyoruz. Sitemiz, kullanıcı deneyimini artırmak ve reklam hizmetleri sunmak amacıyla çerezler (cookies) kullanmaktadır.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong className="text-slate-800 font-bold">Google AdSense Reklamları:</strong> Sitemiz, üçüncü taraf satıcı olarak Google dahil olmak üzere reklam yayınlamak için çerezlerden yararlanır. Google'ın reklam çerezlerini kullanması, kullanıcılarımızın sitemize ve internetteki diğer sitelere yaptığı ziyaretlere dayalı olarak reklamlar sunmasına olanak tanır. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek bu çerezlerin kullanımını diledikleri zaman devre dışı bırakabilirler. Sitemizi kullanarak bu çerez politikalarını kabul etmiş sayılırsınız.
            </p>
          </div>

          {/* 🏢 SADECE KURUMSAL TELİF DAMGASI (BAĞLANTI LİNKLERİ OLMADAN) */}
          <div style={{
            textAlign: 'center', 
            marginTop: '20px', 
            paddingTop: '20px', 
            paddingBottom: '20px', 
            borderTop: '1px solid #f1f5f9',
            fontFamily: ICERIK_FONTU
          }}>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px', fontFamily: ICERIK_FONTU }}>
              © {currentYear} FanteFut. Tüm Hakları Saklıdır. Veriler lokal havuzdan beslenmektedir.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
