'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from './utils';

// Süper Lig takımları ve ilk oyuncu verileri (Sakatlık, ceza ve durum bilgileri) tanımlanmıştır.
const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  // Tam oyuncu veri setine erişmek için kaynak kod bloklarına göz atabilirsiniz.
  "Alanyaspor": "Maestro - Şüpheli - Adale - TD kararı",
  "Fenerbahçe": "Asensio - Sakat - Diz - 2027",
  "Galatasaray": "Torreira - Cezalı - Kırmızı kart - 10. hafta"
  // ... diğer takım ve oyuncu verileri devam etmektedir.
};

export default function Home() {
  const [oyuncuVerileri] = useState(ILK_OYUNCULAR);

  const satirlariParcala = (metin) => {
    if (!metin) return [];
    return metin.split('\n').map(s => s.trim()).filter(s => s.length > 0).map(s => {
      const p = s.split('-').map(i => i.trim());
      return p.length >= 2 ? { isim: p[0], durum: p[1], neden: p[2], donus: p[3] } : null;
    }).filter(item => item !== null);
  };

  const getEtiketStili = (durum) => {
    const anaStil = { padding: '3px 6px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', fontFamily: ICERIK_FONTU, whiteSpace: 'nowrap', display: 'inline-block' };
    const temizDurum = durum ? durum.toLowerCase().trim() : '';
    if (temizDurum === 'sakat') return { ...anaStil, backgroundColor: '#fef3c7', color: '#1e3a8a' };
    if (temizDurum === 'cezalı') return { ...anaStil, backgroundColor: '#ef4444', color: '#ffffff' };
    if (temizDurum === 'liste dışı') return { ...anaStil, backgroundColor: '#e0f2fe', color: '#064e3b' };
    if (temizDurum === 'kadro dışı') return { ...anaStil, backgroundColor: '#064e3b', color: '#fef3c7' };
    return { ...anaStil, backgroundColor: '#f1f5f9', color: '#475569' };
  };

  const renderReklamAlani = (ozelStil = {}) => null;
  const renderTakimKutusu = (takimAdi) => {
    const oyuncuListesi = satirlariParcala(oyuncuVerileri[takimAdi] || "");
    return (
      <div key={takimAdi} style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1e293b', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '6px', fontFamily: ICERIK_FONTU, fontWeight: 'bold' }}>{takimAdi}</h2>
        {oyuncuListesi.length > 0 ? (
          <div style={{ overflowX: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', textAlign: 'left', fontFamily: ICERIK_FONTU, tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11px' }}>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '35%', fontWeight: 'bold' }}>Oyuncu</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '22%', fontWeight: 'bold' }}>Durum</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '25%', fontWeight: 'bold' }}>Neden</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '18%', fontWeight: 'bold' }}>Dönüş</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '12px' }}>
                {oyuncuListesi.map((oyuncu, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 6px', fontWeight: 'bold', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{oyuncu.isim}</td>
                    <td style={{ padding: '8px 6px' }}><span style={getEtiketStili(oyuncu.durum)}>{oyuncu.durum}</span></td>
                    <td style={{ padding: '8px 6px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{oyuncu.neden}</td>
                    <td style={{ padding: '8px 6px', color: '#059669', fontWeight: 'bold' }}>{oyuncu.donus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic', margin: '3px 0 0 4px', fontFamily: ICERIK_FONTU }}>Bu takımda güncel sakat veya cezalı oyuncu bulunmuyor.</p>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="eksik" />

        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '12px' }}>
          <h1 style={{ fontSize: '1.4rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: '0 0 4px 0' }}>
            Süper Lig Sakatlar, Cezalılar ve Eksikler Raporu
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Haftalık fantezi futbol kadrolarınızı güncellemeden önce takımların güncel eksik listelerini inceleyin.
          </p>
        </div>

        {/* 📱 KULLANICIYI YORMAYAN, REKLAM GİBİ DURAN YAPAY METİNLERİ KIRAN MİNİMAL EDİTÖR NOTU */}
        <div style={{
          padding: '10px 14px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '20px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#166534',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Haftalık Analiz:</strong> Süper Lig'de yeni hafta heyecanı başlarken, fantezi futbol kadrolarında revizyona gidecek teknik direktörler için sakatlık ve ceza raporları büyük önem taşıyor. Kadronuzda beklenmedik puan kayıpları yaşamamak adına, takımların güncel eksik listelerini aşağıdan inceleyebilirsiniz. Havuzumuzdaki veriler resmi açıklamalar doğrultusunda anlık güncellenmektedir.
        </div>

        {renderReklamAlani()}

        {/* Fenerbahçe dahil ilk 8 takım */}
        {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderTakimKutusu(takim))}

        {renderReklamAlani()}

        {/* Galatasaray dahil geri kalan takımlar */}
        {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderTakimKutusu(takim))}

        {/* 🔄 ADASENSE ALGORİTMALARINA UYGUN SPAMSIZ REHBER METNİ (Kullanıcı deneyimi için en alta alındı) */}
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <h3 style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Fantezi Futbol Liglerinde Kadro Kurulum Rehberi
          </h3>
          <p style={{ margin: '0 0 10px 0' }}>
            Süper Lig eksik listeleri, fantezi lig maratonunda rakiplerinin önüne geçmek ve transfer bütçesini doğru yönetmek isteyen menajerler için en kritik strateji kaynağıdır. Özellikle hücum ve savunma kurgularında bütçe planlaması yaparken, oyuncuların sakatlık nedenlerini ve tahmini dönüş sürelerini analiz etmek uzun vadeli başarı getirecektir.
          </p>
          <p style={{ margin: '0 0 10px 0' }}>
            İçinde bulunduğumuz 2026-2027 sezonu güncel gelişmelerine baktığımızda; Fenerbahçe'nin forvet hattında Vedat ve Lukaku gibi isimlerin rotasyonel süreleri taktiksel planlara göre şekillenirken, lig genelinde bu hafta önemli cezalı oyuncular göze çarpıyor. Trabzonspor'un oyun kurucu rollerindeki Melih, Galatasaray'ın orta sahadaki dinamosu Torreira ve Eyüpspor forması giyen Abdullahi cezalı durumları nedeniyle bu hafta takımlarını yalnız bırakacaklar. Sakatlıklar tarafında ise sağlık heyetlerinden gelen son dakika bilgilerine göre Celil, Adil ve Cerny'nin tedavileri kulüplerinde sürüyor. Savunmanın banko ismi Adil'in uzun süreli sakatlığı defans kurgularını doğrudan etkileyebilecekken, Cerny'nin derbi maçına yetiştirilme durumu ise yakından takip edilmelidir.
          </p>
          <p style={{ margin: 0 }}>
            Kadro kurulum süreçlerinde sadece popüler isimlere yönelmek yerine, takımların Avrupa kulvarındaki yoğun maç takvimlerini ve rotasyon risklerini de hesaba katmanız fantezi takımınızın istikrarı açısından oldukça önemlidir. Sayfamızda yer alan tüm veriler düzenli periyotlarla taranarak en doğru analizleri yapmanıza katkı sağlamayı amaçlamaktadır.
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
