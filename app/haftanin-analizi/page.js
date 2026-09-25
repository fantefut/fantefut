'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 📊 YENİ ÖZGÜN VE ESNEK OYUNCU ÖNERİLERİ HAVUZU (Takım ve 5M Değeriyle!)
const REHBER_DATA = {
  "Kaleci": [
    { isim: "Victor", takim: "Alanyaspor", fiyat: "4.5M" },
    { isim: "Ertuğrul", takim: "Erzurumspor", fiyat: "4M" },
    { isim: "Nübel", takim: "Beşiktaş", fiyat: "5M" },
    { isim: "Uğurcan", takim: "Galatasaray", fiyat: "5.5M" }
  ],
  "Defans": [
    { isim: "Murillo", takim: "Beşiktaş", fiyat: "5M" },
    { isim: "Sallai", takim: "Galatasaray", fiyat: "5M" },
    { isim: "Hadergjonaj", takim: "Alanyaspor", fiyat: "5M" },
    { isim: "Lima", takim: "Alanyaspor", fiyat: "4.5M" },
    { isim: "Sorescu", takim: "Gaziantep", fiyat: "4.5M" },
    { isim: "Brown", takim: "Fenerbahçe", fiyat: "5M" },
    { isim: "Davinson", takim: "Galatasaray", fiyat: "5.5M" },
    { isim: "Mustafa", takim: "Trabzonspor", fiyat: "4.5M" }
  ],
  "Orta Saha": [
    { isim: "Dia Saba", takim: "Amed SF", fiyat: "5.5M" },
    { isim: "Leao", takim: "Galatasaray", fiyat: "10.5M" },
    { isim: "Yunus", takim: "Galatasaray", fiyat: "7.5M" },
    { isim: "Muçi", takim: "Trabzonspor", fiyat: "8M" },
    { isim: "Cerny", takim: "Beşiktaş", fiyat: "7M" },
    { isim: "Salah", takim: "Trabzonspor", fiyat: "12M" },
    { isim: "Kyziridis", takim: "Çorum", fiyat: "5.5M" },
    { isim: "Cengiz", takim: "Çorum", fiyat: "5.5M" }
  ],
  "Forvet": [
    { isim: "Juan", takim: "Göztepe", fiyat: "6.5M" },
    { isim: "Osimhen", takim: "Galatasaray", fiyat: "12M" },
    { isim: "Vedat", takim: "Fenerbahçe", fiyat: "9M" },
    { isim: "Orban", takim: "Amed SF", fiyat: "6M" },
    { isim: "Ramirez", takim: "Çorum", fiyat: "5.5M" }
  ]
};

