'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 📊 GÜNCELLENMİŞ EN SON VERİ HAVUZU (Fonksiyon dışına ve en üste alındı!)
const PUAN_DATA = [
  { sira: 1, takim: "Amed SF", o: 6, g: 4, b: 1, m: 1, ag: 15, yg: 7, av: 8, p: 13 },
  { sira: 2, takim: "Galatasaray", o: 6, g: 4, b: 1, m: 1, ag: 13, yg: 10, av: 3, p: 13 },
  { sira: 3, takim: "Beşiktaş", o: 6, g: 4, b: 0, m: 2, ag: 14, yg: 7, av: 7, p: 12 },
  { sira: 4, takim: "Kocaelispor", o: 6, g: 4, b: 0, m: 2, ag: 7, yg: 4, av: 3, p: 12 },
  { sira: 5, takim: "Alanyaspor", o: 6, g: 3, b: 2, m: 1, ag: 8, yg: 6, av: 2, p: 11 },
  { sira: 6, takim: "Fenerbahçe", o: 6, g: 3, b: 1, m: 2, ag: 16, yg: 6, av: 10, p: 10 },
  { sira: 7, takim: "Trabzonspor", o: 6, g: 3, b: 1, m: 2, ag: 13, yg: 5, av: 8, p: 10 },
  { sira: 8, takim: "Kasımpaşa", o: 6, g: 2, b: 4, m: 0, ag: 7, yg: 5, av: 2, p: 10 },
  { sira: 9, takim: "Rizespor", o: 6, g: 3, b: 1, m: 2, ag: 7, yg: 6, av: 1, p: 10 },
  { sira: 10, takim: "Gaziantep FK", o: 6, g: 2, b: 2, m: 2, ag: 7, yg: 7, av: 0, p: 8 },
  { sira: 11, takim: "Çorum FK", o: 6, g: 2, b: 1, m: 3, ag: 13, yg: 12, av: 1, p: 7 },
  { sira: 12, takim: "Başakşehir", o: 6, g: 2, b: 1, m: 3, ag: 10, yg: 11, av: -1, p: 7 },
  { sira: 13, takim: "Gençlerbirliği", o: 6, g: 2, b: 1, m: 3, ag: 5, yg: 13, av: -8, p: 7 },
  { sira: 14, takim: "Erzurumspor FK", o: 6, g: 2, b: 1, m: 3, ag: 3, yg: 11, av: -8, p: 7 },
  { sira: 15, takim: "Konyaspor", o: 6, g: 1, b: 1, m: 4, ag: 4, yg: 8, av: -4, p: 4 },
  { sira: 16, takim: "Samsunspor", o: 6, g: 1, b: 1, m: 4, ag: 6, yg: 12, av: -6, p: 4 },
  { sira: 17, takim: "Göztepe", o: 6, g: 0, b: 3, m: 3, ag: 11, yg: 15, av: -4, p: 3 },
  { sira: 18, takim: "Eyüpspor", o: 6, g: 1, b: 0, m: 5, ag: 2, yg: 16, av: -14, p: 3 }
];

export default function PuanDurumuSayfasi() {
  const [puanVerileri] = useState(PUAN_DATA);

  // Küme düşme potası tam kurallara uygun olarak son 3 takıma (s >= 16) çekildi!
  const getSatirStili = (s) => {
    if (s === 1) return { backgroundColor: '#1e3a8a', color: '#ffffff' }; 
    if (s === 2) return { backgroundColor: '#fef08a', color: '#132444' }; 
    if (s === 3) return { backgroundColor: '#f3e8ff', color: '#6b21a8' }; 
    if (s === 4) return { backgroundColor: '#dcfce7', color: '#166534' }; 
    if (s >= 16) return { backgroundColor: '#fee2e2', color: '#991b1b' }; 
    return { backgroundColor: '#ffffff', color: '#334155' };
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 Ortak Logolu Başlık Bileşeni */}
      <Header altBaslik="Süper Lig Puan Durumu" />

      {/* 🎯 ANA KAPSAYICI KUTU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Puan Durumu aktif) */}
        <Navbar aktifSayfa="puan" />

        {/* 💰 1. ÜST REKLAM ALANI */}
        <div style={{ 
          width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', 
          border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifycontent: 'center',
          color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0'
        }}>
          - Reklam Alanı (Google AdSense) -
        </div>

        {/* 📱 GÜNCEL PUAN CETVELİ TABLOSU */}
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

        {/* ℹ Notlar & Kısaltmalar */}
        <div style={{ maxWidth: '480px', margin: '15px auto 0 auto', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.4' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e3a8a' }}></span> ŞL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fef08a' }}></span> ŞL Elm</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f3e8ff' }}></span> AL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dcfce7' }}></span> KL Elm</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fee2e2' }}></span> Küme Düşme Hattı</span>
          </div>
          
          <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: ICERIK_FONTU }}>
            <strong>Puan Cetveli Kısaltmaları:</strong> 
            <span style={{ marginLeft: '4px' }}><strong>O:</strong> Oynadığı Maç Sayısı |</span>
            <span style={{ marginLeft: '4px' }}><strong>G:</strong> Galibiyet |</span>
            <span style={{ marginLeft: '4px' }}><strong>B:</strong> Beraberlik |</span>
            <span style={{ marginLeft: '4px' }}><strong>M:</strong> Mağlubiyet |</span>
            <span style={{ marginLeft: '4px' }}><strong>AG:</strong> Atılan Gol |</span>
            <span style={{ marginLeft: '4px' }}><strong>YG:</strong> Yenen Gol |</span>
            <span style={{ marginLeft: '4px' }}><strong>AV:</strong> Averaj |</span>
            <span style={{ marginLeft: '4px' }}><strong>P:</strong> Toplam Puan</span>
          </div>
        </div>

        {/* 💰 2. EN ALT REKLAM ALANI */}
        <div style={{ 
          width: '100%', height: '60px', backgroundColor: '#f8fafc', borderRadius: '#8px', 
          border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifycontent: 'center',
          color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0'
        }}>
          - Reklam Alanı (Google AdSense Alt Şerit) -
        </div>

      </div>
    </div>
  );
}
