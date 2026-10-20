'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

const HAFTA_TARIHLERI = {
  "1. Hafta": "14-17 Ağus", "2. Hafta": "21-24 Ağus", "3. Hafta": "28-31 Ağus",
  "4. Hafta": "04-07 Eylül", "5. Hafta": "11-14 Eylül", "6. Hafta": "18-21 Eylül",
  "7. Hafta": "09-12 Ekim", "8. Hafta": "16-19 Ekim", "9. Hafta": "23-26 Ekim",
  "10. Hafta": "30 Eki-02 Kas", "11. Hafta": "06-09 Kasım", "12. Hafta": "20-23 Kasım",
  "13. Hafta": "27-30 Kasım", "14. Hafta": "04-07 Aralık", "15. Hafta": "11-14 Aralık",
  "16. Hafta": "18-21 Aralık", "17. Hafta": "15-18 Ocak"
};

const DATA = {
  "1. Hafta": ["Galatasaray 2-2 Çorum FK", "Kasımpaşa 1-1 Trabzonspor", "Konyaspor 0-1 Rizespor", "Gaziantep FK 1-1 Alanyaspor", "Gençlerbirliği 2-1 Fenerbahçe", "Başakşehir 2-0 Kocaelispor", "Amed SF 3-0 Erzurumspor FK", "Beşiktaş 1-0 Eyüpspor", "Samsunspor 3-3 Göztepe"],
  "2. Hafta": ["Erzurumspor FK 0-4 Galatasaray", "Rizespor 0-2 Samsunspor", "Fenerbahçe 4-2 Konyaspor", "Çorum FK 0-1 Kasımpaşa", "Eyüpspor 0-1 Gaziantep FK", "Trabzonspor 2-1 Başakşehir", "Alanyaspor 1-0 Beşiktaş", "Göztepe 0-1 Gençlerbirliği", "Kocaelispor 2-0 Amed SF"],
  "3. Hafta": ["Gençlerbirliği 1-1 Erzurumspor FK", "Gaziantep FK 1-2 Rizespor", "Galatasaray 3-2 Göztepe", "Konyaspor 1-2 Kocaelispor", "Eyüpspor 2-1 Alanyaspor", "Başakşehir 1-1 Kasımpaşa", "Samsunspor 0-2 Fenerbahçe", "Amed SF 2-1 Trabzonspor", "Beşiktaş 6-2 Çorum FK"],
  "4. Hafta": ["Başakşehir 2-3 Galatasaray", "Erzurumspor FK 1-0 Konyaspor", "Fenerbahçe 1-2 Beşiktaş", "Kocaelispor 1-0 Samsunspor", "Çorum FK 3-0 Eyüpspor", "Trabzonspor 5-0 Gençlerbirliği", "Kasımpaşa 2-2 Amed SF", "Göztepe 2-4 Gaziantep FK", "Rizespor 0-1 Alanyaspor"],
  "5. Hafta": ["Beşiktaş 3-0 Erzurumspor FK", "Samsunspor 1-5 Çorum FK", "Eyüpspor 0-2 Rizespor", "Alanyaspor 2-2 Göztepe", "Konyaspor 1-0 Trabzonspor", "Gençlerbirliği 1-2 Kasımpaşa", "Amed SF 5-0 Başakşehir", "Galatasaray 1-0 Kocaelispor", "Gaziantep FK 0-0 Fenerbahçe"],
  "6. Hafta": ["Kasımpaşa 0-0 Konyaspor", "Trabzonspor 4-0 Galatasaray", "Başakşehir 4-0 Gençlerbirliği", "Kocaelispor 2-0 Gaziantep FK", "Çorum FK 1-2 Alanyaspor", "Göztepe 2-2 Rizespor", "Fenerbahçe 8-0 Eyüpspor", "Amed SF 3-2 Beşiktaş", "Erzurumspor FK 1-0 Samsunspor"],
  "7. Hafta": ["Galatasaray 2-1 Kasımpaşa", "Gençlerbirliği 2-2 Amed SF", "Alanyaspor 0-0 Erzurumspor FK", "Samsunspor 0-3 Trabzonspor", "Rizespor 0-3 Fenerbahçe", "Gaziantep FK 0-3 Çorum FK", "Konyaspor 0-0 Başakşehir", "Beşiktaş 2-1 Kocaelispor", "Eyüpspor 0-4 Göztepe"],
  "8. Hafta": ["Çorum FK 2-1 Rizespor", "Fenerbahçe 3-0 Alanyaspor", "Erzurumspor FK 2-0 Eyüpspor", "Gençlerbirliği 0-1 Galatasaray", "Amed SF 1-0 Konyaspor", "Kasımpaşa 4-1 Samsunspor", "Kocaelispor 1-2 Göztepe", "Başakşehir 2-1 Gaziantep FK", "Trabzonspor 2-0 Beşiktaş"],
  "9. Hafta": ["Alanyaspor 1-0 Kocaelispor", "Samsunspor-Amed SF", "Eyüpspor-Kasımpaşa", "Gaziantep FK-Erzurumspor FK", "Göztepe-Çorum FK", "Konyaspor-Gençlerbirliği", "Galatasaray-Fenerbahçe", "Rizespor-Trabzonspor", "Beşiktaş-Başakşehir"],
  "10. Hafta": ["Konyaspor-Galatasaray", "Kocaelispor-Rizespor", "Erzurumspor FK-Çorum FK", "Fenerbahçe-Göztepe", "Trabzonspor-Gaziantep FK", "Amed SF-Eyüpspor", "Samsunspor-Başakşehir", "Kasımpaşa-Beşiktaş", "Gençlerbirliği-Alanyaspor"],
  "11. Hafta": ["Gaziantep FK-Kasımpaşa", "Galatasaray-Amed SF", "Göztepe-Başakşehir", "Samsunspor-Konyaspor", "Eyüpspor-Kocaelispor", "Beşiktaş-Gençlerbirliği", "Çorum FK-Fenerbahçe", "Alanyaspor-Trabzonspor", "Rizespor-Erzurumspor FK"],
  "12. Hafta": ["Amed SF-Rizespor", "Gençlerbirliği-Gaziantep FK", "Galatasaray-Samsunspor", "Kocaelispor-Fenerbahçe", "Konyaspor-Beşiktaş", "Trabzonspor-Eyüpspor", "Erzurumspor FK-Göztepe", "Kasımpaşa-Alanyaspor", "Başakşehir-Çorum FK"],
  "13. Hafta": ["Rizespor-Kasımpaşa", "Alanyaspor-Konyaspor", "Samsunspor-Gençlerbirliği", "Gaziantep FK-Amed SF", "Fenerbahçe-Erzurumspor FK", "Eyüpspor-Başakşehir", "Çorum FK-Kocaelispor", "Beşiktaş-Galatasaray", "Göztepe-Trabzonspor"],
  "14. Hafta": ["Galatasaray-Rizespor", "Konyaspor-Gaziantep FK", "Amed SF-Alanyaspor", "Başakşehir-Fenerbahçe", "Beşiktaş-Samsunspor", "Gençlerbirliği-Eyüpspor", "Trabzonspor-Çorum FK", "Erzurumspor FK-Kocaelispor", "Kasımpaşa-Göztepe"],
  "15. Hafta": ["Çorum FK-Amed SF", "Erzurumspor FK-Kasımpaşa", "Eyüpspor-Galatasaray", "Alanyaspor-Samsunspor", "Fenerbahçe-Trabzonspor", "Göztepe-Konya", "Kocaelispor-Gençlerbirliği", "Rizespor-Başakşehir", "Gaziantep FK-Beşiktaş"],
  "16. Hafta": ["Kasımpaşa-Fenerbahçe", "Amed SF-Göztepe", "Başakşehir-Erzurumspor FK", "Konyaspor-Eyüpspor", "Galatasaray-Alanyaspor", "Beşiktaş-Rizespor", "Gençlerbirliği-Çorum FK", "Samsunspor-Gaziantep FK", "Trabzonspor-Kocaelispor"],
  "17. Hafta": ["Alanyaspor-Başakşehir", "Fenerbahçe-Amed SF", "Kocaelispor-Kasımpaşa", "Rizespor-Gençlerbirliği", "Gaziantep FK-Galatasaray", "Çorum FK-Konyaspor", "Göztepe-Beşiktaş", "Trabzonspor-Erzurumspor FK", "Eyüpspor-Samsunspor"]
};

