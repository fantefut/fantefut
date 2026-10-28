'use client';
import { useState } from 'react';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// 📊 YENİ ÖZGÜN VE ESNEK OYUNCU ÖNERİLERİ HAVUZU (Takım ve Fiyat Bilgisiyle)
const REHBER_DATA = {
  "Kaleci": [
    { isim: "Lafont Ⓚ", takim: "Amed SF", fiyat: "4M" },
    { isim: "Uğurcan", takim: "Galatasaray", fiyat: "5.5M" },
    { isim: "Serhat", takim: "Kocaelispor", fiyat: "4M" },
    { isim: "Onana", takim: "Trabzonspor", fiyat: "5M" }
  ],
  "Defans": [
    { isim: "Sallai Ⓚ", takim: "Galatasaray", fiyat: "5M" },
    { isim: "Pina", takim: "Trabzonspor", fiyat: "5M" },
    { isim: "Dijksteel", takim: "Kocaelispor", fiyat: "4.5M" },
    { isim: "Murillo", takim: "Beşiktaş", fiyat: "5M" },
    { isim: "Giorbelidze", takim: "Erzurumspor", fiyat: "4M" },
    { isim: "Levent", takim: "Fenerbahçe", fiyat: "4.5M" },
    { isim: "Mehmet", takim: "Amed SF", fiyat: "4.5M" },
    { isim: "Mustafa", takim: "Trabzonspor", fiyat: "4.5M" }
  ],
  "Orta Saha": [
    { isim: "Salah Ⓚ", takim: "Trabzonspor", fiyat: "12M" },
    { isim: "Muci", takim: "Trabzonspor", fiyat: "8M" },
    { isim: "Dia Saba", takim: "Amed SF", fiyat: "5.5M" },
    { isim: "Ballet", takim: "Amed SF", fiyat: "5M" },
    { isim: "Kzyridis", takim: "Çorum FK", fiyat: "5.5M" },
    { isim: "Barış", takim: "Galatasaray", fiyat: "8.5M" },
    { isim: "Batrakov", takim: "Galatasaray", fiyat: "8M" },
    { isim: "Skov Olsen", takim: "Başakşehir", fiyat: "6M" }
  ],
  "Forvet": [
    { isim: "Osimhen", takim: "Galatasaray", fiyat: "12M" },
    { isim: "Orban Ⓚ", takim: "Amed SF", fiyat: "6M" },
    { isim: "Shomurodov", takim: "Başakşehir", fiyat: "7.5M" },
    { isim: "Ramirez", takim: "Çorum FK", fiyat: "5.5M" },
    { isim: "Vlahovic", takim: "Beşiktaş", fiyat: "10M" }
  ]
};

// 📝 ADSENSE DOSTU TABLO ALTI ANALİZ METİNLERİ
const REHBER_ANALIZLERI = {
  "Kaleci": <>Haftalık kaleci performans analizlerinde; o haftaki rakipleri, kurtarış yüzdeleri ve takımların savunma direnci çok önemlidir. <strong>Az gol atan Konyaspor ve Eyüpspor'un rakiplerinin kalecileri bu hafta seçilebilir.</strong> İç sahada kuvvetli ekipler ile seçimleri tamamladık. Fantezi lig kadronuza kaleci seçerken bütçenize göre bu önerileri değerlendirebilirsiniz.</>,
  
  "Defans": <>Defans oyuncusu seçimlerinde hem gol yememe (clean sheet) potansiyeli yüksek takımlara hem hücuma katkı sağlayan beklere hem de duran toptan goller atan stoperlere yönelmek puanınızı katlayacaktır. Onuncu hafta eşleşmelerine göre yaptığımız analizlerde öne çıkan isimleri sizin için derledik. <strong>Son dakika sakatlıkları olması durumunda ana sayfadan ve sosyal medya hesaplarımızdan takip edip kadronuzu güncelleyebilirsiniz.</strong></>,
  
  "Orta Saha": <>Orta saha tercihleri fantezi ligin çok puan getiren omurgasıdır. Asist beklentisi yüksek, kilit pas atan ve duran topları kullanan yaratıcı oyuncular arasından seçim yapmak, haftayı lider kapatmanızda doğrudan rol oynayacaktır. <strong>İç saha avantajlarıyla Trabzonspor ve Amed SF orta sahalarını favori görüyoruz.</strong> Yanlarına beğendiğimiz ve etkili olabileceğine inandığımız kanat oyuncularını ekledik.</>,
  
  "Forvet": <>Gol yollarında bitiriciliği yüksek ve takımının penaltıcısı olan forvetleri kadroya dahil etmek her zaman güvenli bir limandır. <strong>Doğal forvet ve kaptan seçimi Osimhen'i ilk sıraya yazdık, ama bu hafta için Orban bir adım önde bizde kaptanlık için.</strong> Formda gördüğümüz hücumcularla listemize devam ettik. Avrupa maçlarından dolayı rotasyonların dikkatle takip edilmesi gerekir. Kadro kaydetme saatine kadar güncel futbol haberlerini kontrol etmeye devam ediyoruz.</>
};

export default function HaftaninAnaliziSayfasi() {
  const [onerilenOyuncular] = useState(REHBER_DATA);

  const renderMevkiTablosu = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ marginBottom: '25px' }}>
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

