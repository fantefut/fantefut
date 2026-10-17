'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 📊 YENİ ÖZGÜN VE ESNEK OYUNCU ÖNERİLERİ HAVUZU (Takım ve 5M Değeriyle!)
const REHBER_DATA = {
  "Kaleci": [
    { isim: "Tobiasz Ⓚ", takim: "Gaziantep FK", fiyat: "4.5M" },
    { isim: "Bahadır", takim: "Konyaspor", fiyat: "4.5M" },
    { isim: "Nübel", takim: "Beşiktaş", fiyat: "5M" },
    { isim: "Ertuğrul", takim: "Erzurumspor", fiyat: "4M" }
  ],
  "Defans": [
    { isim: "Sorescu Ⓚ", takim: "Gaziantep FK", fiyat: "4.5M" },
    { isim: "Dijksteel", takim: "Kocealispor", fiyat: "4.5M" },
    { isim: "Andzouana", takim: "Konyaspor", fiyat: "4.5M" },
    { isim: "Murillo", takim: "Beşiktaş", fiyat: "5M" },
    { isim: "Masuaku", takim: "Konyaspor", fiyat: "4.5M" },
    { isim: "Baniya", takim: "Konyaspor", fiyat: "4M" },
    { isim: "Rıdvan", takim: "Beşiktaş", fiyat: "4.5M" },
    { isim: "Emirhan", takim: "Beşiktaş", fiyat: "4.5M" }
  ],
  "Orta Saha": [
    { isim: "Cerny Ⓚ", takim: "Beşiktaş", fiyat: "7M" },
    { isim: "Salah", takim: "Trabzonspor", fiyat: "12M" },
    { isim: "Dia Saba", takim: "Amed SF", fiyat: "5.5M" },
    { isim: "Saviolo", takim: "Trabzonspor", fiyat: "6M" },
    { isim: "Trossard", takim: "Beşiktaş", fiyat: "9.5M" },
    { isim: "Muci", takim: "Trabzonspor", fiyat: "8M" },
    { isim: "Olaitan", takim: "Beşiktaş", fiyat: "6MM" },
    { isim: "Hajradinovic", takim: "Kasımpaşa", fiyat: "5.5M" }
  ],
  "Forvet": [
    { isim: "Vlahovic Ⓚ", takim: "Beşiktaş", fiyat: "10M" },
    { isim: "Muleka", takim: "Konyaspor", fiyat: "5.5M" },
    { isim: "Juan", takim: "Göztepe", fiyat: "6.5M" },
    { isim: "Benedyczak", takim: "Kasımpaşa", fiyat: "6M" },
    { isim: "Osimhen", takim: "Galatasaray", fiyat: "12M" }
  ]
};

