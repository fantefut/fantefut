'use client';
import { useState } from 'react';
import Link from 'next/link';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  "Alanyaspor": "Maestro - Sakat - Adale - ?", "Amed Sportif Faaliyetler": "Yira Sor - Sakat - Adale - ?", "Başakşehir": "Visca - Sakat - ? - ?\nMuhammed Ş. - Sakat - Adale - ?", "Beşiktaş": "Rıdvan Y. - Sakat - Uyluk - Milli Ara\nTrossard - Şüpheli - ? - ?", "Çorum FK": "", 
  "Erzurumspor FK": "", "Eyüpspor": "Sabiri - Sakat - Adale - ?", 
  "Fenerbahçe": "Jayden Oosterwolde - Liste dışı - Ameliyat oldu - Aralık\nMert Hakan - Cezalı - ? - Ekim\nAsensio - Şüpheli - Kadroda - Bireysel çalışma\nAmara Diouf - Liste dışı - Özel program - ?",
  "Galatasaray": "Günay - Sakat - Diz - ?\nOsimhen - Sakat - Adale - Milli Ara\nLemina - Sakat - Kasık - ?\nSingo - Sakat - Uyluk - Ekim ayı", "Gaziantep FK": "Fuat Bavuk - Sakat - Adale - ?\nNazım Sangare - Sakat - Adale - ?", 
  "Gençlerbirliği": "K. Rodrigues - Sakat - Adale - ?\nNiasse - Sakat - Adale - ?", 
  "Göztepe": "Sabra - Sakat  - ? - ?\nSundberg - Sakat - Adale - ?\nGodoi - Sakat - Adale - ?\nFurkan B. - Sakat - Adale - ?\nGökdeniz - Sakat - Adale - ?", 
  "Kasımpaşa": "Kamil Ahmet - Sakat - Aşil - Kasım ayı\nHajradinovic - Sakat - Adale - ?\nBen Ouanes - Sakat - Adale - ?", "Kocaelispor": "Jovanovic - Sakat - Diz - Ekim ayı\nPetkovic - Sakat - ? - ?", "Konyaspor": "M. İbrahimoğlu - Sakat - Adale - ?", "Rizespor": "Alikulov - Sakat - Çapraz bağ - ?\nMihaila - Cezalı - Sarı kart - 1 maç", "Samsunspor": "Assoumou - Sakat - Adale - ?\nElayis - Sakat - Adale - ?\nTanguy C. - Sakat - ? - ?\nSousa - Sakat - ? - ?", "Trabzonspor": "Batagov - Sakat - Menisküs - ?\nFolcarelli - Sakat - Menisküs - ?\nOkay - Sakat - Adale - ?\nMalinovsky - Sakat - Diz - ?"
};

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

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
    return { ...anaStil, backgroundColor: '#f1f5f9', color: '#475569' };
  };

  const getMenuButonStili = (sayfa, aktif) => {
    const bStil = { textDecoration: 'none', fontSize: '11px', fontWeight: aktif ? 'bold' : '500', fontFamily: ICERIK_FONTU, padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', whiteSpace: 'nowrap' };
    if (sayfa === 'eksik') return { ...bStil, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: aktif ? '#1e40af' : '#dbeafe' };
    if (sayfa === 'form') return { ...bStil, backgroundColor: '#f0fdf4', color: '#166534', borderColor: aktif ? '#166534' : '#dcfce7' };
    if (sayfa === 'icdis') return { ...bStil, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: aktif ? '#9a3412' : '#ffedd5' };
    if (sayfa === 'fikstur1') return { ...bStil, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: aktif ? '#6b21a8' : '#f3e8ff' };
    if (sayfa === 'fikstur2') return { ...bStil, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: aktif ? '#9d174d' : '#fce7f3' };
    if (sayfa === 'puan') return { ...bStil, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: aktif ? '#115e59' : '#ccfbf1' };
    if (sayfa === 'krallik') return { ...bStil, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#ffe4e6' };
    if (sayfa === 'yildiz') return { ...bStil, backgroundColor: '#fef3c7', color: '#92400e', borderColor: aktif ? '#92400e' : '#fef3c7' };
    return { ...bStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#fecdd3' };
  };

  const renderReklamAlani = (boyutTip) => (
    <div style={{ width: '100%', height: boyutTip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
      {boyutTip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

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
      <div style={{ width: '100%', padding: '15px 0 5px 0', textAlign: 'center', marginBottom: '10px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0', color: '#132444', fontFamily: BAŞLIK_FONTU, letterSpacing: '1px' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU }}>Süper Lig</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        
        {/* 📱 3 SATIRLI PİRAMİT GEZİNTİ MENÜSÜ */}
<div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
  {/* 1. Satır: 4 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/" style={getMenuButonStili('eksik', true)}>Eksik Listesi</Link>
    <Link href="/haftanin-yildizlari" style={getMenuButonStili('yildizlar', false)}>En İyiler</Link>
    <Link href="/haftanin-analizi" style={getMenuButonStili('analiz', false)}>Tüyolar</Link>
    <Link href="/puan-durumu" style={getMenuButonStili('puan', false)}>Puan Durumu</Link>
  </div>
  {/* 2. Satır: 3 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/kralliklar" style={getMenuButonStili('krallik', false)}>Gol & Asist</Link>
    <Link href="/form-durumu" style={getMenuButonStili('form', false)}>Form Durumu</Link>
    <Link href="/ic-dis-saha" style={getMenuButonStili('icdis', false)}>İç-Dış Saha Form</Link>
  </div>
  {/* 3. Satır: 2 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Link href="/fikstur-ilk-yari" style={getMenuButonStili('fiksturl', false)}>Fikstür 1. Yarı</Link>
    <Link href="/fikstur-ikinci-yari" style={getMenuButonStili('fikstur2', false)}>Fikstür 2. Yarı</Link>
  </div>
</div>


        {renderReklamAlani('buyuk')}
        {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderTakimKutusu(takim))}
        {renderReklamAlani('buyuk')}
        {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderTakimKutusu(takim))}
        {renderReklamAlani('ince')}

        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
          <Link href="/site-hakkinda" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>
            ℹ️ Site Hakkında (Künye & Gizlilik & İletişim)
          </Link>
        </div>

      </div>
    </div>
  );
}
