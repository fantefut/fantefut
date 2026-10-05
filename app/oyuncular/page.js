'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 🏆 FOTMOB İSTATİSTİK VERİ HAVUZU (AdSense Dostu: Takım ve Fantezi Lig Fiyatları Eklenmiş Hali)
const FOTMOB_OYUNCU_DATA = {
  "Kurtarma Yüzdesi": [
    { oyuncu: "Bahadır", takim: "Konyaspor", deger: "%92,3", fiyat: "4.5M" },
    { oyuncu: "Serhat", takim: "Kocaelispor", deger: "%82,6", fiyat: "4M" },
    { oyuncu: "Onana", takim: "Trabzonspor", deger: "%81,5", fiyat: "5M" },
    { oyuncu: "Muhammed", takim: "Başakşehir", deger: "%81,3", fiyat: "4.5M" },
    { oyuncu: "Ederson", takim: "Fenerbahçe", deger: "%80,0", fiyat: "5M" }
  ],
  "90 Dakikada Yenilen Gol": [
    { oyuncu: "Luka", takim: "Göztepe", deger: "3,1", fiyat: "4.5M" },
    { oyuncu: "Deniz", takim: "Konyaspor", deger: "3,1", fiyat: "4M" },
    { oyuncu: "Moldovan", takim: "Eyüpspor", deger: "2,4", fiyat: "4M" },
    { oyuncu: "İrfan", takim: "Gençlerbirliği", deger: "2,2", fiyat: "4.5M" },
    { oyuncu: "Felipe", takim: "Gaziantep", deger: "2,0", fiyat: "4M" }
  ],
  "90 Dakikada xG (Beklenen Gol)": [
    { oyuncu: "Osimhen", takim: "Galatasaray", deger: "1,55", fiyat: "12M" },
    { oyuncu: "Mihaila", takim: "Rizespor", deger: "1,48", fiyat: "5M" },
    { oyuncu: "Orban", takim: "Amed SF", deger: "1,10", fiyat: "6M" },
    { oyuncu: "Vedat", takim: "Fenerbahçe", deger: "1,08", fiyat: "9M" },
    { oyuncu: "Vlahović", takim: "Beşiktaş", deger: "0,96", fiyat: "10M" }
  ],
  "90 Dakikada xA (Beklenen Asist)": [
    { oyuncu: "Kerem", takim: "Fenerbahçe", deger: "0,50", fiyat: "8.5M" },
    { oyuncu: "Batrakov", takim: "Galatasaray", deger: "0,46", fiyat: "8M" },
    { oyuncu: "Levent", takim: "Fenerbahçe", deger: "0,45", fiyat: "4.5M" },
    { oyuncu: "Sara", takim: "Galatasaray", deger: "0,44", fiyat: "7M" },
    { oyuncu: "Oğuz", takim: "Fenerbahçe", deger: "0,38", fiyat: "6.5M" }
  ]
};

