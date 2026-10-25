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
  "1. Hafta": [
    "Galatasaray 2-2 Çorum FK | Cuma 21:30",
    "Kasımpaşa 1-1 Trabzonspor | Cumartesi 19:00",
    "Konyaspor 0-1 Rizespor | Cumartesi 19:00",
    "Gaziantep FK 1-1 Alanyaspor | Cumartesi 21:30",
    "Gençlerbirliği 2-1 Fenerbahçe | Cumartesi 21:30",
    "Başakşehir 2-0 Kocaelispor | Pazar 19:00",
    "Amed SF 3-0 Erzurumspor | Pazar 21:30",
    "Beşiktaş 1-0 Eyüpspor | Pazar 21:30",
    "Samsunspor 3-3 Göztepe | Pazartesi 21:30"
  ],
  "2. Hafta": [
    "Erzurumspor 0-4 Galatasaray | Cuma 21:30",
    "Rizespor 0-2 Samsunspor | Cumartesi 19:00",
    "Çorum FK 0-1 Kasımpaşa | Cumartesi 19:00",
    "Fenerbahçe 4-2 Konyaspor | Cumartesi 21:30",
    "Trabzonspor 2-1 Başakşehir | Pazar 19:00",
    "Eyüpspor 0-1 Gaziantep FK | Pazar 19:00",
    "Alanyaspor 1-0 Beşiktaş | Pazar 21:30",
    "Göztepe 0-1 Gençlerbirliği | Pazar 21:30",
    "Kocaelispor 2-0 Amed SF | Pazartesi 21:30"
  ],
  "3. Hafta": [
    "Gençlerbirliği 1-1 Erzurumspor | Cuma 21:30",
    "Gaziantep FK 1-2 Rizespor | Cumartesi 19:00",
    "Başakşehir 1-1 Kasımpaşa | Cumartesi 19:00",
    "Galatasaray 3-2 Göztepe | Cumartesi 21:30",
    "Eyüpspor 2-1 Alanyaspor | Pazar 19:00",
    "Konyaspor 1-2 Kocaelispor | Pazar 19:00",
    "Samsunspor 0-2 Fenerbahçe | Pazar 21:30",
    "Amed SF 2-1 Trabzonspor | Pazartesi 21:00",
    "Beşiktaş 6-2 Çorum FK | Pazartesi 21:30"
  ],
  "4. Hafta": [
    "Başakşehir 2-3 Galatasaray | Cuma 20:00",
    "Çorum FK 3-0 Eyüpspor | Cumartesi 17:00",
    "Kasımpaşa 2-2 Amed SF | Cumartesi 17:00",
    "Fenerbahçe 1-2 Beşiktaş | Cumartesi 20:00",
    "Erzurumspor 1-0 Konyaspor | Pazar 17:00",
    "Kocaelispor 1-0 Samsunspor | Pazar 17:00",
    "Trabzonspor 5-0 Gençlerbirliği | Pazar 20:00",
    "Göztepe 2-4 Gaziantep FK | Pazar 20:00",
    "Rizespor 0-1 Alanyaspor | Pazartesi 20:00"
  ],
  "5. Hafta": [
    "Samsunspor 1-5 Çorum FK | Cuma 20:00",
    "Eyüpspor 0-2 Rizespor | Cumartesi 17:00",
    "Gaziantep FK 0-0 Fenerbahçe | Cumartesi 17:00",
    "Galatasaray 1-0 Kocaelispor | Cumartesi 20:00",
    "Alanyaspor 2-2 Göztepe | Pazar 17:00",
    "Gençlerbirliği 1-2 Kasımpaşa | Pazar 17:00",
    "Beşiktaş 3-0 Erzurumspor | Pazar 20:00",
    "Konyaspor 1-0 Trabzonspor | Pazar 20:00",
    "Amed SF 5-0 Başakşehir | Pazartesi 20:00"
  ],
  "6. Hafta": [
    "Trabzonspor 4-0 Galatasaray | Cuma 20:00",
    "Kasımpaşa 0-0 Konyaspor | Cumartesi 17:00",
    "Başakşehir 4-0 Gençlerbirliği | Cumartesi 17:00",
    "Fenerbahçe 8-0 Eyüpspor | Cumartesi 20:00",
    "Çorum FK 1-2 Alanyaspor | Pazar 17:00",
    "Erzurumspor 1-0 Samsunspor | Pazar 17:00",
    "Göztepe 2-2 Rizespor | Pazar 20:00",
    "Amed SF 3-2 Beşiktaş | Pazar 20:00",
    "Kocaelispor 2-0 Gaziantep FK | Pazartesi 20:00"
  ],
  "7. Hafta": [
    "Galatasaray 3-1 Kasımpaşa | Cuma 20:00",
    "Gençlerbirliği 2-2 Amed SF | Cumartesi 13:30",
    "Samsunspor 0-3 Trabzonspor | Cumartesi 16:00",
    "Alanyaspor 0-0 Erzurumspor | Cumartesi 16:00",
    "Rizespor 0-3 Fenerbahçe | Cumartesi 19:00",
    "Konyaspor 0-0 Başakşehir | Pazar 13:30",
    "Gaziantep FK 0-3 Çorum FK | Pazar 16:00",
    "Beşiktaş 2-1 Kocaelispor | Pazar 19:00",
    "Eyüpspor 0-4 Göztepe | Pazartesi 20:00"
  ],
  "8. Hafta": [
    "Çorum FK 2-1 Rizespor | Cuma 20:00",
    "Eyüpspor 0-2 Erzurumspor | Cumartesi 13:30",
    "Gençlerbirliği 0-1 Galatasaray | Cumartesi 16:00",
    "Amed SF 1-0 Konyaspor | Cumartesi 16:00",
    "Fenerbahçe 3-0 Alanyaspor | Cumartesi 19:00",
    "Kasımpaşa 4-1 Samsunspor | Pazar 13:30",
    "Kocaelispor 1-2 Göztepe | Pazar 16:00",
    "Başakşehir 2-1 Gaziantep FK | Pazar 19:00",
    "Trabzonspor 2-0 Beşiktaş | Pazartesi 20:00"
  ],
  "9. Hafta": [
    "Alanyaspor 1-2 Kocaelispor | Cuma 20:00",
    "Eyüpspor 0-1 Kasımpaşa | Cumartesi 13:30",
    "Gaziantep FK 1-3 Erzurumspor | Cumartesi 16:00",
    "Samsunspor 1-2 Amed SF | Cumartesi 19:00",
    "Konyaspor 2-0 Gençlerbirliği | Pazar 16:00",
    "Göztepe 2-0 Çorum FK | Pazar 19:00",
    "Rizespor-Trabzonspor | Pazartesi 19:00",
    "Beşiktaş-Başakşehir | Pazartesi 19:00",
    "Galatasaray-Fenerbahçe | Pazartesi 21:30"
  ],
  "10. Hafta": [
    "Konyaspor-Galatasaray | Cuma 20:00",
    "Erzurumspor-Çorum FK | Cumartesi 13:30",
    "Kocaelispor-Rizespor | Cumartesi 16:00",
    "Fenerbahçe-Göztepe | Cumartesi 19:00",
    "Amed SF-Eyüpspor | Pazar 13:30",
    "Trabzonspor-Gaziantep FK | Pazar 16:00",
    "Başakşehir-Samsunspor | Pazar 16:00",
    "Kasımpaşa-Beşiktaş | Pazar 19:00",
    "Gençlerbirliği-Alanyaspor | Pazartesi 20:00"
  ],
  "11. Hafta": [
    "Gaziantep FK-Kasımpaşa | Cuma 20:00",
    "Eyüpspor-Kocaelispor | Cumartesi 13:30",
    "Samsunspor-Konyaspor | Cumartesi 16:00",
    "Galatasaray-Amed SF | Cumartesi 19:00",
    "Göztepe-Başakşehir | Cumartesi 19:00",
    "Rizespor-Erzurumspor | Pazar 13:30",
    "Çorum FK-Fenerbahçe | Pazar 16:00",
    "Alanyaspor-Trabzonspor | Pazar 18:30",
    "Beşiktaş-Gençlerbirliği | Pazar 21:00"
  ],
  "12. Hafta": [
    "Gençlerbirliği-Gaziantep FK | Cumartesi 13:30",
    "Amed SF-Rizespor | Cumartesi 16:00",
    "Galatasaray-Samsunspor | Cumartesi 16:00",
    "Kocaelispor-Fenerbahçe | Cumartesi 19:00",
    "Erzurumspor-Göztepe | Pazar 13:30",
    "Kasımpaşa-Alanyaspor | Pazar 16:00",
    "Konyaspor-Beşiktaş | Pazar 16:00",
    "Trabzonspor-Eyüpspor | Pazar 19:00",
    "Çorum FK-Başakşehir | Pazartesi 20:00"
  ],
  "13. Hafta": [
    "Rizespor-Kasımpaşa | Cuma 20:00",
    "Alanyaspor-Konyaspor | Cuma 20:00",
    "Samsunspor-Gençlerbirliği | Cumartesi 16:00",
    "Gaziantep FK-Amed SF | Cumartesi 19:00",
    "Çorum FK-Kocaelispor | Pazar 13:30",
    "Eyüpspor-Başakşehir | Pazar 16:00",
    "Fenerbahçe-Erzurumspor | Pazar 19:00",
    "Göztepe-Trabzonspor | Pazartesi 19:00",
    "Beşiktaş-Galatasaray | Pazartesi 21:00"
  ],
  "14. Hafta": [
    "Galatasaray-Rizespor | Cuma 20:00",
    "Konyaspor-Gaziantep FK | Cumartesi 13:30",
    "Amed SF-Alanyaspor | Cumartesi 16:00",
    "Başakşehir-Fenerbahçe | Cumartesi 19:00",
    "Erzurumspor-Kocaelispor | Pazar 13:30",
    "Gençlerbirliği-Eyüpspor | Pazar 16:00",
    "Beşiktaş-Samsunspor | Pazar 16:00",
    "Trabzonspor-Çorum FK | Pazar 19:00",
    "Kasımpaşa-Göztepe | Pazartesi 20:00"
  ],
  "15. Hafta": [
    "Çorum FK-Amed SF | Cuma 20:00",
    "Erzurumspor-Kasımpaşa | Cumartesi 13:30",
    "Alanyaspor-Samsunspor | Cumartesi 16:00",
    "Eyüpspor-Galatasaray | Cumartesi 19:00",
    "Kocaelispor-Gençlerbirliği | Pazar 13:30",
    "Göztepe-Konyaspor | Pazar 16:00",
    "Rizespor-Başakşehir | Pazar 16:00",
    "Fenerbahçe-Trabzonspor | Pazar 19:00",
    "Gaziantep FK-Beşiktaş | Pazartesi 20:00"
  ],
  "16. Hafta": [
    "Kasımpaşa-Fenerbahçe | Cuma 20:00",
    "Amed SF-Göztepe | Cuma 20:00",
    "Konyaspor-Eyüpspor | Cumartesi 13:30",
    "Başakşehir-Erzurumspor | Cumartesi 16:00",
    "Galatasaray-Alanyaspor | Cumartesi 19:00",
    "Gençlerbirliği-Çorum FK | Pazar 13:30",
    "Samsunspor-Gaziantep FK | Pazar 16:00",
    "Beşiktaş-Rizespor | Pazar 19:00",
    "Trabzonspor-Kocaelispor | Pazartesi 20:00"
  ],
  "17. Hafta": [
    "Alanyaspor-Başakşehir | Tarih Açıklanmadı",
    "Fenerbahçe-Amed SF | Tarih Açıklanmadı",
    "Kocaelispor-Kasımpaşa | Tarih Açıklanmadı",
    "Rizespor-Gençlerbirliği | Tarih Açıklanmadı",
    "Gaziantep FK-Galatasaray | Tarih Açıklanmadı",
    "Çorum FK-Konyaspor | Tarih Açıklanmadı",
    "Göztepe-Beşiktaş | Tarih Açıklanmadı",
    "Trabzonspor-Erzurumspor | Tarih Açıklanmadı",
    "Eyüpspor-Samsunspor | Tarih Açıklanmadı"
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
export default function FiksturIlkYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

  // 🛠️ Yenilenen Metin Bölücü: Hem skorları hem de '|' sonrasındaki gün/saat bilgisini ayıklar
  const macSatiriniAyristir = (macString) => {
    if (!macString) return { evSahibi: '', evSkor: '-', depSkor: '-', deplasman: '', tarihBilgisi: '' };

    // Önce dizede tarih ayracı (|) var mı kontrol et
    const parcalarTarih = macString.split('|');
    const macKismi = parcalarTarih[0] ? parcalarTarih[0].trim() : '';
    const tarihBilgisi = parcalarTarih[1] ? parcalarTarih[1].trim() : '';

    // Skor ayracı var mı kontrol et (Örn: " 2-2 ")
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

    // Gelecek skorsuz maçlar için kontrol (Örn: "Samsunspor-Amed SF")
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
          <strong>Süper Lig Fikstür Notu:</strong> Süper Lig sezonunun ilk devresinde oynanan karşılaşmalar, haftalık maç sonuçları ve planlama tarihleri aşağıda listelenmektedir. Oyun süreçlerinizde takımların fikstür zorluklarını buradan analiz edebilirsiniz. Maç tarihleri belli oldukça 'Tarih Açıklanmadı' yazıları yerine gün ve saat yazılmaktadır.
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
            FanteFut 1. yarı fikstür sayfasında, sezonun ilk devresinde oynanan tüm karşılaşmaların haftalık maç sonuçlarını ve resmi takvim tarihlerini bulabilirsiniz. Fantezi futbol menajerleri için ligin ilk 17 haftasındaki takımların maç yoğunluklarını, geçmiş skorlarını ve fikstür avantajlarını geriye dönük analiz etmek gelecekteki haftaların kadro planlamasında büyük önem taşır. Sezonun ikinci yarı fikstür takvimi için menüdeki ilgili bağlantıyı kullanabilirsiniz. Dokuzuncu haftanın açılış maçında Kocaelispor kazanırken, büyük derbi kapanış maçı olacak.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
