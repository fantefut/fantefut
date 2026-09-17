'use client';
import { useState } from 'react';
import Link from 'next/link';

// 🏆 1. VERİ HAVUZU: GEÇEN HAFTANIN EN İYİLERİ (Sadece o haftanın en çok puan alanları)
const GEÇEN_HAFTA_DATA = {
  "Kaleciler": [
    { oyuncu: "Fofana", takim: "Rizespor", puan: 13 },
    { oyuncu: "Tobiasz", takim: "Gaziantep", puan: 12 },
    { oyuncu: "Bahadır", takim: "Konyaspor", puan: 9 }
  ],
  "Defanslar": [
    { oyuncu: "Emirhan", takim: "Beşiktaş", puan: 15 },
    { oyuncu: "Abdülkerim", takim: "Galatasaray", puan: 14 },
    { oyuncu: "Murillo", takim: "Beşiktaş", puan: 11 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Cengiz", takim: "Çorum", puan: 15 },
    { oyuncu: "Toth", takim: "Konyaspor", puan: 11 },
    { oyuncu: "Makouta", takim: "Alanya", puan: 10 }
  ],
  "Forvetler": [
    { oyuncu: "Orban", takim: "Amed", puan: 17 },
    { oyuncu: "Ramirez", takim: "Çorum", puan: 12 },
    { oyuncu: "Benedyczak", takim: "Kasımpaşa", puan: 9 }
  ]
};

// 📊 2. VERİ HAVUZU: TOPLAM OYUNCU PUANLARI (Lig başından beri toplanan genel puanlar)
const GENEL_TOPLAM_DATA = {
  "Kaleciler": [
    { oyuncu: "Fofana", takim: "Rizespor", puan: 29 },
    { oyuncu: "İrfan Can", takim: "Gençlerbirliği", puan: 27 },
    { oyuncu: "Tobiasz", takim: "Gaziantep", puan: 27 }
  ],
  "Defanslar": [
    { oyuncu: "Sorescu", takim: "Gaziantep", puan: 37 },
    { oyuncu: "Skriniar", takim: "Fenerbahçe", puan: 26 },
    { oyuncu: "Lima", takim: "Alanyaspor", puan: 26 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Salah", takim: "Trabzonspor", puan: 41 },
    { oyuncu: "Sara", takim: "Galatasaray", puan: 31 },
    { oyuncu: "Emrecan", takim: "Rizespor", puan: 27 }
  ],
  "Forvetler": [
    { oyuncu: "Osimhen", takim: "Galatasaray", puan: 46 },
    { oyuncu: "Orban", takim: "Amed", puan: 40 },
    { oyuncu: "Benedyczak", takim: "Kasımpaşa", puan: 40 }
  ]
};

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function HaftaninYildizlariSayfasi() {
  const [haftalikYildizlar] = useState(GEÇEN_HAFTA_DATA);
  const [genelYildizlar] = useState(GENEL_TOPLAM_DATA);

  const getBtn = (s, akt) => {
    const b = { textDecoration: 'none', fontSize: '11px', fontWeight: akt ? 'bold' : '500', fontFamily: ICERIK_FONTU, padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', whiteSpace: 'nowrap' };
    if (s === 'eksik') return { ...b, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: akt ? '#1e40af' : '#dbeafe' };
    if (s === 'form') return { ...b, backgroundColor: '#f0fdf4', color: '#166534', borderColor: akt ? '#166534' : '#dcfce7' };
    if (s === 'icdis') return { ...b, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: akt ? '#9a3412' : '#ffedd5' };
    if (s === 'fikstur1') return { ...b, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: akt ? '#6b21a8' : '#f3e8ff' };
    if (s === 'fikstur2') return { ...b, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: akt ? '#9d174d' : '#fce7f3' };
    if (s === 'puan') return { ...b, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: akt ? '#115e59' : '#ccfbf1' };
    if (s === 'krallik') return { ...b, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: akt ? '#9f1239' : '#ffe4e6' };
    if (s === 'yildiz') return { ...b, backgroundColor: '#fef3c7', color: '#92400e', borderColor: akt ? '#92400e' : '#fef3c7' };
    return { ...b, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: akt ? '#9f1239' : '#fecdd3' };
  };

  const renderRek = (tip) => (
    <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
      {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

  const renderMevki = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '15px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>{emoji} {mName}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 10px', fontWeight: 'bold', color: '#64748b', width: '20px', textAlign: 'center' }}>{i+1}</td>
              <td style={{ padding: '8px 10px' }}>
                <div style={{ fontWeight: 'bold', color: '#334155' }}>{v.oyuncu}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{v.takim}</div>
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', color: '#16a34a', fontSize: '1rem', paddingRight: '15px' }}>{v.puan} P</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#64748b', fontSize: '1.2rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>Haftanın Yıldızları</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '25px', display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={getBtn('eksik', false)}>Eksik Listesi</Link>
          <Link href="/form-durumu" style={getBtn('form', false)}>Form Durumu</Link>
          <Link href="/ic-dis-saha" style={getBtn('icdis', false)}>İç-Dış Saha Form</Link>
          <Link href="/fikstur-ilk-yari" style={getBtn('fikstur1', false)}>Fikstür 1. Yarı</Link>
          <Link href="/fikstur-ikinci-yari" style={getBtn('fikstur2', false)}>Fikstür 2. Yarı</Link>
          <Link href="/puan-durumu" style={getBtn('puan', false)}>Puan Durumu</Link>
          <Link href="/kralliklar" style={getBtn('krallik', false)}>Gol & Asist</Link>
          <Link href="/haftanin-yildizlari" style={getBtn('yildiz', true)}>Yıldızlar</Link>
          <Link href="/haftanin-analizi" style={getBtn('analiz', false)}>Analiz</Link>
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {renderRek('buyuk')}

          {/* 🏆 1. SET: GEÇEN HAFTANIN EN İYİLERİ (haftalikYildizlar verisini okuyor) */}
          <h2 style={{ fontSize: '1.2rem', color: '#132444', marginBottom: '15px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #f59e0b', paddingLeft: '8px' }}>
            🏆 Geçen Haftanın En İyileri
          </h2>

          {renderMevki("Kaleciler", haftalikYildizlar["Kaleciler"], "🧤", "k1")}
          {renderMevki("Defanslar", haftalikYildizlar["Defanslar"], "🛡️", "d1")}
          {renderMevki("Orta Sahalar", haftalikYildizlar["Orta Sahalar"], "🎯", "o1")}
          {renderMevki("Forvetler", haftalikYildizlar["Forvetler"], "⚽", "f1")}

          {/* 💰 2. BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 📊 2. SET: TOPLAM OYUNCU PUANLARI (genelYildizlar verisini okuyor) */}
          <h2 style={{ fontSize: '1.2rem', color: '#132444', marginBottom: '15px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #10b981', paddingLeft: '8px' }}>
            📊 Toplam Oyuncu Puanları
          </h2>

          {renderMevki("Kaleciler", genelYildizlar["Kaleciler"], "🧤", "k2")}
          {renderMevki("Defanslar", genelYildizlar["Defanslar"], "🛡️", "d2")}
          {renderMevki("Orta Sahalar", genelYildizlar["Orta Sahalar"], "🎯", "o2")}
          {renderMevki("Forvetler", genelYildizlar["Forvetler"], "⚽", "f2")}

          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