export default function OyuncularIstatistikSayfasi() {
  const [istatistikler] = useState(FOTMOB_OYUNCU_DATA);

  // Örnek kodunuzdaki taşma korumalı ve AdSense onay uyumlu reklam bileşeni
  const renderRek = (ozelStil = {}) => {
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

  // İstatistik tablolarını ve altındaki dinamik SEO açıklama kutusunu render eden fonksiyon
  const renderTablo = (baslik, liste, emoji, ozelAnahtar, seoMetni) => (
    <div key={ozelAnahtar} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>
        {emoji} {baslik}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {/* Sıralama Numarası */}
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center', fontSize: '13px' }}>
                {i + 1}
              </td>
              {/* Oyuncu ve Takım Bilgisi */}
              <td style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: '700', color: '#334155', fontSize: '14px', letterSpacing: '-0.2px' }}>
                  {v.oyuncu}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px' }}>
                  {v.takim} • <span style={{ color: '#b45309', fontWeight: 'bold' }}>{v.fiyat}</span>
                </div>
              </td>
              {/* FotMob İstatistik Değeri */}
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '850', color: '#132444', fontSize: '1.05rem', paddingRight: '20px' }}>
                {v.deger}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 📝 Tablo Altı Özgün SEO Açıklama Kutusu */}
      <div style={{
        padding: '10px 12px',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        fontSize: '11px',
        lineHeight: '1.4',
        color: '#475569',
        fontFamily: 'Verdana, sans-serif',
      }}>
        {seoMetni}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        {/* Navbar bileşenimize oyuncular sekmesinin aktif olduğunu belirtiyoruz */}
        <Navbar aktifSayfa="oyuncular" />

        {/* Sayfa Başlığı */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.10rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Oyuncu İstatistikleri
          </h1>
        </div>

        {/* 1. Üst Reklam: Başlığın altında, 16px üst - 24px alt boşluk */}
        {renderRek({ marginTop: '16px', marginBottom: '24px' })}

        {/* 🧤 İLK İKİ İSTATİSTİK KUTUSU (Kaleci Departmanı) */}
        {renderTablo(
          "Kurtarma Yüzdesi En Yüksek Kaleciler", 
          istatistikler["Kurtarma Yüzdesi"], 
          "🧤", 
          "ist-kurtarma",
          "Haftalık kaleci performans analizlerinde kurtarış yüzdeleri, takımların savunma direncini doğrudan yansıtır. Fantezi kadrolarında kaleci tercihi yaparken bu başarı oranları kritik bir referanstır."
        )}
        
        {renderTablo(
          "Yenilen Gol (90')", 
          istatistikler["90 Dakikada Yenilen Gol"], 
          "🥅", 
          "ist-yenilentop",
          "Maç başına kalesinde en çok gol gören veya kalesini gole kapatmakta zorlanan savunma hatlarının güncel analizi. Transfer listelerinizde savunma zafiyeti yaşayan ekipleri belirlemek için incelenmelidir."
        )}

        {/* 2. Orta Reklam: İlk iki kutu ile diğer ikisinin tam arasında, 24px üst - 24px alt boşluk */}
        {renderRek({ marginTop: '24px', marginBottom: '24px' })}

        {/* 🎯 DİĞER İKİ İSTATİSTİK KUTUSU (Ofans Departmanı) */}
        {renderTablo(
          "xG (Gol Beklentisi 90') Liderleri", 
          istatistikler["90 Dakikada xG (Beklenen Gol)"], 
          "🔥", 
          "ist-xg",
          "Süper Lig'de 90 dakika başına en yüksek gol beklentisi (xG) yakalayan hücumcular. Şansları gole çevirme oranlarının da dikkat edilmesi gereken bu isimler, fantezi lig kadrolarının değişmez golcü adaylarıdır."
        )}
        
        {renderTablo(
          "xA (Asist Beklentisi 90') Liderleri", 
          istatistikler["90 Dakikada xA (Beklenen Asist)"], 
          "🎯", 
          "ist-xa",
          "Üçüncü bölgede anahtar paslar ve gol pası beklentisi (xA) üreten Süper Lig yaratıcı oyuncuları. Duran top kullanan ve asist potansiyeli yüksek oyuncuları seçerken bu veriler yönlendiricidir."
        )}


        {/* 📝 3. SEO UYUMLU DETAYLI BİLGİLENDİRME METNİ (FotMob Atıflı ve Kaliteli Kapanış) */}
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
          <strong>Süper Lig Oyuncu İstatistikleri</strong> Fantezi lig kadrolarınızı kurarken fark yaratacak en kritik ölçümler olan kurtarma yüzdesi, 90 dakikada yenilen gol oranları ile hücumda tehlike yaratan 90 dakikalık gol beklentisi (xG) ve asist beklentisi (xA) liderleri bu tabloda listelenmektedir. Veriler tarafsız analiz süreçleri adına global veri sağlayıcısı <strong>fotmob.com</strong> üzerinden derlenmiş olup, oyuncuların fantezi lig oyun içi fiyatlarıyla harmanlanarak en yararlı transfer seçimlerini yapabilmeniz için özelleştirilmiştir.
        </div>

        <Footer />
      </div>
    </div>
  );
}