export default function HaftaninAnaliziSayfasi() {
  const [onerilenOyuncular] = useState(REHBER_DATA);

  // 🎯 RESPONSIVE REKLAM MOTORU: Mobil ve Laptop uyumlu esnek kapsayıcı
  const renderRek = (tip) => {
    const isAltSerit = tip === 'ince';
    return (
      <div style={{
        width: '100%',
        maxWidth: '728px', // Laptop ekranlarında devasa yayılmayı önleyen kilit sınır
        minHeight: isAltSerit ? '50px' : '90px', // Reklam yüklenene kadar düzenin bozulmasını önler
        maxHeight: isAltSerit ? '100px' : '280px', // Mobilde kare reklamların taşmasını önler
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '20px auto', // Sayfada tam ortada durması için auto eklendi
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          {isAltSerit ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
        </span>
      </div>
    );
  };

  // En iyiler sayfasındaki o şık ve kusursuz dikey tablo motoru (Fiyat alanlı!)
  const renderMevkiTablosu = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '15px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>{emoji} {mName} Önerileri</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 10px', fontWeight: 'bold', color: '#64748b', width: '20px', textAlign: 'center' }}>{i+1}</td>
              <td style={{ padding: '8px 10px' }}>
                <div style={{ fontWeight: 'bold', color: '#334155' }}>{v.isim}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{v.takim}</div>
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', color: '#1e3a8a', fontSize: '0.95rem', paddingRight: '15px' }}>{v.fiyat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 Logolu ortak Header yapısı eklendi */}
      <Header altBaslik="Kadro Önerileri ve Tüyolar" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Tüyolar aktif) */}
        <Navbar aktifSayfa="analiz" />

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          
          {/* 💰 1. ÜST BÜYÜK REKLAM ALANI (Sekmelerin Hemen Altı) */}
          {renderRek('buyuk')}

          {/* 🚀 FANTEZİ LİG MINI BAŞLIĞI */}
          <h2 style={{ 
            fontSize: '1rem', color: '#64748b', marginBottom: '15px', marginTop: '10px',
            fontFamily: ICERIK_FONTU, fontWeight: 'bold', textTransform: 'uppercase', 
            letterSpacing: '0.5px', textAlign: 'center', width: '100%' 
          }}>
            🎯 Fantezi Lig Kadronuz İçin Oyuncu Önerileri
          </h2>

          {/* 🧤 KALECİLER BÖLÜMÜ */}
          {renderMevkiTablosu("Kaleci", onerilenOyuncular["Kaleci"], "🧤", "t_k")}

          {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
          {renderMevkiTablosu("Defans", onerilenOyuncular["Defans"], "🛡️", "t_d")}

          {/* 💰 2. ORTA REKLAM ALANI (Defanslar ve Orta Sahaların Tam Arası!) */}
          {renderRek('buyuk')}

          {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
          {renderMevkiTablosu("Orta Saha", onerilenOyuncular["Orta Saha"], "🎯", "t_o")}

          {/* ⚽ FORVETLER BÖLÜMÜ */}
          {renderMevkiTablosu("Forvet", onerilenOyuncular["Forvet"], "⚽", "t_f")}

          {/* 📝 GENEL ANALİZ KUTUSU (SEO METNİ) */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', color: '#1e293b', fontSize: '13px', fontWeight: '500', lineHeight: '1.6', marginBottom: '25px', marginTop: '25px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#132444', fontWeight: 'bold', marginBottom: '10px', marginTop: '0' }}>📊 Süper Lig Fantezi Lig Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
            
            <p style={{ margin: '0 0 12px 0' }}>
              FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve Süper Lig takipçileri için kurulmuş bağımsız bir strateji, analiz ve tüyo rehberidir. Bu platformlarda her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon durumlarını çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan <strong>Süper Lig güncel sakat ve cezalı oyuncular listesi (Eksik Listesi)</strong>ne göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, fantezi lig bütçenizi ve haftalık puanınızı doğrudan etkiler.
            </p>

            <p style={{ margin: '0 0 12px 0' }}>
              Bu doğrultuda, menajerlerin kadrolarını şekillendirmeden önce Süper Lig takımlarının Avrupa mesailerini de göz önünde bulundurması gerekir. Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi gibi yoğun fikstürlerde mücadele eden takımlarımızın, Türkiye ligi veya Avrupa maçları için yapacağı rotasyonlar, oyuncu dinlendirmeleri ve kadro değişiklikleri fantezi lig sıralamanızı doğrudan etkiler. Sizin için, özellikle milli maç aralarının hemen ardından oynanan lig haftaları dahil olmakla birlikte her hafta, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong>Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi 2026-2027 sezonu Süper Lig kulüplerinin muhtemel 11 haberlerini, dinlendirilecek ve oynayacak oyuncular bilgilerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini fantezi lig dünyasına sunuyoruz.
            </p>

            <p style={{ margin: '0' }}>
              Sitemizde yer alan <strong>'Gol & Asist'</strong> ve <strong>'En İyiler'</strong> sekmeleri, katılımcıların oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. <strong>'Tüyolar'</strong> sekmesinde, takımların iç ve dış saha form durumları, savunma ve hücum güçleri, sakat ve cezalı oyuncuları, önceki maçlardaki ilk 11'leri analiz edilerek o haftanın en çok puan alacak kadrosunu kurmanıza yardımcı olmak için mevkilerine göre kaleci, defans, orta saha ve forvet oyuncuları önerilerini, bütçenize göre değerlendirebilesiniz diye oyun için futbolcu fiyatını (değerini) da göz önüne alarak sürekli güncelliyoruz. Kadronuzu (ilk 11 ve yedekler) kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek, haftaları minimum kayıpla geçmenizi sağlayacaktır. FanteFut olarak, Süper Lig eksik listelerini ve fantezi lig tüyolarını en güncel gelişmeler ışığında <strong>sürekli olarak düzenliyor ve anlık güncelliyoruz</strong>. Böylece platformumuzu tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak ayakta tutuyoruz.
            </p>
          </div>

          {/* 💰 3. EN ALT İNCE REKLAM ALANI (SEO Metninin Altı) */}
          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
