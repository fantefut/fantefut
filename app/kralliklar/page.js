'use client';
import { useState } from 'react';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// TFF & Transfermarkt Sezonu Güncel Verileri
const GOL_KRALLIGI = [
  { sira: 1, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 7 },
  { sira: 2, oyuncu: "Gift Orban", takim: "Amed SF", istatistik: 7 },
  { sira: 3, oyuncu: "Vedat Muriqi", takim: "Fenerbahçe", istatistik: 6 },
  { sira: 4, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 6 },
  { sira: 5, oyuncu: "Eldor Shomurodov", takim: "Başakşehir", istatistik: 6 },
  { sira: 6, oyuncu: "Dusan Vlahovic", takim: "Beşiktaş", istatistik: 5 },
  { sira: 7, oyuncu: "Adrian Benedyczak", takim: "Kasımpaşa", istatistik: 4 },
  { sira: 8, oyuncu: "Mason Greenwood", takim: "Fenerbahçe", istatistik: 4 },
  { sira: 9, oyuncu: "Ramirez", takim: "Çorum FK", istatistik: 4 },
  { sira: 10, oyuncu: "Juan", takim: "Göztepe", istatistik: 4 }
];

const ASIST_KRALLIGI = [
  { sira: 1, oyuncu: "İrfan Can Kahveci", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 2, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 3 },
  { sira: 3, oyuncu: "Lucas Torreira", takim: "Galatasaray", istatistik: 2 },
  { sira: 4, oyuncu: "Orkun Kökçü", takim: "Beşiktaş", istatistik: 2 },
  { sira: 5, oyuncu: "Sara", takim: "Galatasaray", istatistik: 2 },
  { sira: 6, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 2 },
  { sira: 7, oyuncu: "Fredy", takim: "Çorum", istatistik: 2 },
  { sira: 8, oyuncu: "Hadergjonaj", takim: "Alanyaspor", istatistik: 2 },
  { sira: 9, oyuncu: "Maxim", takim: "Gaziantep FK", istatistik: 2 },
  { sira: 10, oyuncu: "Mithat", takim: "Rizespor", istatistik: 2 }
];

export default function KralliklarSayfasi() {
  const [golVerileri] = useState(GOL_KRALLIGI);
  const [asistVerileri] = useState(ASIST_KRALLIGI);

  // İlk 3 Podyum Satır Renklendirmesi (Mavi, Yeşil, Pembe Pastel Tonlar)
  const getPodyumSatirStili = (sira) => {
    if (sira === 1) return { backgroundColor: '#eff6ff' }; 
    if (sira === 2) return { backgroundColor: '#f0fdf4' }; 
    if (sira === 3) return { backgroundColor: '#fdf2f8' }; 
    return { backgroundColor: '#ffffff' };
  };

  // 🛡️ CLS Korumalı ve Taşma Engelli Standart Reklam Render Fonksiyonu
  const renderReklamAlani = (marginTop, marginBottom) => {
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
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>- Reklam Alanı (Google AdSense) -</span>
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 TS hatasını önlemek ve FanteFut altını temizlemek için boş string verdik */}
      <Header altBaslik="" />

      {/* Tailwind v4 responsive genişletme sarmalayıcısı */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="krallik" />

        {/* 🎯 SEO & ADASENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Gol ve Asist Krallıkları
          </h1>
        </div>

        {/* 💰 1. ÜST REKLAM ALANI - H1 Altında Kesin Kurallı Yerleşim (Üst: 16px, Alt: 24px) */}
        {renderReklamAlani('16px', '24px')}

        {/* ⚽ 10 Satırlık Genişletilmiş Gol Krallığı Tablosu */}
        <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>⚽ Gol Krallığı</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
            <tbody>
              {golVerileri.map((veri, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', ...getPodyumSatirStili(veri.sira) }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{veri.sira}</td>
                  <td style={{ padding: '10px' }}>
                    {/* Oyuncu isimleri genişleyen ekrana göre büyütüldü */}
                    <div style={{ fontWeight: '700', color: '#334155', fontSize: veri.sira <= 3 ? '16px' : '14px', letterSpacing: '-0.2px' }}>{veri.oyuncu}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{veri.takim}</div>
                  </td>
                  {/* İstatistik sayıları asil Fenerbahçe laciverti (#132444) yapıldı */}
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: veri.sira <= 3 ? '1.4rem' : '1.1rem', paddingRight: '20px' }}>{veri.istatistik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 💰 2. ORTA BÜYÜK REKLAM ALANI - Tablolar Arası Kesin Kurallı Yerleşim (Üst: 24px, Alt: 24px) */}
        {renderReklamAlani('24px', '24px')}

        {/* 🅰️ 10 Satırlık Genişletilmiş Asist Krallığı Tablosu */}
        <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>🅰️ Asist Krallığı</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
            <tbody>
              {asistVerileri.map((veri, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', ...getPodyumSatirStili(veri.sira) }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{veri.sira}</td>
                  <td style={{ padding: '10px' }}>
                    {/* Oyuncu isimleri genişleyen ekrana göre büyütüldü */}
                    <div style={{ fontWeight: '700', color: '#334155', fontSize: veri.sira <= 3 ? '16px' : '14px', letterSpacing: '-0.2px' }}>{veri.oyuncu}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{veri.takim}</div>
                  </td>
                  {/* İstatistik sayıları asil Fenerbahçe laciverti (#132444) yapıldı */}
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: veri.sira <= 3 ? '1.4rem' : '1.1rem', paddingRight: '20px' }}>{veri.istatistik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🚀 GOOGLE BOT DOSTU ZENGİN SEO AÇIKLAMA METNİ (Thin Content Önleyici) */}
        <div style={{ 
          marginTop: '30px', 
          marginBottom: '10px', 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          fontFamily: ICERIK_FONTU
        }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>
            Süper Lig Güncel Gol ve Asist Krallığı İstatistik Analizleri
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut Süper Lig gol ve asist krallıkları sayfasında, sezona damga vuran en skorer oyuncuların ve asist liderlerinin güncel verilerini takip edebilirsiniz. Fantezi futbol liglerinde haftalık kadro kurulumu yaparken, en çok gol atan veya gol pası veren oyuncuları listelemek stratejik transfer adımları atmanızı sağlar. Tabloda yer alan zirvedeki oyuncuları inceleyerek haftalık puanlarınızı maksimum seviyeye çıkarabilirsiniz.
          </p>
        </div>

        {/* ℹ️ Not: Eski Alt Reklam AdSense Otomatik Reklam Sistemine Bırakılarak Tamamen Temizlendi */}

        {/* Merkezi ve Sadeleştirilmiş Yeni Otomatik Footer Sistemi */}
        <Footer />

      </div>
    </div>
  );
}
