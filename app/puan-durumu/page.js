'use client';
import { useState } from 'react';
import Link from 'next/link';

const PUAN_DATA = [
  { sira: 1, takim: "Galatasaray", o: 5, g: 4, b: 1, m: 0, ag: 13, yg: 6, av: 7, p: 13 },
  { sira: 2, takim: "Beşiktaş", o: 5, g: 4, b: 0, m: 1, ag: 12, yg: 4, av: 8, p: 12 },
  { sira: 3, takim: "Amed SF", o: 5, g: 3, b: 1, m: 1, ag: 12, yg: 5, av: 7, p: 10 },
  { sira: 4, takim: "Kasımpaşa", o: 5, g: 2, b: 3, m: 0, ag: 7, yg: 5, av: 2, p: 9 },
  { sira: 5, takim: "Rizespor", o: 5, g: 3, b: 0, m: 2, ag: 5, yg: 4, av: 1, p: 9 },
  { sira: 6, takim: "Kocaelispor", o: 5, g: 3, b: 0, m: 2, ag: 5, yg: 4, av: 1, p: 9 },
  { sira: 7, takim: "Gaziantep FK", o: 5, g: 2, b: 2, m: 1, ag: 7, yg: 5, av: 2, p: 8 },
  { sira: 8, takim: "Alanyaspor", o: 5, g: 2, b: 2, m: 1, ag: 6, yg: 5, av: 1, p: 8 },
  { sira: 9, takim: "Trabzonspor", o: 5, g: 2, b: 1, m: 2, ag: 9, yg: 5, av: 4, p: 7 },
  { sira: 10, takim: "Çorum FK", o: 5, g: 2, b: 1, m: 2, ag: 12, yg: 10, av: 2, p: 7 },
  { sira: 11, takim: "Fenerbahçe", o: 5, g: 2, b: 1, m: 2, ag: 8, yg: 6, av: 2, p: 7 },
  { sira: 12, takim: "Gençlerbirliği", o: 5, g: 2, b: 1, m: 2, ag: 5, yg: 9, av: -4, p: 7 },
  { sira: 13, takim: "Başakşehir", o: 5, g: 1, b: 1, m: 3, ag: 6, yg: 11, av: -5, p: 4 },
  { sira: 14, takim: "Samsunspor", o: 5, g: 1, b: 1, m: 3, ag: 6, yg: 11, av: -5, p: 4 },
  { sira: 15, takim: "Erzurumspor FK", o: 5, g: 1, b: 1, m: 3, ag: 2, yg: 11, av: -9, p: 4 },
  { sira: 16, takim: "Konyaspor", o: 5, g: 1, b: 0, m: 4, ag: 4, yg: 8, av: -4, p: 3 },
  { sira: 17, takim: "Eyüpspor", o: 5, g: 1, b: 0, m: 4, ag: 2, yg: 8, av: -6, p: 3 },
  { sira: 18, takim: "Göztepe", o: 5, g: 0, b: 2, m: 3, ag: 9, yg: 13, av: -4, p: 2 }
];

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function PuanDurumuSayfasi() {
  const [puanVerileri] = useState(PUAN_DATA);

  const getSatirStili = (s) => {
    if (s === 1) return { backgroundColor: '#1e3a8a', color: '#ffffff' }; 
    if (s === 2) return { backgroundColor: '#fef08a', color: '#132444' }; 
    if (s === 3) return { backgroundColor: '#f3e8ff', color: '#6b21a8' }; 
    if (s === 4) return { backgroundColor: '#dcfce7', color: '#166534' }; 
    if (s >= 16) return { backgroundColor: '#fee2e2', color: '#991b1b' }; 
    return { backgroundColor: '#ffffff', color: '#334155' };
  };

  const getBtn = (sayfa, aktif) => {
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
        <p style={{ color: '#64748b', fontSize: '1.2rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>Süper Lig Puan Durumu</p>
      </div>

      {/* 🎯 ANA KAPSAYICI KUTU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* 📱 9 SEKMELİ YENİ GEZİNTİ MENÜSÜ */}
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '25px', display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={getBtn('eksik', false)}>Eksik Listesi</Link>
          <Link href="/form-durumu" style={getBtn('form', false)}>Form Durumu</Link>
          <Link href="/ic-dis-saha" style={getBtn('icdis', false)}>İç-Dış Saha Form</Link>
          <Link href="/fikstur-ilk-yari" style={getBtn('fikstur1', false)}>Fikstür 1. Yarı</Link>
          <Link href="/fikstur-ikinci-yari" style={getBtn('fikstur2', false)}>Fikstür 2. Yarı</Link>
          <Link href="/puan-durumu" style={getBtn('puan', true)}>Puan Durumu</Link>
          <Link href="/kralliklar" style={getBtn('krallik', false)}>Gol & Asist</Link>
          <Link href="/haftanin-yildizlari" style={getBtn('yildiz', false)}>Yıldızlar</Link>
          <Link href="/haftanin-analizi" style={getBtn('analiz', false)}>Analiz</Link>
        </div>

        {/* 💰 1. ÜST REKLAM ALANI */}
        <div style={{ 
          width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', 
          border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0'
        }}>
          - Reklam Alanı (Google AdSense) -
        </div>

        {/* 📱 PUAN CETVELİ TABLOSU */}
        <div style={{ maxWidth: '480px', margin: '0 auto', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', textAlign: 'center', fontSize: '11px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '2px solid #e2e8f0', fontSize: '10px' }}>
                <th style={{ padding: '8px 3px', width: '22px' }}>#</th>
                <th style={{ padding: '8px 3px', textAlign: 'left', width: '105px' }}>Takım</th>
                <th style={{ padding: '8px 3px', width: '22px' }}>O</th>
                <th style={{ padding: '8px 3px', width: '22px' }}>G</th>
                <th style={{ padding: '8px 3px', width: '22px' }}>B</th>
                <th style={{ padding: '8px 3px', width: '22px' }}>M</th>
                <th style={{ padding: '8px 3px', width: '24px', fontWeight: 'bold' }}>AG</th>
                <th style={{ padding: '8px 3px', width: '24px', fontWeight: 'bold' }}>YG</th>
                <th style={{ padding: '8px 3px', width: '24px', fontWeight: 'bold' }}>AV</th>
                <th style={{ padding: '8px 3px', fontWeight: 'bold', color: '#132444', width: '28px' }}>P</th>
              </tr>
            </thead>
            <tbody>
              {puanVerileri.map((v) => {
                const st = getSatirStili(v.sira);
                return (
                  <tr key={v.sira} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: st.backgroundColor, color: st.color }}>
                    <td style={{ padding: '9px 3px', fontWeight: '500' }}>{v.sira}</td>
                    <td style={{ padding: '9px 3px', textAlign: 'left', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{v.takim}</td>
                    <td style={{ padding: '9px 3px' }}>{v.o}</td>
                    <td style={{ padding: '9px 3px' }}>{v.g}</td>
                    <td style={{ padding: '9px 3px' }}>{v.b}</td>
                    <td style={{ padding: '9px 3px' }}>{v.m}</td>
                    <td style={{ padding: '9px 3px' }}>{v.ag}</td>
                    <td style={{ padding: '9px 3px' }}>{v.yg}</td>
                    <td style={{ padding: '9px 3px' }}>{v.av > 0 ? `+${v.av}` : v.av}</td>
                    <td style={{ padding: '9px 3px', fontWeight: 'bold', fontSize: '12px' }}>{v.p}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ℹ️ RENKLİ AÇIKLAMA NOTLARI */}
        <div style={{ maxWidth: '480px', margin: '15px auto 0 auto', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e3a8a' }}></span> ŞL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fef08a' }}></span> ŞL Elm</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f3e8ff' }}></span> AL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dcfce7' }}></span> KL Elm</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fee2e2' }}></span> Küme Düşme Hattı
          </div>
        </div>

        {/* 💰 2. EN ALT REKLAM ALANI */}
        <div style={{ 
          width: '100%', height: '60px', backgroundColor: '#f8fafc', borderRadius: '8px', 
          border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0'
        }}>
          - Reklam Alanı (Google AdSense Alt Şerit) -
        </div>

      </div>
    </div>
  );
}
