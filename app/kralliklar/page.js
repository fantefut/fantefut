'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

const GOL_KRALLIGI = [
  { sira: 1, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 7 },
  { sira: 2, oyuncu: "Gift Orban", takim: "Amed SF", istatistik: 7 },
  { sira: 3, oyuncu: "Vedat Muriqi", takim: "Fenerbahçe", istatistik: 6 },
  { sira: 4, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 6 },
  { sira: 5, oyuncu: "Eldor Shomurodov", takim: "Başakşehir", istatistik: 6 }
];

const ASIST_KRALLIGI = [
  { sira: 1, oyuncu: "İrfan Can", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 2, oyuncu: "Sara", takim: "Galatasaray", istatistik: 2 },
  { sira: 3, oyuncu: "Torreira", takim: "Galatasaray", istatistik: 2 },
  { sira: 4, oyuncu: "Orkun", takim: "Beşiktaş", istatistik: 2 },
  { sira: 5, oyuncu: "Osimhen", takim: "Galatasaray", istatistik: 2 }
];

export default function KralliklarSayfasi() {
  const [golVerileri] = useState(GOL_KRALLIGI);
  const [asistVerileri] = useState(ASIST_KRALLIGI);

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🎨 LOGO ORTADA - PALATINO GOL VE ASİST KRALLIĞI BAŞLIĞI */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '15px 0 5px 0' }}>
        <img src="/logo.png" alt="FanteFut Logo" style={{ width: '80px', height: '80px', marginBottom: '5px', objectFit: 'contain' }} />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontStyle: 'italic', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0', letterSpacing: '1px' }}>
            FanteFut
          </h1>
        </Link>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif', margin: '4px 0 0 0' }}>
          Süper Lig Gol ve Asist Krallığı
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="krallik" />

        <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
            - Reklam Alanı (Google AdSense) -
          </div>

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

          <div style={{ width: '100%', height: '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
            - Reklam Alanı (Google AdSense) -
          </div>

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

          <div style={{ width: '100%', height: '60px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
            - Reklam Alanı (Google AdSense Alt Şerit) -
          </div>
        </div>
      </div>
    </div>
  );
}
