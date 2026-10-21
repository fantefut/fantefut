'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// TFF Resmi İkinci Yarı Planlama Takvimine göre yaklaşık hafta başlangıç tarihleri
const HAFTA_TARIHLERI = {
  "18. Hafta": "22-25 Ocak", "19. Hafta": "29 Oca-01 Şub", "20. Hafta": "05-08 Şubat",
  "21. Hafta": "12-15 Şubat", "22. Hafta": "19-22 Şubat", "23. Hafta": "26 Şub-01 Mar",
  "24. Hafta": "05-08 Mart", "25. Hafta": "12-15 Mart", "26. Hafta": "19-22 Mart",
  "27. Hafta": "02-05 Nisan", "28. Hafta": "09-12 Nisan", "29. Hafta": "16-19 Nisan",
  "30. Hafta": "23-26 Nisan", "31. Hafta": "30 Nis-03 May", "32. Hafta": "07-10 Mayıs",
  "33. Hafta": "14-17 Mayıs", "34. Hafta": "21-23 Mayıs"
};

const DATA_IKINCI_YARI = {
  "18. Hafta": [
    "Çorum FK - Galatasaray | Tarih Açıklanmadı",
    "Trabzonspor - Kasımpaşa | Tarih Açıklanmadı",
    "Rizespor - Konyaspor | Tarih Açıklanmadı",
    "Alanyaspor - Gaziantep FK | Tarih Açıklanmadı",
    "Fenerbahçe - Gençlerbirliği | Tarih Açıklanmadı",
    "Kocaelispor - Başakşehir | Tarih Açıklanmadı",
    "Erzurumspor - Amed SF | Tarih Açıklanmadı",
    "Eyüpspor - Beşiktaş | Tarih Açıklanmadı",
    "Göztepe - Samsunspor | Tarih Açıklanmadı"
  ],
  "19. Hafta": [
    "Galatasaray - Erzurumspor | Tarih Açıklanmadı",
    "Samsunspor - Rizespor | Tarih Açıklanmadı",
    "Kasımpaşa - Çorum FK | Tarih Açıklanmadı",
    "Konyaspor - Fenerbahçe | Tarih Açıklanmadı",
    "Başakşehir - Trabzonspor | Tarih Açıklanmadı",
    "Gaziantep FK - Eyüpspor | Tarih Açıklanmadı",
    "Beşiktaş - Alanyaspor | Tarih Açıklanmadı",
    "Gençlerbirliği - Göztepe | Tarih Açıklanmadı",
    "Amed SF - Kocaelispor | Tarih Açıklanmadı"
  ],
  "20. Hafta": [
    "Erzurumspor - Gençlerbirliği | Tarih Açıklanmadı",
    "Rizespor - Gaziantep FK | Tarih Açıklanmadı",
    "Kasımpaşa - Başakşehir | Tarih Açıklanmadı",
    "Göztepe - Galatasaray | Tarih Açıklanmadı",
    "Alanyaspor - Eyüpspor | Tarih Açıklanmadı",
    "Kocaelispor - Konyaspor | Tarih Açıklanmadı",
    "Fenerbahçe - Samsunspor | Tarih Açıklanmadı",
    "Trabzonspor - Amed SF | Tarih Açıklanmadı",
    "Çorum FK - Beşiktaş | Tarih Açıklanmadı"
  ],
  "21. Hafta": [
    "Galatasaray - Başakşehir | Tarih Açıklanmadı",
    "Eyüpspor - Çorum FK | Tarih Açıklanmadı",
    "Amed SF - Kasımpaşa | Tarih Açıklanmadı",
    "Beşiktaş - Fenerbahçe | Tarih Açıklanmadı",
    "Konyaspor - Erzurumspor | Tarih Açıklanmadı",
    "Samsunspor - Kocaelispor | Tarih Açıklanmadı",
    "Gençlerbirliği - Trabzonspor | Tarih Açıklanmadı",
    "Gaziantep FK - Göztepe | Tarih Açıklanmadı",
    "Alanyaspor - Rizespor | Tarih Açıklanmadı"
  ],
  "22. Hafta": [
    "Çorum FK - Samsunspor | Tarih Açıklanmadı",
    "Rizespor - Eyüpspor | Tarih Açıklanmadı",
    "Fenerbahçe - Gaziantep FK | Tarih Açıklanmadı",
    "Kocaelispor - Galatasaray | Tarih Açıklanmadı",
    "Göztepe - Alanyaspor | Tarih Açıklanmadı",
    "Kasımpaşa - Gençlerbirliği | Tarih Açıklanmadı",
    "Erzurumspor - Beşiktaş | Tarih Açıklanmadı",
    "Trabzonspor - Konyaspor | Tarih Açıklanmadı",
    "Başakşehir - Amed SF | Tarih Açıklanmadı"
  ],
  "23. Hafta": [
    "Galatasaray - Trabzonspor | Tarih Açıklanmadı",
    "Konyaspor - Kasımpaşa | Tarih Açıklanmadı",
    "Gençlerbirliği - Başakşehir | Tarih Açıklanmadı",
    "Eyüpspor - Fenerbahçe | Tarih Açıklanmadı",
    "Alanyaspor - Çorum FK | Tarih Açıklanmadı",
    "Samsunspor - Erzurumspor | Tarih Açıklanmadı",
    "Rizespor - Göztepe | Tarih Açıklanmadı",
    "Beşiktaş - Amed SF | Tarih Açıklanmadı",
    "Gaziantep FK - Kocaelispor | Tarih Açıklanmadı"
  ],
  "24. Hafta": [
    "Kasımpaşa - Galatasaray | Tarih Açıklanmadı",
    "Amed SF - Gençlerbirliği | Tarih Açıklanmadı",
    "Trabzonspor - Samsunspor | Tarih Açıklanmadı",
    "Erzurumspor - Alanyaspor | Tarih Açıklanmadı",
    "Fenerbahçe - Rizespor | Tarih Açıklanmadı",
    "Başakşehir - Konyaspor | Tarih Açıklanmadı",
    "Çorum FK - Gaziantep FK | Tarih Açıklanmadı",
    "Kocaelispor - Beşiktaş | Tarih Açıklanmadı",
    "Göztepe - Eyüpspor | Tarih Açıklanmadı"
  ],
  "25. Hafta": [
    "Rizespor - Çorum FK | Tarih Açıklanmadı",
    "Erzurumspor - Eyüpspor | Tarih Açıklanmadı",
    "Galatasaray - Gençlerbirliği | Tarih Açıklanmadı",
    "Konyaspor - Amed SF | Tarih Açıklanmadı",
    "Alanyaspor - Fenerbahçe | Tarih Açıklanmadı",
    "Samsunspor - Kasımpaşa | Tarih Açıklanmadı",
    "Göztepe - Kocaelispor | Tarih Açıklanmadı",
    "Gaziantep FK - Başakşehir | Tarih Açıklanmadı",
    "Beşiktaş - Trabzonspor | Tarih Açıklanmadı"
  ],
  "26. Hafta": [
    "Kocaelispor - Alanyaspor | Tarih Açıklanmadı",
    "Kasımpaşa - Eyüpspor | Tarih Açıklanmadı",
    "Erzurumspor - Gaziantep FK | Tarih Açıklanmadı",
    "Amed SF - Samsunspor | Tarih Açıklanmadı",
    "Gençlerbirliği - Konyaspor | Tarih Açıklanmadı",
    "Çorum FK - Göztepe | Tarih Açıklanmadı",
    "Trabzonspor - Rizespor | Tarih Açıklanmadı",
    "Başakşehir - Beşiktaş | Tarih Açıklanmadı",
    "Fenerbahçe - Galatasaray | Tarih Açıklanmadı"
  ],
  "27. Hafta": [
    "Galatasaray - Konyaspor | Tarih Açıklanmadı",
    "Çorum FK - Erzurumspor | Tarih Açıklanmadı",
    "Rizespor - Kocaelispor | Tarih Açıklanmadı",
    "Göztepe - Fenerbahçe | Tarih Açıklanmadı",
    "Eyüpspor - Amed SF | Tarih Açıklanmadı",
    "Gaziantep FK - Trabzonspor | Tarih Açıklanmadı",
    "Samsunspor - Başakşehir | Tarih Açıklanmadı",
    "Beşiktaş - Kasımpaşa | Tarih Açıklanmadı",
    "Alanyaspor - Gençlerbirliği | Tarih Açıklanmadı"
  ],
  "28. Hafta": [
    "Kasımpaşa - Gaziantep FK | Tarih Açıklanmadı",
    "Kocaelispor - Eyüpspor | Tarih Açıklanmadı",
    "Konyaspor - Samsunspor | Tarih Açıklanmadı",
    "Amed SF - Galatasaray | Tarih Açıklanmadı",
    "Başakşehir - Göztepe | Tarih Açıklanmadı",
    "Erzurumspor - Rizespor | Tarih Açıklanmadı",
    "Fenerbahçe - Çorum FK | Tarih Açıklanmadı",
    "Trabzonspor - Alanyaspor | Tarih Açıklanmadı",
    "Gençlerbirliği - Beşiktaş | Tarih Açıklanmadı"
  ],
  "29. Hafta": [
    "Gaziantep FK - Gençlerbirliği | Tarih Açıklanmadı",
    "Rizespor - Amed SF | Tarih Açıklanmadı",
    "Samsunspor - Galatasaray | Tarih Açıklanmadı",
    "Fenerbahçe - Kocaelispor | Tarih Açıklanmadı",
    "Göztepe - Erzurumspor | Tarih Açıklanmadı",
    "Alanyaspor - Kasımpaşa | Tarih Açıklanmadı",
    "Beşiktaş - Konyaspor | Tarih Açıklanmadı",
    "Eyüpspor - Trabzonspor | Tarih Açıklanmadı",
    "Başakşehir - Çorum FK | Tarih Açıklanmadı"
  ],
  "30. Hafta": [
    "Gençlerbirliği - Samsunspor | Tarih Açıklanmadı",
    "Gaziantep FK - Amed SF | Tarih Açıklanmadı",
    "Kocaelispor - Çorum FK | Tarih Açıklanmadı",
    "Başakşehir - Eyüpspor | Tarih Açıklanmadı",
    "Konyaspor - Alanyaspor | Tarih Açıklanmadı",
    "Trabzonspor - Göztepe | Tarih Açıklanmadı",
    "Galatasaray - Beşiktaş | Tarih Açıklanmadı",
    "Alanyaspor - Konyaspor | Tarih Açıklanmadı", // Orijinal listedeki bay/eşleşme düzeni korunmuştur
    "Rizespor - Kasımpaşa | Tarih Açıklanmadı"
  ],
  "31. Hafta": [
    "Fenerbahçe - Başakşehir | Tarih Açıklanmadı",
    "Kocaelispor - Erzurumspor | Tarih Açıklanmadı",
    "Amed SF - Alanyaspor | Tarih Açıklanmadı",
    "Kasımpaşa - Göztepe | Tarih Açıklanmadı",
    "Gençlerbirliği - Eyüpspor | Tarih Açıklanmadı",
    "Konyaspor - Gaziantep FK | Tarih Açıklanmadı",
    "Rizespor - Galatasaray | Tarih Açıklanmadı",
    "Samsunspor - Beşiktaş | Tarih Açıklanmadı",
    "Çorum FK - Trabzonspor | Tarih Açıklanmadı"
  ],
  "32. Hafta": [
    "Amed SF - Çorum FK | Tarih Açıklanmadı",
    "Kasımpaşa - Erzurumspor | Tarih Açıklanmadı",
    "Samsunspor - Alanyaspor | Tarih Açıklanmadı",
    "Galatasaray - Eyüpspor | Tarih Açıklanmadı",
    "Gençlerbirliği - Kocaelispor | Tarih Açıklanmadı",
    "Konyaspor - Göztepe | Tarih Açıklanmadı",
    "Başakşehir - Rizespor | Tarih Açıklanmadı",
    "Trabzonspor - Fenerbahçe | Tarih Açıklanmadı",
    "Beşiktaş - Gaziantep FK | Tarih Açıklanmadı"
  ],
  "33. Hafta": [
    "Fenerbahçe - Kasımpaşa | Tarih Açıklanmadı",
    "Göztepe - Amed SF | Tarih Açıklanmadı",
    "Eyüpspor - Konyaspor | Tarih Açıklanmadı",
    "Erzurumspor - Başakşehir | Tarih Açıklanmadı",
    "Çorum FK - Gençlerbirliği | Tarih Açıklanmadı",
    "Gaziantep FK - Samsunspor | Tarih Açıklanmadı",
    "Rizespor - Beşiktaş | Tarih Açıklanmadı",
    "Kocaelispor - Trabzonspor | Tarih Açıklanmadı",
    "Alanyaspor - Galatasaray | Tarih Açıklanmadı"
  ],
  "34. Hafta": [
    "Başakşehir - Alanyaspor | Tarih Açıklanmadı",
    "Amed SF - Fenerbahçe | Tarih Açıklanmadı",
    "Kasımpaşa - Kocaelispor | Tarih Açıklanmadı",
    "Gençlerbirliği - Rizespor | Tarih Açıklanmadı",
    "Galatasaray - Gaziantep FK | Tarih Açıklanmadı",
    "Konyaspor - Çorum FK | Tarih Açıklanmadı",
    "Beşiktaş - Göztepe | Tarih Açıklanmadı",
    "Erzurumspor - Trabzonspor | Tarih Açıklanmadı",
    "Samsunspor - Eyüpspor | Tarih Açıklanmadı"
  ]
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

  // 🛠️ Yenilenen Metin Bölücü: Hem skorları hem de '|' sonrasındaki gün/saat bilgisini ayıklar
  const macSatiriniAyristir = (macString) => {
    if (!macString) return { evSahibi: '', evSkor: '-', depSkor: '-', deplasman: '', tarihBilgisi: '' };

    // Önce dizede tarih ayracı (|) var mı kontrol et
    const parcalarTarih = macString.split('|');
    const macKismi = parcalarTarih[0] ? parcalarTarih[0].trim() : '';
    const tarihBilgisi = parcalarTarih[1] ? parcalarTarih[1].trim() : '';

    // Skorlu maç kontrolü (İleride skor girilirse diye korundu)
    const skorBulucu = macKismi.match(/\s+(\d+)-(\d+)\s+/);

    if (skorBulucu) {
      const tamSkorMetni = skorBulucu[0];
      const evSkor = skorBulucu[1];
      const depSkor = skorBulucu[2];
      
      const takimlar = macKismi.split(tamSkorMetni);
      return {
        evSahibi: takimlar[0] ? takimlar[0].trim() : '',
        evSkor: evSkor,
        depSkor: depSkor,
        deplasman: takimlar[1] ? takimlar[1].trim() : '',
        tarihBilgisi: tarihBilgisi
      };
    }

    // Skorsuz gelecek maç kontrolü (Örn: "Göztepe - Samsunspor")
    const tireParcalari = macKismi.split('-');
    if (tireParcalari.length === 2) {
      return {
        evSahibi: tireParcalari[0].trim(),
        evSkor: '-',
        depSkor: '-',
        deplasman: tireParcalari[1].trim(),
        tarihBilgisi: tarihBilgisi
      };
    }

    return { evSahibi: macKismi.trim(), evSkor: '-', depSkor: '-', deplasman: '', tarihBilgisi: tarihBilgisi };
  };

  const renderHalta = (h) => (
    <div key={h} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
        <h3 style={{ margin: '0', color: '#132444', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>{h}</h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 'bold', fontFamily: ICERIK_FONTU, backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
          🗓️ {HAFTA_TARIHLERI[h] || ""}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {formVerileri[h].map((m, i) => {
          const { evSahibi, evSkor, depSkor, deplasman, tarihBilgisi } = macSatiriniAyristir(m);
          
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
                padding: '8px 4px 6px 4px', 
                borderBottom: i !== 8 ? '1px dashed #f1f5f9' : 'none', 
                fontFamily: ICERIK_FONTU,
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                gap: '4px',
                position: 'relative'
              }}
            >
              {/* 🏠 Ev Sahibi */}
              <div style={{ 
                flex: '1', textAlign: 'left', paddingLeft: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                borderLeft: '4px solid transparent', borderImage: `${evGecis} 1`
              }}>
                {evSahibi}
              </div>

              {/* 🔴 Tarih/Saat ve Skor Orta Alanı */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: '0', minWidth: '70px', position: 'relative' }}>
                {tarihBilgisi && (
                  <span style={{ 
                    fontSize: '9px', 
                    color: '#64748b', 
                    fontWeight: '700', 
                    marginBottom: '3px',
                    lineHeight: '1',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}>
                    {tarihBilgisi}
                  </span>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
              </div>

              {/* 🚀 Deplasman */}
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
          <strong>Süper Lig Fikstür Notu:</strong> Süper Lig sezonunun ikinci devresinde oynanacak karşılaşmalar, haftalık maç programları ve planlama tarihleri aşağıda listelenmektedir. Kadro mühendisliği süreçlerinizde takımların dönemsel fikstür dengesini buradan analiz edebilirsiniz. Tarihler belli oldukça 'Tarih Açıklanmadı' yazıları yerine maç günü ve saati yazılacaktır.
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
