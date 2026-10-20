'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// TFF Resmi 2026-2027 İkinci Yarı Planlama Takvimine göre yaklaşık hafta başlangıç tarihleri
const HAFTA_TARIHLERI = {
  "18. Hafta": "22-25 Ocak", "19. Hafta": "29 Oca-01 Şub", "20. Hafta": "05-08 Şubat",
  "21. Hafta": "12-15 Şubat", "22. Hafta": "19-22 Şubat", "23. Hafta": "26 Şub-01 Mar",
  "24. Hafta": "05-08 Mart", "25. Hafta": "12-15 Mart", "26. Hafta": "19-22 Mart",
  "27. Hafta": "02-05 Nisan", "28. Hafta": "09-12 Nisan", "29. Hafta": "16-19 Nisan",
  "30. Hafta": "23-26 Nisan", "31. Hafta": "30 Nis-03 May", "32. Hafta": "07-10 Mayıs",
  "33. Hafta": "14-17 Mayıs", "34. Hafta": "21-23 Mayıs"
};

const DATA = {
  "18. Hafta": ["Göztepe - Samsunspor", "Eyüpspor - Beşiktaş", "Fenerbahçe - Gençlerbirliği", "Alanyaspor - Gaziantep FK", "Rizespor - Konyaspor", "Trabzonspor - Kasımpaşa", "Erzurumspor - Amed SF", "Kocaelispor - Başakşehir", "Çorum FK - Galatasaray"],
  "19. Hafta": ["Samsunspor - Rizespor", "Kasımpaşa - Çorum FK", "Galatasaray - Erzurumspor", "Göztepe - Gençlerbirliği", "Beşiktaş - Alanyaspor", "Gaziantep FK - Eyüpspor", "Fenerbahçe - Konyaspor", "Başakşehir - Trabzonspor", "Kocaelispor - Amed SF"],
  "20. Hafta": ["Erzurumspor - Gençlerbirliği", "Rizespor - Gaziantep FK", "Göztepe - Galatasaray", "Kocaelispor - Konyaspor", "Alanyaspor - Eyüpspor", "Kasımpaşa - Başakşehir", "Fenerbahçe - Samsunspor", "Trabzonspor - Amed SF", "Çorum FK - Beşiktaş"],
  "21. Hafta": ["Galatasaray - Başakşehir", "Alanyaspor - Rizespor", "Konyaspor - Erzurumspor", "Eyüpspor - Çorum FK", "Gaziantep FK - Göztepe", "Amed SF - Kasımpaşa", "Beşiktaş - Fenerbahçe", "Gençlerbirliği - Trabzonspor", "Samsunspor - Kocaelispor"],
  "22. Hafta": ["Erzurumspor - Beşiktaş", "Rizespor - Eyüpspor", "Göztepe - Alanyaspor", "Trabzonspor - Konyaspor", "Kasımpaşa - Gençlerbirliği", "Başakşehir - Amed SF", "Kocaelispor - Galatasaray", "Çorum FK - Samsunspor", "Fenerbahçe - Gaziantep FK"],
  "23. Hafta": ["Konyaspor - Kasımpaşa", "Galatasaray - Trabzonspor", "Gençlerbirliği - Başakşehir", "Gaziantep FK - Kocaelispor", "Alanyaspor - Çorum FK", "Rizespor - Göztepe", "Eyüpspor - Fenerbahçe", "Beşiktaş - Amed SF", "Samsunspor - Erzurumspor"],
  "24. Hafta": ["Kasımpaşa - Galatasaray", "Amed SF - Gençlerbirliği", "Erzurumspor - Alanyaspor", "Trabzonspor - Samsunspor", "Fenerbahçe - Rizespor", "Çorum FK - Gaziantep FK", "Başakşehir - Konyaspor", "Kocaelispor - Beşiktaş", "Göztepe - Eyüpspor"],
  "25. Hafta": ["Rizespor - Çorum FK", "Alanyaspor - Fenerbahçe", "Eyüpspor - Erzurumspor", "Galatasaray - Gençlerbirliği", "Konyaspor - Amed SF", "Samsunspor - Kasımpaşa", "Göztepe - Kocaelispor", "Gaziantep FK - Başakşehir", "Beşiktaş - Trabzonspor"],
  "26. Hafta": ["Kocaelispor - Alanyaspor", "Amed SF - Samsunspor", "Kasımpaşa - Eyüpspor", "Fenerbahçe - Galatasaray", "Gençlerbirliği - Konyaspor", "Çorum FK - Göztepe", "Erzurumspor - Gaziantep FK", "Rizespor - Trabzonspor", "Başakşehir - Beşiktaş"],
  "27. Hafta": ["Galatasaray - Konyaspor", "Rizespor - Kocaelispor", "Çorum FK - Erzurumspor", "Göztepe - Fenerbahçe", "Gaziantep FK - Trabzonspor", "Eyüpspor - Amed SF", "Samsunspor - Başakşehir", "Beşiktaş - Kasımpaşa", "Alanyaspor - Gençlerbirliği"],
  "28. Hafta": ["Kasımpaşa - Gaziantep FK", "Amed SF - Galatasaray", "Başakşehir - Göztepe", "Konyaspor - Samsunspor", "Kocaelispor - Eyüpspor", "Gençlerbirliği - Beşiktaş", "Fenerbahçe - Çorum FK", "Trabzonspor - Alanyaspor", "Erzurumspor - Rizespor"],
  "29. Hafta": ["Rizespor - Amed SF", "Gaziantep FK - Gençlerbirliği", "Samsunspor - Galatasaray", "Fenerbahçe - Kocaelispor", "Beşiktaş - Konyaspor", "Eyüpspor - Trabzonspor", "Göztepe - Erzurumspor", "Alanyaspor - Kasımpaşa", "Çorum FK - Başakşehir"],
  "30. Hafta": ["Gençlerbirliği - Samsunspor", "Galatasaray - Beşiktaş", "Erzurumspor - Fenerbahçe", "Başakşehir - Eyüpspor", "Konyaspor - Alanyaspor", "Trabzonspor - Göztepe", "Amed SF - Gaziantep FK", "Kocaelispor - Çorum FK", "Kasımpaşa - Rizespor"],
  "31. Hafta": ["Fenerbahçe - Başakşehir", "Kocaelispor - Erzurumspor", "Alanyaspor - Amed SF", "Göztepe - Kasımpaşa", "Eyüpspor - Gençlerbirliği", "Gaziantep FK - Konyaspor", "Rizespor - Galatasaray", "Samsunspor - Beşiktaş", "Çorum FK - Trabzonspor"],
  "32. Hafta": ["Trabzonspor - Fenerbahçe", "Galatasaray - Eyüpspor", "Samsunspor - Alanyaspor", "Konyaspor - Göztepe", "Kasımpaşa - Erzurumspor", "Amed SF - Çorum FK", "Başakşehir - Rizespor", "Beşiktaş - Gaziantep FK", "Gençlerbirliği - Kocaelispor"],
  "33. Hafta": ["Erzurumspor - Başakşehir", "Göztepe - Amed SF", "Fenerbahçe - Kasımpaşa", "Çorum FK - Gençlerbirliği", "Alanyaspor - Galatasaray", "Eyüpspor - Konyaspor", "Rizespor - Beşiktaş", "Kocaelispor - Trabzonspor", "Gaziantep FK - Samsunspor"],
  "34. Hafta": ["Amed SF - Fenerbahçe", "Samsunspor - Eyüpspor", "Beşiktaş - Göztepe", "Galatasaray - Gaziantep FK", "Gençlerbirliği - Rizespor", "Konyaspor - Çorum FK", "Trabzonspor - Erzurumspor", "Kasımpaşa - Kocaelispor", "Başakşehir - Alanyaspor"]
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
  "Erzurumspor": { ust: "#005CA9", alt: "#FFFFFF" },
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
export default function FiksturIkinciYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

  // 🛠️ Yüzde yüz çalışan, kayma ve taşma yapmayan temiz metin bölücü fonksiyon
  const macSatiriniAyristir = (macString) => {
    if (!macString) return { evSahibi: '', evSkor: '-', depSkor: '-', deplasman: '' };

    // Skorlu maç kontrolü (İleride skor girilirse diye korundu)
    const skorBulucu = macString.match(/\s+(\d+)-(\d+)\s+/);
    if (skorBulucu) {
      const tamSkorMetni = skorBulucu[0];
      const evSkor = skorBulucu[1];
      const depSkor = skorBulucu[2];
      
      const parcalar = macString.split(tamSkorMetni);
      return {
        evSahibi: parcalar[0] ? parcalar[0].trim() : '',
        evSkor: evSkor,
        depSkor: depSkor,
        deplasman: parcalar[1] ? parcalar[1].trim() : ''
      };
    }

    // Skorsuz gelecek maç kontrolü (Örn: "Göztepe - Samsunspor")
    const tireParcalari = macString.split('-');
    if (tireParcalari.length === 2) {
      return {
        evSahibi: tireParcalari[0].trim(),
        evSkor: '-',
        depSkor: '-',
        deplasman: tireParcalari[1].trim()
      };
    }

    return { evSahibi: macString.trim(), evSkor: '-', depSkor: '-', deplasman: '' };
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
          const { evSahibi, evSkor, depSkor, deplasman } = macSatiriniAyristir(m);
          
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
                fontWeight: '600', 
                color: '#1e293b', 
                padding: '6px 4px', 
                borderBottom: i !== 8 ? '1px dashed #f1f5f9' : 'none', 
                fontFamily: ICERIK_FONTU,
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                gap: '4px'
              }}
            >
              {/* 🏠 Ev Sahibi (Hücresel Çizgi - Kayma ve uzama yapmaz) */}
              <div style={{ 
                flex: '1', textAlign: 'left', paddingLeft: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                borderLeft: '4px solid transparent', borderImage: `${evGecis} 1`
              }}>
                {evSahibi}
              </div>

              {/* 🔴 Kalın ve Net Standart Kırmızı Skor Kutuları */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: '0' }}>
                <div style={{
                  width: '28px', height: '24px',
                  backgroundColor: '#E31837', color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', borderRadius: '4px', fontSize: '0.85rem'
                }}>
                  {evSkor}
                </div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>-</span>
                <div style={{
                  width: '28px', height: '24px',
                  backgroundColor: '#E31837', color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', borderRadius: '4px', fontSize: '0.85rem'
                }}>
                  {depSkor}
                </div>
              </div>

              {/* 🚀 Deplasman (Sağ Çizgili) */}
              <div style={{ 
                flex: '1', textAlign: 'right', paddingRight: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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
        <Navbar aktifSayfa="fikstur2" />
        
        {/* 🎯 SEO & ADSENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig 2. Yarı Fikstür ve Maç Sonuçları
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
          <strong>Süper Lig Fikstür Notu:</strong> Süper Lig sezonunun ikinci devresinde oynanacak karşılaşmalar, haftalık maç programları ve planlama tarihleri aşağıda listelenmektedir. Kadro mühendisliği süreçlerinizde takımların dönemsel fikstür dengesini buradan analiz edebilirsiniz.
        </div>

        {/* 🔄 ORTALI MOBİL GEÇİŞ KÖPRÜSÜ */}
        <div className="flex lg:hidden justify-center gap-2 mb-4">
          <Link href="/fikstur-ilk-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#16a34a',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #f1f5f9',
            WebkitTapHighlightColor: 'transparent'
          }}>
            1. Yarı
          </Link>
          <Link href="/fikstur-ikinci-yari" style={{
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
            2. Yarı
          </Link>
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İLK GRUP (18-26. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHalta(h))}
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İKİNCİ GRUP (27-34. HAFTALAR) */}
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
            Süper Lig 2. Yarı Fikstürü ve Sezon Sonu Maç Programı Analizi
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut 2. yarı fikstür sayfasında, 18. hafta ile 34. hafta arasındaki tüm eşleşmeleri, maç programlarını ve yaklaşık takvim tarihlerini bulabilirsiniz. Şampiyonluk yarışı, Avrupa kotaları ve küme düşme potasındaki kritik virajları incelerken, takımların iç saha/deplasman fikstür dengesini göz önünde bulundurmak fantezi futbol kadrolarınızda nokta atışı oyuncu tercihleri yapmanızı kolaylaştırır.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