{/* STANDART BOŞLUKLU BAŞLIK BLOKU */}
<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
  <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
    Fantezi Lig Kaptan Önerileri Kadro Tüyoları
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
  <strong>Kadro Strateji Notu:</strong> Haftalık fantezi lig mücadelelerinde fark yaratacak kaptan seçimleri, bütçe dostu alternatifler ve oyun içi futbolcu değer analizleri mevkisel bazda güncellenmiştir.
</div>


        <h2 style={{ 
          fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', marginTop: '14px',
          fontFamily: ICERIK_FONTU, fontWeight: 'bold', 
          letterSpacing: '0.5px', textAlign: 'left', width: '100%' 
        }}>
          Fantezi Lig Onuncu Hafta Kadronuz İçin Oyuncu Önerileri ve Kaptan Seçimi
        </h2>

        {/* 🧤 KALECİLER BÖLÜMÜ */}
        {renderMevkiTablosu("Kaleci", onerilenOyuncular["Kaleci"], "🧤", "t_k")}

        {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
        {renderMevkiTablosu("Defans", onerilenOyuncular["Defans"], "🛡️", "t_d")}

        {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
        {renderMevkiTablosu("Orta Saha", onerilenOyuncular["Orta Saha"], "🎯", "t_o")}

        {/* ⚽ FORVETLER BÖLÜMÜ */}
        {renderMevkiTablosu("Forvet", onerilenOyuncular["Forvet"], "⚽", "t_f")}

        {/* 3. 🎯 KISA SEO METNİ */}
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
          <strong>Haftanın Fantezi Futbol Tüyoları:</strong> Fantezi lig dünyasında kadro mühendisliği stratejilerinizi geliştirmeniz ve değerlendirmelerimizi takip etmeniz için hazırlanan içerikler burada mevcuttur. Her alanda kadro yapınızı güçlendirecek önemli veriler yer almaktadır. Ligde bu hafta kadrolarınıza dahil edebileceğiniz en formda ve bütçe dostu oyuncu önerileri listelenmektedir. Kaleci, defans, orta saha ve forvet mevkileri için özel olarak hazırlanan bu rehberde; oyuncuların takımları ve oyun içi fiyatları yer almaktadır. Haftalık kadro güncellemelerinizi yapmadan önce tüyolarımıza mutlaka göz atın. <strong>Rakiplerine karşı oyun güçleriyle Trabzonspor ve Amed SF en favori gördüğümüz takımlar 10. hafta için.</strong> Temsilcilerimizin Avrupa sahnesinde yapacağı maçlar, sakatlık ve rotasyon senaryoları açısından kritik bir öneme sahiptir. Teknik ekiplerden gelen haberleri yakından incelemeye devam ediyoruz.
        </div>

        {/* 4. 📝 GENEL ANALİZ KUTUSU (UZUN SEO REHBERİ) */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '18px', color: '#1e293b', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.65', marginBottom: '25px', marginTop: '0px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#132444', fontWeight: 'bold', marginBottom: '12px', marginTop: '0' }}>📊 Fantezi Lig Tüyo Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
          
          <p style={{ margin: '0 0 12px 0' }}>
            FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve süper lig takipçileri için kurulmuş bağımsız bir bilgi, strateji, analiz ve tüyo rehberidir. Bu platformlarda her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon durumlarını çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan güncel sakat ve cezalı oyuncular listesine (<strong>Eksik Listesi</strong>) göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, oyundaki bütçenizi ve haftalık puanınızı doğrudan etkiler.
          </p>

          <p style={{ margin: '0 0 12px 0' }}>
            Ayrıca, menajerlerin kadrolarını şekillendirmeden önce takımların Avrupa mesailerini de göz önünde bulundurması gerekir. Yoğun fikstürlerde mücadele eden takımlarımızın yapacağı rotasyonlar, oyuncu dinlendirmeleri ve kadro değişiklikleri fantezi lig sıralamanızı doğrudan etkiler. Sizin için, özellikle milli maç aralarının hemen ardından oynanan lig haftaları dahil olmakla birlikte her hafta, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong>Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi takımların muhtemel 11 haberlerini, dinlendirilecek ve oynayacak oyuncular bilgilerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini spor dünyasına sunuyoruz.
          </p>

          <p style={{ margin: '0' }}>
            Sitemizde yer alan <strong>Gol & Asist</strong> ve <strong>En İyiler</strong> alanları, katılımcıların oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. <strong>Tüyolar</strong> bölümünde, takımların iç ve dış saha form durumları, savunma ve hücum güçleri, sakat ve cezalı oyuncuları, önceki maçlardaki ilk 11'leri analiz edilerek o haftanın en çok puan alacak kadrosunu kurmanıza yardımcı olmak için mevkilerine göre kaleci, defans, orta saha ve forvet oyuncuları önerilerini, bütçenize göre değerlendirebilesiniz diye oyun içi futbolcu fiyatını da göz önüne alarak sürekli güncelliyoruz. Yeni eklenen <strong>Oyuncular</strong> sekmesinde, sıralamada sizi uçuşa geçirecek xG ve xA (gol ve asist beklentileri) ile önemli kaleci istatistikleri bulunmakta. Kadronuzu kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek, haftaları minimum kayıpla geçmenizi sağlayacaktır. FanteFut olarak, eksik listelerini ve kadro tüyolarını en son gelişmeler ışığında güncelleyerek tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak sizlerle paylaşıyoruz.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
