'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 📊 YENİ ÖZGÜN VE ESNEK OYUNCU ÖNERİLERİ HAVUZU (Takım ve 5M Değeriyle!)
const REHBER_DATA = {
  "Kaleci": [
    { isim: "Uğurcan Ⓚ", takim: "Galatasaray", fiyat: "5.5M" },
    { isim: "Ertuğrul", takim: "Erzurumspor", fiyat: "4M" },
    { isim: "Serhat", takim: "Kocaelispor", fiyat: "4M" },
    { isim: "Lafont", takim: "Amed SF", fiyat: "4M" }
  ],
  "Defans": [
    { isim: "Brown", takim: "Fenerbahçe", fiyat: "5M" },
    { isim: "Orhan Ⓚ", takim: "Erzurumspor", fiyat: "4.5M" },
    { isim: "Giorbelidze", takim: "Erzurumspor", fiyat: "4M" },
    { isim: "Dellova", takim: "Amed SF", fiyat: "4M" },
    { isim: "Sorescu", takim: "Gaziantep", fiyat: "4.5M" },
    { isim: "Borza", takim: "Çorumspor", fiyat: "4.5M" },
    { isim: "Dijksteel", takim: "Kocaelispor", fiyat: "4.5M" },
    { isim: "Abdülkerim", takim: "Galatasaray", fiyat: "5.5M" }
  ],
  "Orta Saha": [
    { isim: "Dia Saba", takim: "Amed SF", fiyat: "5.5M" },
    { isim: "Yunus", takim: "Galatasaray", fiyat: "7.5M" },
    { isim: "Sara Ⓚ", takim: "Galatasaray", fiyat: "7M" },
    { isim: "Greenwood", takim: "Fenerbahçe", fiyat: "11M" },
    { isim: "Asensio", takim: "Fenerbahçe", fiyat: "10M" },
    { isim: "Kerem", takim: "Fenerbahçe", fiyat: "8.5M" },
    { isim: "Kyziridis", takim: "Çorum", fiyat: "5.5M" },
    { isim: "Cengiz", takim: "Çorum", fiyat: "5.5M" }
  ],
  "Forvet": [
    { isim: "Osimhen Ⓚ", takim: "Galatasaray", fiyat: "12M" },
    { isim: "Orban", takim: "Amed SF", fiyat: "6M" },
    { isim: "Vedat", takim: "Fenerbahçe", fiyat: "9M" },
    { isim: "Shomurodov", takim: "Başakşehir", fiyat: "7.5M" },
    { isim: "Benedyczak", takim: "Kasımpaşa", fiyat: "6M" }
  ]
};

