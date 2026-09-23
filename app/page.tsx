'use client';
import { useState } from 'react';
import Link from 'next/link'; // Hata veren eksik import satırını ekledik!
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from './utils';


const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  "Alanyaspor": "Maestro - Sakat - Adale - Ekim Ayı", "Amed Sportif Faaliyetler": "Yira Sor - Sakat - Adale - Ekim ayı\nCisse - Cezalı - Sarı kart - 8. hafta", "Başakşehir": "Visca - Sakat - ? - ?", "Beşiktaş": "Vlahovic - Sakat - Milli takım - ?\nTrossard - Şüpheli - ? - ?", "Çorum FK": "", 
  "Erzurumspor FK": "", "Eyüpspor": "Sabiri - Sakat - Adale - ?", 
  "Fenerbahçe": "Jayden Oosterwolde - Liste dışı - Ameliyat oldu - Aralık\nMert Müldür - Sakat - Menisküs - Kasım ayı\nAsensio - Şüpheli - Kadroda - Bireysel çalışma\nAmara Diouf - Liste dışı - Özel program - ?",
  "Galatasaray": "Günay - Sakat - Diz - ?\nOsimhen - Sakat - Adale - Milli Ara\nLemina - Sakat - Kasık - ?\nSingo - Sakat - Uyluk - Ekim ayı\nLesley - Cezalı - Kırmızı kart - 9. hafta", "Gaziantep FK": "Fuat Bavuk - Sakat - Adale - ?\nNazım Sangare - Sakat - Adale - ?", 
  "Gençlerbirliği": "K. Rodrigues - Sakat - Adale - ?\nNiasse - Sakat - Adale - ?\nTraore - Şüpheli - ? - ?", 
  "Göztepe": "Sabra - Sakat  - ? - ?\nLuka - Kadro dışı - Soruşturma - ?\nSundberg - Sakat - Adale - ?\nGodoi - Sakat - Adale - ?\nFurkan B. - Sakat - Adale - ?\nGökdeniz - Sakat - Adale - ?", 
  "Kasımpaşa": "Kamil Ahmet - Sakat - Aşil - Kasım ayı\nBenedyczak - Şüpheli - Bilek - ?\nBen Ouanes - Sakat - Adale - ?", "Kocaelispor": "Jovanovic - Sakat - Diz - Ekim ayı\nPetkovic - Sakat - ? - ?\nHaidara - Şüpheli - ? - ?", "Konyaspor": "M. İbrahimoğlu - Sakat - Adale - ?", "Rizespor": "Alikulov - Sakat - Çapraz bağ - ?\nMihaila - Cezalı - Kırmızı kart - 8. hafta", "Samsunspor": "Assoumou - Sakat - Adale - ?\nElayis - Sakat - Adale - ?\nJarju - Şüpheli - ? - ?\nSousa - Sakat - ? - ?", "Trabzonspor": "Okay - Sakat - Adale - ?"
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
    return { ...anaStil, backgroundColor: '#f1f5f9', color: '#475569' };
  };

  // 🎯 YENİ RESPONSIVE REKLAM MOTORU: Mobil ve Laptop uyumlu esnek kapsayıcı
  const renderReklamAlani = (boyutTip) => {
    const isAltSerit = boyutTip === 'ince';
    return (
      <div style={{
        width: '100%',
        maxWidth: '728px', // Laptop ekranlarında devasa yayılmayı önleyen kilit sınır
        minHeight: isAltSerit ? '50px' : '90px', // Reklam yüklenene kadar düzenin bozulmasını önler
        maxHeight: isAltSerit ? '100px' : '280px', // Mobilde kare reklamların taşmasını önler
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '20px auto', // Sayfada tam ortada durması için auto eklendi
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          {isAltSerit ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
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
      
      {/* 🔗 Ortak Logolu Başlık Bileşenimiz Buraya Dahil Edildi */}
      <Header altBaslik="Süper Lig Sakatlar Cezalılar Eksikler" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Eksik Listesi aktif) */}
        <Navbar aktifSayfa="eksik" />

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
