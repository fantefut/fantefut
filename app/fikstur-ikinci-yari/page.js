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

const DATA = {
  "18. Hafta": [
    "Göztepe - Samsunspor | Pazar 19:00",
    "Eyüpspor - Beşiktaş | Pazar 19:00",
    "Fenerbahçe - Gençlerbirliği | Pazar 19:00",
    "Alanyaspor - Gaziantep FK | Pazar 19:00",
    "Rizespor - Konyaspor | Pazar 19:00",
    "Trabzonspor - Kasımpaşa | Pazar 19:00",
    "Erzurumspor - Amed SF | Pazar 19:00",
    "Kocaelispor - Başakşehir | Pazar 19:00",
    "Çorum FK - Galatasaray | Pazar 19:00"
  ],
  "19. Hafta": [
    "Samsunspor - Rizespor | Pazar 19:00",
    "Kasımpaşa - Çorum FK | Pazar 19:00",
    "Galatasaray - Erzurumspor | Pazar 19:00",
    "Göztepe - Gençlerbirliği | Pazar 19:00",
    "Beşiktaş - Alanyaspor | Pazar 19:00",
    "Gaziantep FK - Eyüpspor | Pazar 19:00",
    "Fenerbahçe - Konyaspor | Pazar 19:00",
    "Başakşehir - Trabzonspor | Pazar 19:00",
    "Kocaelispor - Amed SF | Pazar 19:00"
  ],
  "20. Hafta": [
    "Erzurumspor - Gençlerbirliği | Pazar 19:00",
    "Rizespor - Gaziantep FK | Pazar 19:00",
    "Göztepe - Galatasaray | Pazar 19:00",
    "Kocaelispor - Konyaspor | Pazar 19:00",
    "Alanyaspor - Eyüpspor | Pazar 19:00",
    "Kasımpaşa - Başakşehir | Pazar 19:00",
    "Fenerbahçe - Samsunspor | Pazar 19:00",
    "Trabzonspor - Amed SF | Pazar 19:00",
    "Çorum FK - Beşiktaş | Pazar 19:00"
  ],
  "21. Hafta": [
    "Galatasaray - Başakşehir | Pazar 19:00",
    "Alanyaspor - Rizespor | Pazar 19:00",
    "Konyaspor - Erzurumspor | Pazar 19:00",
    "Eyüpspor - Çorum FK | Pazar 19:00",
    "Gaziantep FK - Göztepe | Pazar 19:00",
    "Amed SF - Kasımpaşa | Pazar 19:00",
    "Beşiktaş - Fenerbahçe | Pazar 19:00",
    "Gençlerbirliği - Trabzonspor | Pazar 19:00",
    "Samsunspor - Kocaelispor | Pazar 19:00"
  ],
  "22. Hafta": [
    "Erzurumspor - Beşiktaş | Pazar 19:00",
    "Rizespor - Eyüpspor | Pazar 19:00",
    "Göztepe - Alanyaspor | Pazar 19:00",
    "Trabzonspor - Konyaspor | Pazar 19:00",
    "Kasımpaşa - Gençlerbirliği | Pazar 19:00",
    "Başakşehir - Amed SF | Pazar 19:00",
    "Kocaelispor - Galatasaray | Pazar 19:00",
    "Çorum FK - Samsunspor | Pazar 19:00",
    "Fenerbahçe - Gaziantep FK | Pazar 19:00"
  ],
  "23. Hafta": [
    "Konyaspor - Kasımpaşa | Pazar 19:00",
    "Galatasaray - Trabzonspor | Pazar 19:00",
    "Gençlerbirliği - Başakşehir | Pazar 19:00",
    "Gaziantep FK - Kocaelispor | Pazar 19:00",
    "Alanyaspor - Çorum FK | Pazar 19:00",
    "Rizespor - Göztepe | Pazar 19:00",
    "Eyüpspor - Fenerbahçe | Pazar 19:00",
    "Beşiktaş - Amed SF | Pazar 19:00",
    "Samsunspor - Erzurumspor | Pazar 19:00"
  ],
  "24. Hafta": [
    "Kasımpaşa - Galatasaray | Pazar 19:00",
    "Amed SF - Gençlerbirliği | Pazar 19:00",
    "Erzurumspor - Alanyaspor | Pazar 19:00",
    "Trabzonspor - Samsunspor | Pazar 19:00",
    "Fenerbahçe - Rizespor | Pazar 19:00",
    "Çorum FK - Gaziantep FK | Pazar 19:00",
    "Başakşehir - Konyaspor | Pazar 19:00",
    "Kocaelispor - Beşiktaş | Pazar 19:00",
    "Göztepe - Eyüpspor | Pazar 19:00"
  ],
  "25. Hafta": [
    "Rizespor - Çorum FK | Pazar 19:00",
    "Alanyaspor - Fenerbahçe | Pazar 19:00",
    "Eyüpspor - Erzurumspor | Pazar 19:00",
    "Galatasaray - Gençlerbirliği | Pazar 19:00",
    "Konyaspor - Amed SF | Pazar 19:00",
    "Samsunspor - Kasımpaşa | Pazar 19:00",
    "Göztepe - Kocaelispor | Pazar 19:00",
    "Gaziantep FK - Başakşehir | Pazar 19:00",
    "Beşiktaş - Trabzonspor | Pazar 19:00"
  ],
  "26. Hafta": [
    "Kocaelispor - Alanyaspor | Pazar 19:00",
    "Amed SF - Samsunspor | Pazar 19:00",
    "Kasımpaşa - Eyüpspor | Pazar 19:00",
    "Fenerbahçe - Galatasaray | Pazar 19:00",
    "Gençlerbirliği - Konyaspor | Pazar 19:00",
    "Çorum FK - Göztepe | Pazar 19:00",
    "Erzurumspor - Gaziantep FK | Pazar 19:00",
    "Rizespor - Trabzonspor | Pazar 19:00",
    "Başakşehir - Beşiktaş | Pazar 19:00"
  ],
  "27. Hafta": [
    "Galatasaray - Konyaspor | Pazar 19:00",
    "Rizespor - Kocaelispor | Pazar 19:00",
    "Çorum FK - Erzurumspor | Pazar 19:00",
    "Göztepe - Fenerbahçe | Pazar 19:00",
    "Gaziantep FK - Trabzonspor | Pazar 19:00",
    "Eyüpspor - Amed SF | Pazar 19:00",
    "Samsunspor - Başakşehir | Pazar 19:00",
    "Beşiktaş - Kasımpaşa | Pazar 19:00",
    "Alanyaspor - Gençlerbirliği | Pazar 19:00"
  ],
  "28. Hafta": [
    "Kasımpaşa - Gaziantep FK | Pazar 19:00",
    "Amed SF - Galatasaray | Pazar 19:00",
    "Başakşehir - Göztepe | Pazar 19:00",
    "Konyaspor - Samsunspor | Pazar 19:00",
    "Kocaelispor - Eyüpspor | Pazar 19:00",
    "Gençlerbirliği - Beşiktaş | Pazar 19:00",
    "Fenerbahçe - Çorum FK | Pazar 19:00",
    "Trabzonspor - Alanyaspor | Pazar 19:00",
    "Erzurumspor - Rizespor | Pazar 19:00"
  ],
  "29. Hafta": [
    "Rizespor - Amed SF | Pazar 19:00",
    "Gaziantep FK - Gençlerbirliği | Pazar 19:00",
    "Samsunspor - Galatasaray | Pazar 19:00",
    "Fenerbahçe - Kocaelispor | Pazar 19:00",
    "Beşiktaş - Konyaspor | Pazar 19:00",
    "Eyüpspor - Trabzonspor | Pazar 19:00",
    "Göztepe - Erzurumspor | Pazar 19:00",
    "Alanyaspor - Kasımpaşa | Pazar 19:00",
    "Çorum FK - Başakşehir | Pazar 19:00"
  ],
  "30. Hafta": [
    "Gençlerbirliği - Samsunspor | Pazar 19:00",
    "Galatasaray - Beşiktaş | Pazar 19:00",
    "Erzurumspor - Fenerbahçe | Pazar 19:00",
    "Başakşehir - Eyüpspor | Pazar 19:00",
    "Konyaspor - Alanyaspor | Pazar 19:00",
    "Trabzonspor - Göztepe | Pazar 19:00",
    "Amed SF - Gaziantep FK | Pazar 19:00",
    "Kocaelispor - Çorum FK | Pazar 19:00",
    "Kasımpaşa - Rizespor | Pazar 19:00"
  ],
  "31. Hafta": [
    "Fenerbahçe - Başakşehir | Pazar 19:00",
    "Kocaelispor - Erzurumspor | Pazar 19:00",
    "Alanyaspor - Amed SF | Pazar 19:00",
    "Göztepe - Kasımpaşa | Pazar 19:00",
    "Eyüpspor - Gençlerbirliği | Pazar 19:00",
    "Gaziantep FK - Konyaspor | Pazar 19:00",
    "Rizespor - Galatasaray | Pazar 19:00",
    "Samsunspor - Beşiktaş | Pazar 19:00",
    "Çorum FK - Trabzonspor | Pazar 19:00"
  ],
  "32. Hafta": [
    "Trabzonspor - Fenerbahçe | Pazar 19:00",
    "Galatasaray - Eyüpspor | Pazar 19:00",
    "Samsunspor - Alanyaspor | Pazar 19:00",
    "Konyaspor - Göztepe | Pazar 19:00",
    "Kasımpaşa - Erzurumspor | Pazar 19:00",
    "Amed SF - Çorum FK | Pazar 19:00",
    "Başakşehir - Rizespor | Pazar 19:00",
    "Beşiktaş - Gaziantep FK | Pazar 19:00",
    "Gençlerbirliği - Kocaelispor | Pazar 19:00"
  ],
  "33. Hafta": [
    "Erzurumspor - Başakşehir | Pazar 19:00",
    "Göztepe - Amed SF | Pazar 19:00",
    "Fenerbahçe - Kasımpaşa | Pazar 19:00",
    "Çorum FK - Gençlerbirliği | Pazar 19:00",
    "Alanyaspor - Galatasaray | Pazar 19:00",
    "Eyüpspor - Konyaspor | Pazar 19:00",
    "Rizespor - Beşiktaş | Pazar 19:00",
    "Kocaelispor - Trabzonspor | Pazar 19:00",
    "Gaziantep FK - Samsunspor | Pazar 19:00"
  ],
  "34. Hafta": [
    "Amed SF - Fenerbahçe | Pazar 19:00",
    "Samsunspor - Eyüpspor | Pazar 19:00",
    "Beşiktaş - Göztepe | Pazar 19:00",
    "Galatasaray - Gaziantep FK | Pazar 19:00",
    "Gençlerbirliği - Rizespor | Pazar 19:00",
    "Konyaspor - Çorum FK | Pazar 19:00",
    "Trabzonspor - Erzurumspor | Pazar 19:00",
    "Kasımpaşa - Kocaelispor | Pazar 19:00",
    "Başakşehir - Alanyaspor | Pazar 19:00"
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
