'use client';

import Link from 'next/link';

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function SiteHakkindaSayfasi() {
  return (
    <div style={{ padding: '15px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* BAŞLIK ALANI */}
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#64748b', fontSize: '1.1rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>Site Bilgileri & Kurumsal</p>
      </div>

      {/* 🎯 ORTALANMIŞ METİN ALANI */}
      <div style={{ maxWidth: '600px', margin: '0 auto', color: '#334155', fontSize: '13px', lineHeight: '1.6' }}>
        
        {/* GERİ DÖNÜŞ LİNKİ */}
        <div style={{ marginBottom: '20px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#1e40af', fontWeight: 'bold' }}>← Ana Sayfaya Dön</Link>
        </div>

        {/* 📚 HAKKIMIZDA BÖLÜMÜ */}
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#132444', margin: '0 0 10px 0', fontWeight: 'bold' }}>ℹ️ Hakkımızda</h2>
          <p style={{ margin: '0' }}>
            <strong>FanteFut</strong>, Türkiye Trendyol Süper Lig fantezi futbol oyuncuları ve futbolseverler için kurulmuş bağımsız bir bilgi platformudur. Amacımız, takımların en güncel sakat, cezalı ve liste dışı oyuncu verilerini, form durumlarını ve istatistiklerini en hızlı ve sade şekilde fantezi futbol teknik direktörlerine sunarak kadro kurgularında doğru kararlar almalarına yardımcı olmaktır.
          </p>
        </div>

        {/* ✉️ İLETİŞİM BÖLÜMÜ */}
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#132444', margin: '0 0 10px 0', fontWeight: 'bold' }}>✉️ İletişim</h2>
          <p style={{ margin: '0' }}>
            Sitemizle ilgili her türlü soru, görüş, öneri, telif hakkı bildirimi veya reklam iş birlikleri için bizimle kurumsal e-posta adresimiz üzerinden doğrudan iletişime geçebilirsiniz:
            <br /><br />
            <strong>E-posta:</strong> info.fantefut@gmail.com
          </p>
        </div>

        {/* 🔒 GIZLILIK POLITIKASI VE ÇEREZLER */}
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#132444', margin: '0 0 10px 0', fontWeight: 'bold' }}>🔒 Gizlilik Politikası & Çerezler</h2>
          <p style={{ margin: '0 0 10px 0' }}>
            FanteFut olarak ziyaretçilerimizin gizliliğine büyük önem veriyoruz. Sitemiz, kullanıcı deneyimini artırmak ve reklam hizmetleri sunmak amacıyla çerezler (cookies) kullanmaktadır.
          </p>
          <p style={{ margin: '0' }}>
            <strong>Google AdSense Reklamları:</strong> Sitemiz, üçüncü taraf satıcı olarak Google dahil olmak üzere reklam yayınlamak için çerezlerden yararlanır. Google'ın reklam çerezlerini kullanması, kullanıcılarımızın sitemize ve internetteki diğer sitelere yaptığı ziyaretlere dayalı olarak reklamlar sunmasına olanak tanır. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek bu çerezlerin kullanımını diledikleri zaman devre dışı bırakabilirler. Sitemizi kullanarak bu çerez politikalarını kabul etmiş sayılırsınız.
          </p>
        </div>

      </div>
    </div>
  );
}
