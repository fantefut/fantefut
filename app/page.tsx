'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from './utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  "Alanyaspor": "Maestro - Sakat - Adale - Ekim Ayı", "Amed Sportif Faaliyetler": "Yira Sor - Sakat - Adale - Ekim ayı\nCisse - Cezalı - Sarı kart - 8. hafta", "Başakşehir": "Visca - Şüpheli - Maç ritmi - Belli değil", "Beşiktaş": "Orkun - Şüpheli - Ayak p. - Belli değil", "Çorum FK": "", 
  "Erzurumspor FK": "", "Eyüpspor": "Sabiri - Sakat - Adale - Ekim ayı", 
  "Fenerbahçe": "Jayden Oosterwolde - Liste dışı - Ameliyat oldu - Aralık\nMert Müldür - Sakat - Menisküs - Kasım sonu\nAmara Diouf - Liste dışı - Özel program - Belli değil",
  "Galatasaray": "Günay - Sakat - Diz - Belli değil\nSallai - Şüpheli - Adale - Ekim ayı\nSingo - Sakat - Uyluk - Belli değil\nLesley - Cezalı - Kırmızı kart - 9. hafta", "Gaziantep FK": "Fuat Bavuk - Sakat - Adale - Belli değil\nNazım Sangare - Sakat - Adale - Belli değil", 
  "Gençlerbirliği": "K. Rodrigues - Sakat - Adale - Belli değil\nNiasse - Sakat - Adale - Belli değil\nTraore - Şüpheli - Belli değil - Belli değil", 
  "Göztepe": "Sabra - Sakat  - Ayak - Belli değil\nLuka - Kadro dışı - Soruşturma - Belli değil\nGodoi - Sakat - Adale - Belli değil\nFurkan B. - Sakat - Adale - Belli değil", 
  "Kasımpaşa": "Kamil Ahmet - Sakat - Aşil - 2027\nBenedyczak - Sakat - Bilek - Belli değil\nBen Ouanes - Sakat - Adale - Ekim ayı", "Kocaelispor": "Jovanovic - Sakat - Diz - Ekim ayı\nPetkovic - Sakat - Belli değil - Belli değil\nHaidara - Sakat - Tendon - 2027\nZoukrou - Sakat - Hamstring - Aralık ayı\nDijksteel - Sakat - Adale - Belli değil", "Konyaspor": "M. İbrahimoğlu - Sakat - Adale - Belli değil", "Rizespor": "Alikulov - Sakat - Çapraz bağ - Ekim sonu\nMihaila - Cezalı - Kırmızı kart - 8. hafta\nLaci - Şüpheli - Belli değil - Belli değil", "Samsunspor": "Assoumou - Sakat - Adale - Belli değil\nElayis - Sakat - Adale - Belli değil\nJarju - Şüpheli - Belli değil - Belli değil\nSousa - Sakat - Belli değil - Belli değil", "Trabzonspor": "Okay - Sakat - Adale - 2027\nUmut - Sakat - Tendon - Belli değil\nMalinovskyi - Sakat - Ameliyat oldu - Kasım sonu\nOnuralp - Sakat - Tendon - Belli değil"
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

  const renderReklamAlani = (ozelStil = {}) => {
    return (
      <div style={{
        width: '100%',
        maxWidth: '100%',
        minHeight: '50px',
        maxHeight: '100px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...ozelStil
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          - Reklam Alanı (Google AdSense) -
        </span>
      </div>
    );
  };
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

        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Sakatlar Cezalılar Eksikler
          </h1>
        </div>

        {/* 1. Üst Reklam: Başlığın tam altında, üst 16px - alt 24px boşlukla yerleşti */}
        {renderReklamAlani({ marginTop: '16px', marginBottom: '24px' })}

        {/* Fenerbahçe dahil ilk 8 takım listeleniyor (Index 0'dan 8'e kadar, Fenerbahçe 8. sıradadır) */}
        {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderTakimKutusu(takim))}

        {/* 2. Orta Reklam: Tam olarak Fenerbahçe ile Galatasaray arasına yerleşti, 24px-24px boşluk kuralı uygulandı */}
        {renderReklamAlani({ marginTop: '24px', marginBottom: '24px' })}

        {/* Galatasaray dahil geri kalan tüm takımlar listeleniyor (Trabzonspor en sondadır) */}
        {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderTakimKutusu(takim))}

        {/* 3. 🎯 SEO METNİ EN ALTA ALINDI: Kullanıcı deneyimini bozmamak adına tüm listelerin bittiği yere, Footer'ın tam üstüne konumlandırıldı */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Süper Lig Eksik Listesi:</strong> Takımlarımızın güncel sakat, cezalı ve kadro dışı oyuncularının listesine bu sayfadan ulaşabilirsiniz. Liste düzenli olarak güncellenmekte olup; oyuncuların sakatlık nedenleri ve tahmini dönüş süreleri yer almaktadır. Maç kadrosu planlamaları ve taktik analizler için güncel verilere göz atabilirsiniz. <strong>Osimhen</strong> Kasımpaşa maçı için hazır olacak fakat Barcelona maçı düşünülerek rotasyon olabilir. <strong>Vlahovic</strong> takımla çalışmalara başladı.
        </div>

        {/* 4. Eski en alt reklam alanı tamamen temizlendi. */}

        <Footer />
      </div>
    </div>
  );
}
