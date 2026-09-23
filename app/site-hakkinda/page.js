'use client';
import { Navbar, Header, ICERIK_FONTU } from '../utils';

export default function SiteHakkindaSayfasi() {
  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🚀 Diğer sayfalarla birebir aynı, milimetrik eşitlenen merkezi Header bileşenimiz */}
      <Header altBaslik="Site Bilgileri & Kurumsal" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni (Kurumsal bütünlük için eklendi) */}
        <Navbar aktifSayfa="hakkinda" />

        {/* 🎯 SIKIŞTIRILMIŞ VE RESPONSIVE METİN ALANI */}
        <div style={{ maxWidth: '600px', margin: '15px auto 0 auto', color: '#334155', fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* 📚 HAKKIMIZDA BÖLÜMÜ */}
          <div style={{ backgroundColor: '#f8fafc', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#132444', margin: '0 0 6px 0', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>ℹ️ Hakkımızda</h2>
            <p style={{ margin: '0' }}>
              <strong>FanteFut</strong>, fantezi futbol oyuncuları ve futbolseverler için kurulmuş bağımsız bir bilgi platformudur. Amacımız, takımların en güncel sakat, cezalı ve liste dışı oyuncu verilerini, form durumlarını ve istatistiklerini en hızlı ve sade şekilde fantezi futbol teknik direktörlerine sunarak kadro kurgularında doğru kararlar almalarına yardımcı olmaktır.
            </p>
          </div>

          {/* ✉️ İLETİŞİM BÖLÜMÜ */}
          <div style={{ backgroundColor: '#f8fafc', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#132444', margin: '0 0 6px 0', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>✉️ İletişim</h2>
            <p style={{ margin: '0' }}>
              Sitemizle ilgili her türlü soru, görüş, öneri, telif hakkı bildirimi veya reklam iş birlikleri için bizimle kurumsal e-posta adresimiz üzerinden doğrudan iletişime geçebilirsiniz:
              <br /><br />
              <strong>E-posta:</strong> info.fantefut@gmail.com
            </p>
          </div>

          {/* 🔒 GIZLILIK POLITIKASI VE ÇEREZLER */}
          <div style={{ backgroundColor: '#f8fafc', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#132444', margin: '0 0 6px 0', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>🔒 Gizlilik Politikası & Çerezler</h2>
            <p style={{ margin: '0 0 8px 0' }}>
              FanteFut olarak ziyaretçilerimizin gizliliğine büyük önem veriyoruz. Sitemiz, kullanıcı deneyimini artırmak ve reklam hizmetleri sunmak amacıyla çerezler (cookies) kullanmaktadır.
            </p>
            <p style={{ margin: '0' }}>
              <strong>Google AdSense Reklamları:</strong> Sitemiz, üçüncü taraf satıcı olarak Google dahil olmak üzere reklam yayınlamak için çerezlerden yararlanır. Google'ın reklam çerezlerini kullanması, kullanıcılarımızın sitemize Genel ve internetteki diğer sitelere yaptığı ziyaretlere dayalı olarak reklamlar sunmasına olanak tanır. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek bu çerezlerin kullanımını diledikleri zaman devre dışı bırakabilirler. Sitemizi kullanarak bu çerez politikalarını kabul etmiş sayılırsınız.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
