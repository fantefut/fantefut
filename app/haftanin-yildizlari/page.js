'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 🏆 1. VERİ HAVUZU: GEÇEN HAFTANIN EN İYİLERİ
const GEÇEN_HAFTA_DATA = {
  "Kaleciler": [
    { oyuncu: "Gianniotis", takim: "Kasımpaşa", puan: 10 },
    { oyuncu: "Serhat", takim: "Kocaelispor", puan: 9 },
    { oyuncu: "Ederson", takim: "Fenerbahçe", puan: 8 }
  ],
  "Defanslar": [
    { oyuncu: "Mustafa", takim: "Trabzonspor", puan: 11 },
    { oyuncu: "Brown", takim: "Fenerbahçe", puan: 9 },
    { oyuncu: "Mouanga", takim: "Kasımpaşa", puan: 8 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Salah", takim: "Trabzonspor", puan: 23 },
    { oyuncu: "Greenwood", takim: "Fenerbahçe", puan: 18 },
    { oyuncu: "İrfan Can", takim: "Fenerbahçe", puan: 15 }
  ],
  "Forvetler": [
    { oyuncu: "Vedat", takim: "Fenerbahçe", puan: 21 },
    { oyuncu: "Orban", takim: "Amed", puan: 12 },
    { oyuncu: "Shomurodov", takim: "Başakşehir", puan: 12 }
  ]
};

// 📊 2. VERİ HAVUZU: TOPLAM OYUNCU PUANLARI
const GENEL_TOPLAM_DATA = {
  "Kaleciler": [
    { oyuncu: "Serhat", takim: "Kocaelispor", puan: 33 },
    { oyuncu: "Fofana", takim: "Rizespor", puan: 32 },
    { oyuncu: "Bahadır", takim: "Konyaspor", puan: 30 }
  ],
  "Defanslar": [
    { oyuncu: "Sorescu", takim: "Gaziantep", puan: 38 },
    { oyuncu: "Skriniar", takim: "Fenerbahçe", puan: 32 },
    { oyuncu: "Dijksteel", takim: "Kocaelispor", puan: 31 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Salah", takim: "Trabzonspor", puan: 64 },
    { oyuncu: "Greenwood", takim: "Fenerbahçe", puan: 42 },
    { oyuncu: "Dia Saba", takim: "Amed", puan: 33 }
  ],
  "Forvetler": [
    { oyuncu: "Orban", takim: "Amed", puan: 52 },
    { oyuncu: "Osimhen", takim: "Galatasaray", puan: 46 },
    { oyuncu: "Shomurodov", takim: "Başakşehir", puan: 45 }
  ]
};

export default function HaftaninYildizlariSayfasi() {
  const [haftalikYildizlar] = useState(GEÇEN_HAFTA_DATA);
  const [genelYildizlar] = useState(GENEL_TOPLAM_DATA);

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
      
      {/* 🌟 Logolu ortak Header yapısı */}
      <Header altBaslik="Fantezi Lig En Çok Puan Toplayanlar" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni */}
        <Navbar aktifSayfa="yildiz" />

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {renderRek('buyuk')}

          {/* 🏆 1. SET: GEÇEN HAFTANIN EN İYİLERİ */}
          <h2 style={{ fontSize: '1.2rem', color: '#132444', marginBottom: '15px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #f59e0b', paddingLeft: '8px' }}>
            🏆 Geçen Haftanın En İyileri
          </h2>

          {renderMevki("Kaleciler", haftalikYildizlar["Kaleciler"], "🧤", "k1")}
          {renderMevki("Defanslar", haftalikYildizlar["Defanslar"], "🛡️", "d1")}
          {renderMevki("Orta Sahalar", haftalikYildizlar["Orta Sahalar"], "🎯", "o1")}
          {renderMevki("Forvetler", haftalikYildizlar["Forvetler"], "⚽", "f1")}

          {/* 💰 2. BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 📊 2. SET: TOPLAM OYUNCU PUANLARI */}
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
