'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const IC_DIS_SAHA_VERILERI = {
  "Alanyaspor": { icSaha: "GBBM", disSaha: "BMGGM" }, 
  "Amed Sportif Faaliyetler": { icSaha: "GGGGG", disSaha: "MBBG" }, 
  "Başakşehir": { icSaha: "GBMGG", disSaha: "MMBM" }, 
  "Beşiktaş": { icSaha: "GGGGG", disSaha: "MGMM" }, 
  "Çorum FK": { icSaha: "MGMG", disSaha: "BMGGM" }, 
  "Erzurumspor FK": { icSaha: "MGGG", disSaha: "MBMBG" }, 
  "Eyüpspor": { icSaha: "MGMMM", disSaha: "MMMM" }, 
  "Fenerbahçe": { icSaha: "GMGG", disSaha: "MGBG" }, 
  "Galatasaray": { icSaha: "BGGG", disSaha: "GGMG" }, 
  "Gaziantep FK": { icSaha: "BMBMM", disSaha: "GGMM" }, 
  "Gençlerbirliği": { icSaha: "GBMBM", disSaha: "GMMM" }, 
  "Göztepe": { icSaha: "MMBG", disSaha: "BMBGG" }, 
  "Kasımpaşa": { icSaha: "BBBG", disSaha: "GBGMG" }, 
  "Kocaelispor": { icSaha: "GGGM", disSaha: "MGMMG" }, 
  "Konyaspor": { icSaha: "MMGBG", disSaha: "MMBM" }, 
  "Rizespor": { icSaha: "MMMM", disSaha: "GGGBM" }, 
  "Samsunspor": { icSaha: "BMMMM", disSaha: "GMMM" }, 
  "Trabzonspor": { icSaha: "GGGG", disSaha: "BMMGG" }
};

export default function IcDisSahaSayfasi() {
  const [formVerileri] = useState(IC_DIS_SAHA_VERILERI);

  const getKutuStili = (harf) => {
    const anaStil = {
      textAlign: 'center', fontWeight: 'bold', borderRadius: '2px',
      border: '1px solid #cbd5e1', textTransform: 'uppercase', fontFamily: ICERIK_FONTU,
      display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none'
    };
    if (harf === 'G' || harf === 'g') return { ...anaStil, backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#166534' };
    if (harf === 'M' || harf === 'm') return { ...anaStil, backgroundColor: '#ef4444', color: '#ffffff', borderColor: '#dc2626' };
    if (harf === 'B' || harf === 'b') return { ...anaStil, backgroundColor: '#94a3b8', color: '#ffffff', borderColor: '#475569' };
    return { ...anaStil, backgroundColor: '#ffffff', color: '#e2e8f0' };
  };

  const kutuAraligiOluştur = (takim, tip, adet) => {
    const metin = formVerileri[takim]?.[tip] || '';
    const kutular = [];
    for (let i = 0; i < adet; i++) {
      const karakter = metin[i] || ' ';
      kutular.push(
        <div key={i} style={{ display: 'flex', gap: '3px' }}>
          <div style={getKutuStili(karakter)} className="w-4 h-4 lg:w-5 lg:h-5 text-[9px] lg:text-[11px]">
            {karakter.trim()}
          </div>
        </div>
      );
    }
    return <div style={{ display: 'flex', gap: '3px' }}>{kutular}</div>;
  };
const renderFormSatiri = (takim) => {
    return (
      <div key={takim} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9', gap: '4px' }}>
        <div className="text-[14px] lg:text-[16px] font-bold text-slate-800" style={{ fontFamily: ICERIK_FONTU, whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6" style={{ paddingLeft: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', color: '#94a3b8', width: '38px', fontWeight: 'bold' }}>İç Saha:</span>
            {kutuAraligiOluştur(takim, 'icSaha', 17)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', color: '#94a3b8', width: '38px', fontWeight: 'bold' }}>Depl:</span>
            {kutuAraligiOluştur(takim, 'disSaha', 17)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="icdis" />

        {/* 🎯 SEO & ADSENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig İç Saha ve Deplasman Form Durumu
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
          <strong>Süper Lig Saha Farklılık Notu:</strong> Süper Lig takımlarının kendi evlerindeki oyununu ve varsa deplasmandaki farkını bu alandan karşılaştırmalı olarak analiz edebilirsiniz. Yüksek puan için kadro düzeltmesi adına buradaki verilerden yararlanabilirsiniz.
        </div>

        {/* 🔄 MOBİL GEÇİŞ KÖPRÜSÜ - TAM ORTALANMIŞ VE SABİT STANDART */}
        <div className="flex lg:hidden justify-center items-center gap-2 mb-4 w-full">
          <Link href="/form-durumu" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '5px 14px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#475569',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #e2e8f0',
            display: 'inline-block',
            WebkitTapHighlightColor: 'transparent'
          }}>
            Genel Form
          </Link>
          <Link href="/ic-dis-saha" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '5px 14px',
            borderRadius: '12px',
            backgroundColor: '#1e40af',
            color: '#ffffff',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #1d4ed8',
            display: 'inline-block',
            WebkitTapHighlightColor: 'transparent'
          }}>
            İç-Dış Saha Form
          </Link>
        </div>
        
        {/* ℹ️ Minimalist harf açıklamaları */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          border: '1px solid #cbd5e1', 
          borderRadius: '6px', 
          padding: '8px 12px', 
          color: '#64748b', 
          fontSize: '11px', 
          fontFamily: ICERIK_FONTU, 
          textAlign: 'center', 
          marginBottom: '20px', 
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          <span style={{ color: '#16a34a' }}>G: Galibiyet</span> | <span style={{ color: '#475569', marginLeft: '4px' }}>B: Beraberlik</span> | <span style={{ color: '#dc2626', marginLeft: '4px' }}>M: Mağlubiyet</span>
        </div>
        
        {/* 🚀 ÜST GRUP (0'dan 8. takıma kadar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderFormSatiri(takim))}
        </div>
        
        {/* 🚀 ALT GRUP (8. takımdan sonrasına kadar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderFormSatiri(takim))}
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
            Süper Lig İç Saha ve Deplasman Form Grafiklerinin Karşılaştırmalı Analizi
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut İç Saha ve Deplasman form durumu sayfasında, Süper Lig ekiplerinin kendi evlerindeki baskın performansları ile dış sahadaki zorlu mücadele serilerini ayrı ayrı inceleyebilirsiniz. Takımların taraftar avantajıyla kazandığı galibiyet serileri veya deplasman fobileri, fantezi futbol kadrolarında defans, orta saha ve forvet tercihi yaparken en stratejik faktörlerdendir. İlk 11 ve yedekleri planlamadan önce analiz etmeniz önerilir. Amed SF, Samsunspor'u yenerek ilk deplasman galibiyetini aldı. Amed SF, Beşiktaş ve Trabzonspor içerde puan kaybetmedi. Eyüpspor'un deplasmanda henüz puanı bulunmuyor.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