const TAKIM_RENKLERI = {
  "Galatasaray": { ust: "#FFED00", alt: "#A9043A" },
  "Fenerbahçe": { ust: "#FFED00", alt: "#132444" },
  "Beşiktaş": { ust: "#000000", alt: "#FFFFFF" },
  "Trabzonspor": { ust: "#800020", alt: "#4169E1" },
  "Alanyaspor": { ust: "#F9A11B", alt: "#000000" },
  "Amed SF": { ust: "#00875A", alt: "#E30613" },
  "Başakşehir": { ust: "#F47321", alt: "#004684" },
  "Çorum FK": { ust: "#E30613", alt: "#000000" },
  "Erzurumspor FK": { ust: "#005CA9", alt: "#FFFFFF" },
  "Eyüpspor": { ust: "#603195", alt: "#FFD800" },
  "Gaziantep FK": { ust: "#E30613", alt: "#000000" },
  "Gençlerbirliği": { ust: "#E30613", alt: "#000000" },
  "Göztepe": { ust: "#FFED00", alt: "#E30613" },
  "Kasımpaşa": { ust: "#00529B", alt: "#FFFFFF" },
  "Kocaelispor": { ust: "#008040", alt: "#000000" },
  "Konyaspor": { ust: "#007A33", alt: "#FFFFFF" },
  "Rizespor": { ust: "#00A550", alt: "#00529B" },
  "Samsunspor": { ust: "#E30613", alt: "#FFFFFF" }
};
export default function FiksturIlkYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

  const macVerisiniCozümle = (macString) => {
    // 🛠️ Regex tamamen düzeltildi. Skorlar artık kutu içine girecek!
    const skorluRegex = /^(.+?)\s+(\d+)-(\d+)\s+(.+)\$/;
    const skorluEsllesme = macString.match(skorluRegex);

    if (skorluEsllesme) {
      return {
        evSahibi: skorluEsllesme[1].trim(),
        evSkor: skorluEsllesme[2],
        depSkor: skorluEsllesme[3],
        deplasman: skorluEsllesme[4].trim(),
        oynandi: true
      };
    }

    const skorsuzParcalar = macString.split('-');
    if (skorsuzParcalar.length === 2) {
      return {
        evSahibi: skorsuzParcalar[0].trim(),
        evSkor: '',
        depSkor: '',
        deplasman: skorsuzParcalar[1].trim(),
        oynandi: false
      };
    }

    return { evSahibi: macString, evSkor: '', depSkor: '', deplasman: '', oynandi: false };
  };

  const renderHalta = (h) => (
    <div key={h} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
        <h3 style={{ margin: '0', color: '#132444', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>{h}</h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 'bold', fontFamily: ICERIK_FONTU, backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
          🗓️ {HAFTA_TARIHLERI[h] || ""}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {formVerileri[h].map((m, i) => {
          const { evSahibi, evSkor, depSkor, deplasman, oynandi } = macVerisiniCozümle(m);
          
          const evRenk = TAKIM_RENKLERI[evSahibi] || { ust: '#cbd5e1', alt: '#cbd5e1' };
          const depRenk = TAKIM_RENKLERI[deplasman] || { ust: '#cbd5e1', alt: '#cbd5e1' };
          
          const evGecis = `linear-gradient(to bottom, ${evRenk.ust} 50%, ${evRenk.alt} 50%)`;
          const depGecis = `linear-gradient(to bottom, ${depRenk.ust} 50%, ${depRenk.alt} 50%)`;

          return (
            <div 
              key={i} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.84rem', 
                fontWeight: '500', 
                color: '#1e293b', 
                padding: '6px 4px', 
                borderBottom: i !== 8 ? '1px dashed #f1f5f9' : 'none', 
                fontFamily: ICERIK_FONTU,
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                gap: '4px',
                // 🛠️ Soldaki çakışmayı önlemek için sağ taraftaki temiz yapının birebir aynısını sola da kurduk:
                borderLeft: '4px solid transparent',
                borderImage: `${evGecis} 1`
              }}
            >
              {/* 🏠 Ev Sahibi */}
              <div style={{ flex: '1', textAlign: 'left', paddingLeft: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {evSahibi}
              </div>

              {/* 🔴 Mini Skor Kutuları (Akıllı Renk Düzeni) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: '0' }}>
                <input 
                  type="text" 
                  defaultValue={evSkor}
                  maxLength={2}
                  style={{
                    width: '26px', height: '24px',
                    backgroundColor: oynandi ? '#E31837' : '#e2e8f0', // Oynanmadıysa soft gri kutu
                    color: oynandi ? '#FFFFFF' : '#64748b', // Oynanmadıysa gri yazı
                    textAlign: 'center', fontWeight: 'bold', border: 'none', borderRadius: '4px', fontSize: '0.82rem'
                  }}
                  readOnly
                />
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>-</span>
                <input 
                  type="text" 
                  defaultValue={depSkor}
                  maxLength={2}
                  style={{
                    width: '26px', height: '24px',
                    backgroundColor: oynandi ? '#E31837' : '#e2e8f0',
                    color: oynandi ? '#FFFFFF' : '#64748b',
                    textAlign: 'center', fontWeight: 'bold', border: 'none', borderRadius: '4px', fontSize: '0.82rem'
                  }}
                  readOnly
                />
              </div>

              {/* 🚀 Deplasman (Sağ Çizgili) */}
              <div style={{ 
                flex: '1', textAlign: 'right', paddingRight: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                borderRight: '4px solid transparent', borderImage: `${depGecis} 1`
              }}>
                {deplasman}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="fikstur1" />
        
        {/* 🎯 SEO & ADSENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig 1. Yarı Fikstür ve Maç Sonuçları
          </h1>
        </div>

        {/* GÖRSEL TUTARLILIK İÇİN GÜNCELLENEN STANDART YEŞİL KUTU */}
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
          <strong>Süper Lig Fikstür Notu:</strong> Süper Lig sezonunun ilk devresinde oynanan karşılaşmalar, haftalık maç sonuçları ve planlama tarihleri aşağıda listelenmektedir. Oyun süreçlerinizde takımların fikstür zorluklarını buradan analiz edebilirsiniz.
        </div>

        {/* 🔄 ORTALI MOBİL GEÇİŞ KÖPRÜSÜ */}
        <div className="flex lg:hidden justify-center gap-2 mb-4">
          <Link href="/fikstur-ilk-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#22c55e',
            color: '#ffffff',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #166534',
            WebkitTapHighlightColor: 'transparent'
          }}>
            1. Yarı
          </Link>
          <Link href="/fikstur-ikinci-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#db2777',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #fce7f3',
            WebkitTapHighlightColor: 'transparent'
          }}>
            2. Yarı
          </Link>
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İLK GRUP (1-9. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHalta(h))}
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İKİNCİ GRUP (10-17. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {hIsimleri.slice(9).map((h) => renderHalta(h))}
        </div>

        {/* 🚀 GOOGLE BOT DOSTU ZENGİN SEO AÇIKLAMA METNİ */}
        <div style={{ 
          marginTop: '30px', 
          marginBottom: '10px', 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          fontFamily: ICERIK_FONTU
        }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>
            Süper Lig 1. Yarı Fikstürü ve Haftalık Maç Sonuçları Analizi
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut 1. yarı fikstür sayfasında, sezonun ilk devresinde oynanan tüm karşılaşmaların haftalık maç sonuçlarını ve resmi takvim tarihlerini bulabilirsiniz. Fantezi futbol menajerleri için ligin ilk 17 haftasındaki takımların maç yoğunluklarını, geçmiş skorlarını ve fikstür avantajlarını geriye dönük analiz etmek gelecekteki haftaların kadro planlamasında büyük önem taşır. Sezonun ikinci yarı fikstür takvimi için menüdeki ilgili bağlantıyı kullanabilirsiniz. Haftanın dikkat çeken takımları, deplasmanda kazanan Göztepe ve farklı galip gelen Kasımpaşa oldu. Derbiyi ise Trabzonspor kazandı.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
