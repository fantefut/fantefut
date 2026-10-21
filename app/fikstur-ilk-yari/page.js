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
    "Galatasaray 2-2 Çorum FK | Cuma 21:00",
    "Kasımpaşa 1-1 Trabzonspor | Cumartesi 19:15",
    "Konyaspor 0-1 Rizespor | Cumartesi 21:45",
    "Gaziantep FK 1-1 Alanyaspor | Pazar 17:00",
    "Gençlerbirliği 2-1 Fenerbahçe | Pazar 19:15",
    "Başakşehir 2-0 Kocaelispor | Pazar 21:45",
    "Amed SF 3-0 Erzurumspor | Pazartesi 19:15",
    "Beşiktaş 1-0 Eyüpspor | Pazartesi 21:00",
    "Samsunspor 3-3 Göztepe | Pazartesi 21:45"
  ],
  "2. Hafta": [
    "Erzurumspor 0-4 Galatasaray | Cuma 21:00",
    "Rizespor 0-2 Samsunspor | Cumartesi 19:15",
    "Fenerbahçe 4-2 Konyaspor | Cumartesi 21:45",
    "Çorum FK 0-1 Kasımpaşa | Pazar 17:00",
    "Eyüpspor 0-1 Gaziantep FK | Pazar 19:15",
    "Trabzonspor 2-1 Başakşehir | Pazar 21:45",
    "Alanyaspor 1-0 Beşiktaş | Pazartesi 19:15",
    "Göztepe 0-1 Gençlerbirliği | Pazartesi 21:00",
    "Kocaelispor 2-0 Amed SF | Pazartesi 21:45"
  ],
  "3. Hafta": [
    "Gençlerbirliği 1-1 Erzurumspor | Cuma 21:00",
    "Gaziantep FK 1-2 Rizespor | Cumartesi 19:15",
    "Galatasaray 3-2 Göztepe | Cumartesi 21:45",
    "Konyaspor 1-2 Kocaelispor | Pazar 17:00",
    "Eyüpspor 2-1 Alanyaspor | Pazar 19:15",
    "Başakşehir 1-1 Kasımpaşa | Pazar 21:45",
    "Samsunspor 0-2 Fenerbahçe | Pazartesi 19:15",
    "Amed SF 2-1 Trabzonspor | Pazartesi 21:00",
    "Beşiktaş 6-2 Çorum FK | Pazartesi 21:45"
  ],
  "4. Hafta": [
    "Başakşehir 2-3 Galatasaray | Cuma 21:00",
    "Erzurumspor 1-0 Konyaspor | Cumartesi 19:15",
    "Fenerbahçe 1-2 Beşiktaş | Cumartesi 21:45",
    "Kocaelispor 1-0 Samsunspor | Pazar 17:00",
    "Çorum FK 3-0 Eyüpspor | Pazar 19:15",
    "Trabzonspor 5-0 Gençlerbirliği | Pazar 21:45",
    "Kasımpaşa 2-2 Amed SF | Pazartesi 19:15",
    "Göztepe 2-4 Gaziantep FK | Pazartesi 21:00",
    "Rizespor 0-1 Alanyaspor | Pazartesi 21:45"
  ],
  "5. Hafta": [
    "Beşiktaş 3-0 Erzurumspor | Cuma 21:00",
    "Samsunspor 1-5 Çorum FK | Cumartesi 19:15",
    "Eyüpspor 0-2 Rizespor | Cumartesi 21:45",
    "Alanyaspor 2-2 Göztepe | Pazar 17:00",
    "Konyaspor 1-0 Trabzonspor | Pazar 19:15",
    "Gençlerbirliği 1-2 Kasımpaşa | Pazar 21:45",
    "Amed SF 5-0 Başakşehir | Pazartesi 19:15",
    "Galatasaray 1-0 Kocaelispor | Pazartesi 21:00",
    "Gaziantep FK 0-0 Fenerbahçe | Pazartesi 21:45"
  ],
  "6. Hafta": [
    "Kasımpaşa 0-0 Konyaspor | Cuma 21:00",
    "Trabzonspor 4-0 Galatasaray | Cumartesi 19:15",
    "Başakşehir 4-0 Gençlerbirliği | Cumartesi 21:45",
    "Kocaelispor 2-0 Gaziantep FK | Pazar 17:00",
    "Çorum FK 1-2 Alanyaspor | Pazar 19:15",
    "Göztepe 2-2 Rizespor | Pazar 21:45",
    "Fenerbahçe 8-0 Eyüpspor | Pazartesi 19:15",
    "Amed SF 3-2 Beşiktaş | Pazartesi 21:00",
    "Erzurumspor 1-0 Samsunspor | Pazartesi 21:45"
  ],
  "7. Hafta": [
    "Galatasaray 2-1 Kasımpaşa | Cuma 21:00",
    "Gençlerbirliği 2-2 Amed SF | Cumartesi 19:15",
    "Alanyaspor 0-0 Erzurumspor | Cumartesi 21:45",
    "Samsunspor 0-3 Trabzonspor | Pazar 17:00",
    "Rizespor 0-3 Fenerbahçe | Pazar 19:15",
    "Gaziantep FK 0-3 Çorum FK | Pazar 21:45",
    "Konyaspor 0-0 Başakşehir | Pazartesi 19:15",
    "Beşiktaş 2-1 Kocaelispor | Pazartesi 21:00",
    "Eyüpspor 0-4 Göztepe | Pazartesi 21:45"
  ],
  "8. Hafta": [
    "Çorum FK 2-1 Rizespor | Cuma 21:00",
    "Fenerbahçe 3-0 Alanyaspor | Cumartesi 19:15",
    "Erzurumspor 2-0 Eyüpspor | Cumartesi 21:45",
    "Gençlerbirliği 0-1 Galatasaray | Pazar 17:00",
    "Amed SF 1-0 Konyaspor | Pazar 19:15",
    "Kasımpaşa 4-1 Samsunspor | Pazar 21:45",
    "Kocaelispor 1-2 Göztepe | Pazartesi 19:15",
    "Başakşehir 2-1 Gaziantep FK | Pazartesi 21:00",
    "Trabzonspor 2-0 Beşiktaş | Pazartesi 21:45"
  ],
  "9. Hafta": [
    "Alanyaspor-Kocaelispor | Pazar 19:00",
    "Samsunspor-Amed SF | Pazar 19:00",
    "Eyüpspor-Kasımpaşa | Pazar 19:00",
    "Gaziantep FK-Erzurumspor | Pazar 19:00",
    "Göztepe-Çorum FK | Pazar 19:00",
    "Konyaspor-Gençlerbirliği | Pazar 19:00",
    "Galatasaray-Fenerbahçe | Pazar 19:00",
    "Rizespor-Trabzonspor | Pazar 19:00",
    "Beşiktaş-Başakşehir | Pazar 19:00"
  ],
  "10. Hafta": [
    "Konyaspor-Galatasaray | Pazar 19:00",
    "Kocaelispor-Rizespor | Pazar 19:00",
    "Erzurumspor-Çorum FK | Pazar 19:00",
    "Fenerbahçe-Göztepe | Pazar 19:00",
    "Trabzonspor-Gaziantep FK | Pazar 19:00",
    "Amed SF-Eyüpspor | Pazar 19:00",
    "Samsunspor-Başakşehir | Pazar 19:00",
    "Kasi̇mpaşa-Beşi̇ktaş | Pazar 19:00",
    "Gençlerbi̇rli̇ği̇-Alanyaspor | Pazar 19:00"
  ],
  "11. Hafta": [
    "Gaziantep FK-Kasi̇mpaşa | Pazar 19:00",
    "Galatasaray-Amed SF | Pazar 19:00",
    "Göztepe-Başakşehi̇r | Pazar 19:00",
    "Samsunspor-Konyaspor | Pazar 19:00",
    "Eyüpspor-Kocaelispor | Pazar 19:00",
    "Beşi̇ktaş-Gençlerbi̇rli̇ği̇ | Pazar 19:00",
    "Çorum FK-Fenerbahçe | Pazar 19:00",
    "Alanyaspor-Trabzonspor | Pazar 19:00",
    "Rizespor-Erzurumspor | Pazar 19:00"
  ],
  "12. Hafta": [
    "Amed SF-Rizespor | Pazar 19:00",
    "Gençlerbi̇rli̇ği̇-Gaziantep FK | Pazar 19:00",
    "Galatasaray-Samsunspor | Pazar 19:00",
    "Kocaelispor-Fenerbahçe | Pazar 19:00",
    "Konyaspor-Beşi̇ktaş | Pazar 19:00",
    "Trabzonspor-Eyüpspor | Pazar 19:00",
    "Erzurumspor-Göztepe | Pazar 19:00",
    "Kasi̇mpaşa-Alanyaspor | Pazar 19:00",
    "Çorum FK-Başakşehi̇r | Pazar 19:00"
  ],
  "13. Hafta": [
    "Rizespor-Kasi̇mpaşa | Pazar 19:00",
    "Alanyaspor-Konyaspor | Pazar 19:00",
    "Samsunspor-Gençlerbi̇rli̇ği̇ | Pazar 19:00",
    "Gaziantep FK-Amed SF | Pazar 19:00",
    "Fenerbahçe-Erzurumspor | Pazar 19:00",
    "Eyüpspor-Başakşehi̇r | Pazar 19:00",
    "Çorum FK-Kocaelispor | Pazar 19:00",
    "Beşi̇ktaş-Galatasaray | Pazar 19:00",
    "Göztepe-Trabzonspor | Pazar 19:00"
  ],
  "14. Hafta": [
    "Galatasaray-Rizespor | Pazar 19:00",
    "Konyaspor-Gaziantep FK | Pazar 19:00",
    "Amed SF-Alanyaspor | Pazar 19:00",
    "Başakşehi̇r-Fenerbahçe | Pazar 19:00",
    "Beşi̇ktaş-Samsunspor | Pazar 19:00",
    "Gençlerbi̇rli̇ği̇-Eyüpspor | Pazar 19:00",
    "Trabzonspor-Çorum FK | Pazar 19:00",
    "Erzurumspor-Kocaelispor | Pazar 19:00",
    "Kasi̇mpaşa-Göztepe | Pazar 19:00"
  ],
  "15. Hafta": [
    "Çorum FK-Amed SF | Pazar 19:00",
    "Erzurumspor-Kasi̇mpaşa | Pazar 19:00",
    "Eyüpspor-Galatasaray | Pazar 19:00",
    "Alanyaspor-Samsunspor | Pazar 19:00",
    "Fenerbahçe-Trabzonspor | Pazar 19:00",
    "Göztepe-Konyaspor | Pazar 19:00",
    "Kocaelispor-Gençlerbi̇rli̇ği̇ | Pazar 19:00",
    "Rizespor-Başakşehi̇r | Pazar 19:00",
    "Gaziantep FK-Beşi̇ktaş | Pazar 19:00"
  ],
  "16. Hafta": [
    "Kasi̇mpaşa-Fenerbahçe | Pazar 19:00",
    "Amed SF-Göztepe | Pazar 19:00",
    "Başakşehi̇r-Erzurumspor | Pazar 19:00",
    "Konyaspor-Eyüpspor | Pazar 19:00",
    "Galatasaray-Alanyaspor | Pazar 19:00",
    "Beşi̇ktaş-Rizespor | Pazar 19:00",
    "Gençlerbi̇rli̇ği̇-Çorum FK | Pazar 19:00",
    "Samsunspor-Gaziantep FK | Pazar 19:00",
    "Trabzonspor-Kocaelispor | Pazar 19:00"
  ],
  "17. Hafta": [
    "Alanyaspor-Başakşehi̇r | Pazar 19:00",
    "Fenerbahçe-Amed SF | Pazar 19:00",
    "Kocaelispor-Kasi̇mpaşa | Pazar 19:00",
    "Rizespor-Gençlerbi̇rli̇ği̇ | Pazar 19:00",
    "Gaziantep FK-Galatasaray | Pazar 19:00",
    "Çorum FK-Konyaspor | Pazar 19:00",
    "Göztepe-Beşi̇ktaş | Pazar 19:00",
    "Trabzonspor-Erzurumspor | Pazar 19:00",
    "Eyüpspor-Samsunspor | Pazar 19:00"
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
