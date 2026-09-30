'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

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

  // Ortak kurallara göre düzenlenen, AdSense onay dostu ve taşma korumalı reklam alanı
  const renderRek = (ozelStil = {}) => {
    return (
      <div style={{
        width: '100%',
        maxWidth: '100%', // Mobilde sağa taşmaları engeller
        minHeight: '50px', // Onay süreci için talep edilen alt sınır
        maxHeight: '100px', // Onay süreci için talep edilen üst sınır
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

  const renderMevki = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '15px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>{emoji} {mName}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center', fontSize: '13px' }}>{i+1}</td>
              <td style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: '700', color: '#334155', fontSize: '14px', letterSpacing: '-0.2px' }}>{v.oyuncu}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{v.takim}</div>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: '1.05rem', paddingRight: '20px' }}>{v.puan} P</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="yildiz" />

        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Fantezi Lig Haftanın En İyileri ve Puanları
          </h1>
        </div>

        {/* 1. Üst Reklam: Başlığın tam altında, kurallara uygun 16px üst - 24px alt boşlukla yerleşti */}
        {renderRek({ marginTop: '16px', marginBottom: '24px' })}

        {/* 🏆 1. SET: GEÇEN HAFTANIN EN İYİLERİ */}
        <h2 style={{ fontSize: '0.95rem', color: '#132444', marginBottom: '8px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #f59e0b', paddingLeft: '8px' }}>
          🏆 Geçen Haftanın En İyileri
        </h2>

        {renderMevki("Kaleciler", haftalikYildizlar["Kaleciler"], "🧤", "k1")}
        {renderMevki("Defanslar", haftalikYildizlar["Defanslar"], "🛡️", "d1")}
        {renderMevki("Orta Sahalar", haftalikYildizlar["Orta Sahalar"], "🎯", "o1")}
        {renderMevki("Forvetler", haftalikYildizlar["Forvetler"], "⚽", "f1")}

        {/* 2. Orta Reklam: İki büyük veri/tablo kümesinin tam ortasına 24px-24px boşlukla yerleşti */}
        {renderRek({ marginTop: '24px', marginBottom: '24px' })}

        {/* 📊 2. SET: TOPLAM OYUNCU PUANLARI */}
        <h2 style={{ fontSize: '0.95rem', color: '#132444', marginBottom: '8px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #10b981', paddingLeft: '8px' }}>
          📊 Toplam Oyuncu Puanları
        </h2>

        {renderMevki("Kaleciler", genelYildizlar["Kaleciler"], "🧤", "k2")}
        {renderMevki("Defanslar", genelYildizlar["Defanslar"], "🛡️", "d2")}
        {renderMevki("Orta Sahalar", genelYildizlar["Orta Sahalar"], "🎯", "o2")}
        {renderMevki("Forvetler", genelYildizlar["Forvetler"], "⚽", "f2")}

        {/* 3. 🎯 SEO METNİ EN ALTA ALINDI: Kullanıcıyı boğmamak için tüm tabloların bittiği yere, Footer'ın tam üstüne konumlandırıldı */}
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
          <strong>Fantezi Lig En İyiler Analizi:</strong> Süper Lig'de geride kalan haftanın en yüksek performans - skor katkısı gösteren oyuncuları ve mevkilerine göre dağılımları bu sayfada listelenmektedir. Kaleci, defans, orta saha ve forvet oyuncularının topladığı haftalık puanların yanı sıra genel toplamdaki en başarılı isimleri inceleyebilir, fantezi futbol kadrolarınızı bu istatistikler doğrultusunda oluşturabilirsiniz.
        </div>

        {/* 4. Eski en alt reklam alanı tamamen temizlendi. */}

        <Footer />
      </div>
    </div>
  );
}
