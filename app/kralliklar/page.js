'use client';
import { useState } from 'react';
import Link from 'next/link';

// ⚽ GOL KRALLIĞI GÜNCEL DATA
const GOL_KRALLIGI = [
  { sira: 1, oyuncu: "Orban", takim: "Amed", istatistik: 6 },
  { sira: 2, oyuncu: "Osimhen", takim: "Galatasaray", istatistik: 6 },
  { sira: 3, oyuncu: "Salah", takim: "Trabzonspor", istatistik: 4 },
  { sira: 4, oyuncu: "Vlahovic", takim: "Beşiktaş", istatistik: 4 },
  { sira: 5, oyuncu: "Shomurodov", takim: "Başakşehir", istatistik: 4 }
];

// 🅰️ ASIST KRALLIĞI GÜNCEL DATA
const ASIST_KRALLIGI = [
  { sira: 1, oyuncu: "Osimhen", takim: "Galatasaray", istatistik: 2 },
  { sira: 2, oyuncu: "Sara", takim: "Galatasaray", istatistik: 2 },
  { sira: 3, oyuncu: "Torreira", takim: "Galatasaray", istatistik: 2 },
  { sira: 4, oyuncu: "Orkun", takim: "Beşiktaş", istatistik: 2 },
  { sira: 5, oyuncu: "Olaitan", takim: "Beşiktaş", istatistik: 2 }
];

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function KralliklarSayfasi() {
  const [golVerileri] = useState(GOL_KRALLIGI);
  const [asistVerileri] = useState(ASIST_KRALLIGI);

  const getMenuButonStili = (sayfa, aktif) => {
    const bStil = {
      textDecoration: 'none', fontSize: '11px', fontWeight: aktif ? 'bold' : '500', fontFamily: ICERIK_FONTU,
      padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent', whiteSpace: 'nowrap'
    };
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

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* BAŞLIK ALANI */}
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#64748b', fontSize: '1.2rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>İstatistik Krallıkları</p>
      </div>

      {/* 🎯 KAPSAYICI KUTU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
<div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
  {/* 1. Satır: 4 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/" style={getBtn('eksik', false)}>Eksik Listesi</Link>
    <Link href="/haftanin-yildizlari" style={{ ...getBtn('yildizlar', false), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: '#fbcfe8' }}>En İyiler</Link>
    <Link href="/haftanin-analizi" style={{ ...getBtn('analiz', false), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>Tüyolar</Link>
    <Link href="/puan-durumu" style={getBtn('puan', false)}>Puan Durumu</Link>
  </div>
  {/* 2. Satır: 3 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/kralliklar" style={getBtn('krallik', true)}>Gol & Asist</Link>
    <Link href="/form-durumu" style={getBtn('form', false)}>Form Durumu</Link>
    <Link href="/ic-dis-saha" style={getBtn('icdis', false)}>İç-Dış Saha Form</Link>
  </div>
  {/* 3. Satır: 2 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Link href="/fikstur-ilk-yari" style={{ ...getBtn('fiksturl', false), backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>Fikstür 1. Yarı</Link>
    <Link href="/fikstur-ikinci-yari" style={getBtn('fikstur2', false)}>Fikstür 2. Yarı</Link>
  </div>
</div>

        </div>

        {/* TABLOLAR VE ÇİFT REKLAM ALANI */}
        <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 💰 1. ÜST REKLAM ALANI */}
          <div style={{ 
            width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', 
            border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0'
          }}>
            - Reklam Alanı (Google AdSense) -
          </div>

          {/* ⚽ GOL KRALLIĞI TABLOSU */}
          <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>⚽ Gol Krallığı</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
              <tbody>
                {golVerileri.map((veri, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{i+1}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#334155' }}>{veri.oyuncu}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{veri.takim}</div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#22c55e', fontSize: '1.1rem', paddingRight: '15px' }}>{veri.istatistik}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 💰 2. ORTA REKLAM ALANI */}
          <div style={{ 
            width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', 
            border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0'
          }}>
            - Reklam Alanı (Google AdSense) -
          </div>

          {/* 🅰️ ASİST KRALLIĞI TABLOSU */}
          <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>🅰️ Asist Krallığı</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
              <tbody>
                {asistVerileri.map((veri, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{i+1}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#334155' }}>{veri.oyuncu}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{veri.takim}</div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#22c55e', fontSize: '1.1rem', paddingRight: '15px' }}>{veri.istatistik}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 💰 3. EN ALT REKLAM ALANI */}
          <div style={{ 
            width: '100%', height: '60px', backgroundColor: '#f8fafc', borderRadius: '8px', 
            border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0'
          }}>
            - Reklam Alanı (Google AdSense Alt Şerit) -
          </div>

        </div>
      </div>

    </div>
  );
}
