'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// 🏆 FOTMOB İSTATİSTİK VERİ HAVUZU (AdSense Dostu: Takım ve Fantezi Lig Fiyatları Eklenmiş Hali)
const FOTMOB_OYUNCU_DATA = {
  "Kurtarma Yüzdesi": [
    { oyuncu: "Bahadır", takim: "Konyaspor", deger: "%88,9", fiyat: "4.5M" },
    { oyuncu: "Ederson", takim: "Fenerbahçe", deger: "%86,2", fiyat: "5M" },
    { oyuncu: "Onana", takim: "Trabzonspor", deger: "%84,8", fiyat: "5M" },
    { oyuncu: "Muhammed", takim: "Başakşehir", deger: "%82,6", fiyat: "4.5M" },
    { oyuncu: "Ertuğrul", takim: "Erzurumspor", deger: "%82,6", fiyat: "4M" }
  ],
  "90 Dakikada Yenilen Gol": [
    { oyuncu: "Luka", takim: "Göztepe", deger: "3,1", fiyat: "4.5M" },
    { oyuncu: "Deniz", takim: "Konyaspor", deger: "3,1", fiyat: "4M" },
    { oyuncu: "Moldovan", takim: "Eyüpspor", deger: "2,6", fiyat: "4M" },
    { oyuncu: "Okan", takim: "Samsunspor", deger: "2,4", fiyat: "4.5M" },
    { oyuncu: "İrfan", takim: "Gençlerbirliği", deger: "2,0", fiyat: "4.5M" }
  ],
  "90 Dakikada xG (Beklenen Gol)": [
    { oyuncu: "Osimhen", takim: "Galatasaray", deger: "1,36", fiyat: "12M" },
    { oyuncu: "Vlahović", takim: "Beşiktaş", deger: "1,03", fiyat: "10M" },
    { oyuncu: "Vedat", takim: "Fenerbahçe", deger: "0,93", fiyat: "9M" },
    { oyuncu: "Mihaila", takim: "Rizespor", deger: "0,92", fiyat: "5M" },
    { oyuncu: "Diagne", takim: "Amed SF", deger: "0,90", fiyat: "6M" }
  ],
  "90 Dakikada xA (Beklenen Asist)": [
    { oyuncu: "Hajradinovic", takim: "Kasımpaşa", deger: "0,48", fiyat: "5.5M" },
    { oyuncu: "Kerem", takim: "Fenerbahçe", deger: "0,46", fiyat: "8.5M" },
    { oyuncu: "Levent", takim: "Fenerbahçe", deger: "0,45", fiyat: "4.5M" },
    { oyuncu: "Yunus", takim: "Galatasaray", deger: "0,38", fiyat: "7.5M" },
    { oyuncu: "Sara", takim: "Galatasaray", deger: "0,38", fiyat: "7M" }
  ]
};

export default function OyuncularIstatistikSayfasi() {
  const [istatistikler] = useState(FOTMOB_OYUNCU_DATA);

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

{/* STANDART BOŞLUKLU BAŞLIK BLOKU */}
<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
  <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
    Fantezi Lig Oyuncu İstatistikleri
  </h1>
</div>

{/* YENİ EKLENEN STANDART YEŞİL KUTU */}
<div style={{
  padding: '12px 14px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  border: '1px solid #bbf7d0',
  marginBottom: '20px',
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#166534',
  fontFamily: ICERIK_FONTU,
  width: '100%'
}}>
  <strong>Performans Analiz Notu:</strong> Fantezi lig kadrolarınızı gerçekçi verilerle kurmanız için hazırlanan kurtarma yüzdeleri, gol beklentisi (xG) ve asist beklentisi (xA) verileri global sağlayıcı katkılarıyla harmanlanmıştır.
</div>


        {/* 🧤 İLK İKİ İSTATİSTİK KUTUSU (Kaleci Departmanı) */}
        {renderTablo(
          "Kurtarma Yüzdesi En Yüksek Kaleciler", 
          istatistikler["Kurtarma Yüzdesi"], 
          "🧤", 
          "ist-kurtarma",
          "Haftalık kaleci performans analizlerinde kurtarış yüzdeleri, takımların savunma direnci durumunu doğrudan yansıtır. Fantezi kadrolarında kaleci tercihi yaparken bu başarı oranları kritik bir referanstır. Sıralamadaki diğer isimler Victor ve Gianniotis'i de burayı okuyanlara özel yazalım."
        )}
        
        {renderTablo(
          "Yenilen Gol (90')", 
          istatistikler["90 Dakikada Yenilen Gol"], 
          "🥅", 
          "ist-yenilentop",
          "Maç başına kalesinde en çok gol gören veya kalesini gole kapatmakta zorlanan savunma hatlarının güncel analizi. Kadro mühendisliği süreçlerinizde savunma zafiyeti yaşayan ekipleri belirlemek için titizlikle incelenmelidir. Felip ve Tobiasz sırasıyla devam eden oyuncuları bu listenin."
        )}

        {/* 🎯 DİĞER İKİ İSTATİSTİK KUTUSU (Ofans Departmanı) */}
        {renderTablo(
          "xG (Gol Beklentisi 90') Liderleri", 
          istatistikler["90 Dakikada xG (Beklenen Gol)"], 
          "🔥", 
          "ist-xg",
          "Fantezi futbol ekosisteminde 90 dakika başına en yüksek gol beklentisi (xG) yakalayan hücumcular. Şansları gole çevirme oranlarına da dikkat edilmesi gereken bu isimler, fantezi lig kadrolarının değişmez golcü adaylarıdır. Orban ve Juan girdikleri pozisyonlarla bu hafta altıncı ve yedinci sıradalar."
        )}
        
        {renderTablo(
          "xA (Asist Beklentisi 90') Liderleri", 
          istatistikler["90 Dakikada xA (Beklenen Asist)"], 
          "🎯", 
          "ist-xa",
          "Üçüncü bölgede anahtar paslar ve gol pası beklentisi (xA) üreten yaratıcı oyuncular. Duran top kullanan ve asist potansiyeli yüksek oyuncuları seçerken bu veriler yönlendiricidir. Kzyridis ve Skov Olsen oynadıkları oyunla listenin devamındalar."
        )}

        {/* 📝 3. SEO UYUMLU DETAYLI BİLGİLENDİRME METNİ */}
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
          <strong>Fantezi Lig Oyuncu İstatistikleri:</strong> Fantezi futbol kadrolarınızı kurarken fark yaratacak en kritik ölçümler olan kurtarma yüzdesi, 90 dakikada yenilen gol oranları ile hücumda tehlike yaratan 90 dakikalık gol beklentisi (xG) ve asist beklentisi (xA) liderleri bu tabloda listelenmektedir. Veriler tarafsız analiz süreçleri adına global veri sağlayıcısı <strong>fotmob.com</strong> üzerinden derlenmiş olup, oyuncuların fantezi lig oyun içi fiyatlarıyla harmanlanarak en yararlı transfer seçimlerini yapabilmeniz için özelleştirilmiştir. Kadro planlamalarınızı optimize etmek adına sitemizdeki <strong>Tüyolar</strong> ve anlık güncellenen <strong>Eksik Listesi</strong> alanlarındaki verileri de bu istatistiklerle birlikte değerlendirebilirsiniz.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