export default function HaftaninAnaliziSayfasi() {
  const [onerilenOyuncular] = useState(REHBER_DATA);

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

  const renderMevkiTablosu = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '15px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>{emoji} {mName} Önerileri</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center', fontSize: '13px' }}>{i+1}</td>
              <td style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: '700', color: '#334155', fontSize: '14px', letterSpacing: '-0.2px' }}>{v.isim}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{v.takim}</div>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: '1.05rem', paddingRight: '20px' }}>{v.fiyat}</td>
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
        <Navbar aktifSayfa="analiz" />

        {/* 🎯 BAŞLIK ALANI */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '12px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Fantezi Lig Kaptan Önerileri ve Kadro Tüyoları
          </h1>
        </div>

        {/* 1. Üst Reklam: Başlığın altına, kurallara uygun 16px üst - 24px alt boşlukla yerleşti */}
        {renderRek({ marginTop: '16px', marginBottom: '24px' })}

        <h2 style={{ 
          fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', marginTop: '0px',
          fontFamily: ICERIK_FONTU, fontWeight: 'bold', 
          letterSpacing: '0.5px', textAlign: 'left', width: '100%' 
        }}>
          Fantezi Lig Sekizinci Hafta Kadronuz İçin Oyuncu Önerileri ve Kaptan Seçimi
        </h2>

        {/* 🧤 KALECİLER BÖLÜMÜ */}
        {renderMevkiTablosu("Kaleci", onerilenOyuncular["Kaleci"], "🧤", "t_k")}

        {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
        {renderMevkiTablosu("Defans", onerilenOyuncular["Defans"], "🛡️", "t_d")}

        {/* 2. Orta Reklam: Kale ve Defans bittikten sonra tam araya 24px-24px boşluk kuralıyla yerleşti */}
        {renderRek({ marginTop: '24px', marginBottom: '24px' })}

        {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
        {renderMevkiTablosu("Orta Saha", onerilenOyuncular["Orta Saha"], "🎯", "t_o")}

        {/* ⚽ FORVETLER BÖLÜMÜ */}
        {renderMevkiTablosu("Forvet", onerilenOyuncular["Forvet"], "⚽", "t_f")}

        {/* 3. 🎯 KISA SEO METNİ: Forvet tablosunun hemen bitiminde konumlandırıldı */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '12px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Haftanın Fantezi Futbol Tüyoları:</strong> Süper Lig'de bu hafta kadrolarınıza dahil edebileceğiniz en formda ve bütçe dostu oyuncu önerileri listelenmektedir. Kaleci, defans, orta saha ve forvet mevkileri için özel olarak hazırlanan bu rehberde; oyuncuların takımları, oyun içi fiyatları yer almaktadır. Haftalık kadro güncellemelerinizi yapmadan önce tüyolarımıza mutlaka göz atın. <strong>Osimhen</strong> forvet ve kaptan önerilerimizde ilk sırada yer alıyor. Sonradan girdiği Kasımpaşa maçında bile Galatasaray için ne kadar önemli olduğunu gösterdi. <strong>Sara</strong> duran toplar olsun ceza sahası içi koşuları olsun asist ve gol beklentileri ile kaptan adaylarımızdan. Ligin az gol atan takımlarından Eyüpspor'u ağırlayacak Erzurumspor'dan kaleci ve defans oyuncuları düşünülebilir. Bu hafta içerde oynayacak Fenerbahçe doğal favori. Vedat, Greenwood, Asensio, Kerem ve Archie değerlendirilmeli. Rotasyon haberlerini takipte olacağız. Her gün sitemizde güncellemeleri takip etmeyi unutmayın.
        </div>

        {/* 4. 📝 GENEL ANALİZ KUTUSU (UZUN SEO REHBERİ): Kısa SEO metninin hemen altında peş peşe konumlandırıldı */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '18px', color: '#1e293b', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.65', marginBottom: '25px', marginTop: '0px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#132444', fontWeight: 'bold', marginBottom: '12px', marginTop: '0' }}>📊 Süper Lig Fantezi Lig Tüyo Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
          
          <p style={{ margin: '0 0 12px 0' }}>
            FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve Süper Lig takipçileri için kurulmuş bağımsız bir bilgi, strateji, analiz ve tüyo rehberidir. Bu platformlarda her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon durumlarını çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan <strong>Süper Lig güncel sakat ve cezalı oyuncular listesi (Eksik Listesi)</strong>ne göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, fantezi lig bütçenizi ve haftalık puanınızı doğrudan etkiler.
          </p>

          <p style={{ margin: '0 0 12px 0' }}>
            Ayrıca, menajerlerin kadrolarını şekillendirmeden önce Süper Lig takımlarının Avrupa mesailerini de göz önünde bulundurması gerekir. Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi gibi yoğun fikstürlerde mücadele eden takımlarımızın, Türkiye ligi veya Avrupa maçları için yapacağı rotasyonlar, oyuncu dinlendirmeleri ve kadro değişiklikleri fantezi lig sıralamanızı doğrudan etkiler. Sizin için, özellikle milli maç aralarının hemen ardından oynanan lig haftaları dahil olmakla birlikte her hafta, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong>Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi 2026-2027 sezonu Süper Lig kulüplerinin muhtemel 11 haberlerini, dinlendirilecek ve oynayacak oyuncular bilgilerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini fantezi lig dünyasına sunuyoruz.
          </p>

          <p style={{ margin: '0' }}>
            Sitemizde yer alan <strong>'Gol & Asist'</strong> ve <strong>'En İyiler'</strong> sekmeleri, katılımcıların oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. <strong>'Tüyolar'</strong> sekmesinde, takımların iç ve dış saha form durumları, savunma ve hücum güçleri, sakat ve cezalı oyuncuları, önceki maçlardaki ilk 11'leri analiz edilerek o haftanın en çok puan alacak kadrosunu kurmanıza yardımcı olmak için mevkilerine göre kaleci, defans, orta saha ve forvet oyuncuları önerilerini, bütçenize göre değerlendirebilesiniz diye oyun için futbolcu fiyatını (değerini) da göz önüne alarak sürekli güncelliyoruz. Siteye yeni eklenen <strong>'Oyuncular'</strong> sekmesinde, sıralamada sizi uçuşa geçirecek xG ve xA (gol ve asist beklentileri) ile önemli kaleci istatistikleri bulunmakta. Kadronuzu (ilk 11 ve yedekler) kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek, haftaları minimum kayıpla geçmenizi sağlayacaktır. FanteFut olarak, Süper Lig eksik listelerini ve fantezi lig tüyolarını en güncel gelişmeler ışığında <strong>sürekli olarak düzenliyor ve anlık güncelliyoruz</strong>. Böylece platformumuzu tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak ayakta tutuyoruz.
          </p>
        </div>

        {/* 5. Eski en alt şerit reklam alanı tamamen temizlendi. */}
        <Footer />
      </div>
    </div>
  );
}