// 📝 ADSENSE DOSTU TABLO ALTI ANALİZ METİNLERİ
const REHBER_ANALIZLERI = {
  "Kaleci": <>Haftalık kaleci performans analizlerinde; o haftaki rakipleri, kurtarış yüzdeleri ve takımların savunma direnci çok önemlidir. Az gol atan Erzurumspor ve istikrarsız Gaziantep FK eşleşmesi değelendirilebilir. İç sahada Beşiktaş ve Konyaspor mantıklı, <strong>özellikle Bahadır'ın kurtarış yüzdesine bakılınca</strong>. Fantezi lig kadronuza kaleci seçerken bütçenize göre bu önerileri değerlendirebilirsiniz.</>,
  
  "Defans": <>Defans oyuncusu seçimlerinde hem gol yememe (clean sheet) potansiyeli yüksek takımlara hem hücuma katkı sağlayan beklere hem de duran toptan goller atan stoperlere yönelmek puanınızı katlayacaktır. Önde oynayan Sorescu ile Beşiktaş'ın skor katkısı yüksek sağ beki Murillo öne çıkıyor. <strong>Sakatlık şüpheleri olan Dijksteel ve Dellova'ya dikkat. Son saniyeye kadar buradan güncellemeleri takip edebilirsiniz.</strong></>,
  
  "Orta Saha": <>Orta saha tercihleri fantezi ligin çok puan getiren omurgasıdır. Asist beklentisi yüksek, kilit pas atan ve duran topları kullanan yaratıcı oyuncular arasından seçim yapmak, haftayı lider kapatmanızda doğrudan rol oynayacaktır. İç saha avantajıyla Beşiktaş'ın orta sahalarını yazdık. Trabzonspor'un yıldızları ile Dia Saba'yı ekledik, eğer oynarsa sürpriz olarak Hajradinovic'i değerlendirdik.</>,
  
  "Forvet": <>Gol yollarında bitiriciliği yüksek ve takımının penaltıcısı olan forvetleri kadroya dahil etmek her zaman güvenli bir limandır. Penaltıcıların yanına Muleka'yı yazdık. Avrupa maçlarından dolayı rotasyonların dikkatle takip edilmesi gerekir. <strong>Oyuncular</strong> sekmesindeki istatistikleri kontrol etmenizde fayda var. Kadro kaydetme saatine kadar Trendyol Süper Lig son dakika haberlerini kontrol etmeye devam ediyoruz. <strong>Fantezi ligde zirveye tırmanmak için, her gün FanteFut'u ziyaret etmeyi unutmayın.</strong></>
};


export default function HaftaninAnaliziSayfasi() {
  const [onerilenOyuncular] = useState(REHBER_DATA);

  // Ortak kurallara göre düzenlenen, AdSense onay dostu ve taşma korumalı reklam alanı
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

  const renderMevkiTablosu = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ marginBottom: '25px' }}>
      {/* Tablo Yapısı */}
      <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
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

      {/* 📝 Tablo Altı Özgün Analiz Kutusu */}
      {REHBER_ANALIZLERI[mName] && (
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '12px 14px',
          marginTop: '10px',
          fontSize: '12px',
          color: '#475569',
          lineHeight: '1.6',
          textAlign: 'left'
        }}>
          {REHBER_ANALIZLERI[mName]}
        </div>
      )}
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
            Fantezi Lig Kaptan Önerileri Kadro Tüyoları
          </h1>
        </div>

        {/* 1. Üst Reklam: Başlığın altına, kurallara uygun 16px üst - 24px alt boşlukla yerleşti */}
        {renderRek({ marginTop: '16px', marginBottom: '24px' })}

        <h2 style={{ 
          fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', marginTop: '0px',
          fontFamily: ICERIK_FONTU, fontWeight: 'bold', 
          letterSpacing: '0.5px', textAlign: 'left', width: '100%' 
        }}>
          Fantezi Lig Dokuzuncu Hafta Kadronuz İçin Oyuncu Önerileri ve Kaptan Seçimi
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
          <strong>Haftanın Fantezi Futbol Tüyoları:</strong> <strong>Kadronuzu kurmadan önce sitemizin tüm sayfalarını incelemenizi tavsiye ederiz. Her sayfada önemli bilgiler bulunmaktadır.</strong> Süper Lig'de bu hafta kadrolarınıza dahil edebileceğiniz en formda ve bütçe dostu oyuncu önerileri listelenmektedir. Kaleci, defans, orta saha ve forvet mevkileri için özel olarak hazırlanan bu rehberde; oyuncuların takımları, oyun içi fiyatları yer almaktadır. Haftalık kadro güncellemelerinizi yapmadan önce tüyolarımıza mutlaka göz atın. <strong>İç sahada oynayacak olan Beşiktaş'ın oyuncuları</strong> kadro ve kaptan önerilerimizde ilk sıralarda yer alıyor. Dev derbiden uzak durmak gerekebilir. Temsilcilerimizin Avrupa'da yapacağı maçlar çok önemli, sakatlık ve rotasyon açısından. Rotasyon haberlerini takipte olacağız. Her gün sitemizde güncellemeleri takip etmeyi unutmayın.
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
