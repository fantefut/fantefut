'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const FORM_VERILERI = {
  "Alanyaspor": "BGMGBG", "Amed Sportif Faaliyetler": "GMGBGGB", "Başakşehir": "GMBMMG", "Beşiktaş": "GMGGGM", "Çorum FK": "BMMGGM", 
  "Erzurumspor FK": "MMBGMG", "Eyüpspor": "MMGMMM", "Fenerbahçe": "MGGMBG", "Galatasaray": "BGGGGMG", "Gaziantep FK": "BGMGBM", 
  "Gençlerbirliği": "GGBMMMB", "Göztepe": "BMMMBB", "Kasımpaşa": "BGBBGBM", "Kocaelispor": "MGGGMG", "Konyaspor": "MMMMGB", 
  "Rizespor": "GMGMGB", "Samsunspor": "BGMMMM", "Trabzonspor": "BGMGMG"
};

export default function FormDurumuSayfasi() {
  const [formVerileri] = useState(FORM_VERILERI);

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

  const kutuAraligiOluştur = (takim, baslangicIndex, adet) => {
    const metin = formVerileri[takim] || '';
    const kutular = [];
    for (let i = 0; i < adet; i++) {
      const gecerliIndex = baslangicIndex + i;
      const karakter = metin[gecerliIndex] || ' ';
      kutular.push(
        <div key={gecerliIndex} style={{ display: 'flex', gap: '3px' }}>
          <div style={getKutuStili(karakter)} className="w-4 h-4 lg:w-5 lg:h-5 text-[9px] lg:text-[11px]">
            {karakter.trim()}
          </div>
        </div>
      );
    }
    return <div style={{ display: 'flex', gap: '3px' }}>{kutular}</div>;
  };

  // 🛡️ CLS Korumalı ve Taşma Engelli Standart Reklam Render Fonksiyonu
  const renderReklamAlani = (marginTop, marginBottom) => {
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
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          - Reklam Alanı (Google AdSense) -
        </span>
      </div>
    );
  };

  const renderFormSatiri = (takim) => {
    return (
      <div key={takim} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9', gap: '4px' }}>
        <div className="text-[14px] lg:text-[16px] font-bold text-slate-800" style={{ fontFamily: ICERIK_FONTU, whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-1.5" style={{ paddingLeft: '2px' }}>
          {kutuAraligiOluştur(takim, 0, 17)}
          {kutuAraligiOluştur(takim, 17, 17)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 TS hatasını önlemek için boş string kuralına sadık kalındı */}
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni */}
        <Navbar aktifSayfa="form" />

        {/* 🎯 SEO & ADASENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Genel Form Durumu
          </h1>
        </div>

        {/* 💰 1. ÜST REKLAM ALANI - H1 Altında Kesin Kurallı Yerleşim (Üst: 16px, Alt: 24px) */}
        {renderReklamAlani('16px', '24px')}

        {/* 🔄 AKILLI MOBİL GEÇİŞ KÖPRÜSÜ (Alt Sekme Kırılımı):
            Mobilde koyu kararmaları önlemek için WebkitTapHighlightColor temizlendi, renk tonları butonlara uyumlu hale getirildi */}
        <div className="flex lg:hidden justify-center gap-2 mb-4">
          <Link href="/form-durumu" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 12px',
            borderRadius: '12px',
            backgroundColor: '#22c55e',
            color: '#ffffff',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #166534',
            WebkitTapHighlightColor: 'transparent'
          }}>
            Genel Form
          </Link>
          <Link href="/ic-dis-saha" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 12px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#dc2626',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #f1f5f9',
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
        
        {/* 💰 2. ORTA REKLAM ALANI - Takımlar Arası Kesin Kurallı Yerleşim (Üst: 24px, Alt: 24px) */}
        {renderReklamAlani('24px', '24px')}
        
        {/* 🚀 ALT GRUP (8. takımdan sonrasına kadar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderFormSatiri(takim))}
        </div>

        {/* 🚀 GOOGLE BOT DOSTU ZENGİN SEO AÇIKLAMA METNİ (Thin Content Önleyici) */}
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
            Süper Lig Takımlarının Güncel Form Durumları Analizi
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut Süper Lig form durumu sayfasında, takımların son haftalarda sergiledikleri galibiyet (G), beraberlik (B) ve mağlubiyet (M) serilerini anlık olarak takip edebilirsiniz. Fantezi futbol kadrolarınızı kurarken ve haftalık transfer tercihlerinizi yaparken takımların genel form grafiklerini incelemek, en doğru oyuncuları seçmenize yardımcı olur. Takımların iç saha ve dış saha performans farklılıkları için menüden ilgili sekmeyi ziyaret edebilirsiniz. Kasımpaşa ilk mağlubiyetini aldı.
          </p>
        </div>

        {/* ℹ️ Not: Eski Alt Reklam Alanı AdSense Otomatik Sistemine Bırakılarak Tamamen Temizlendi */}

        {/* Merkezi ve Sadeleştirilmiş Yeni Otomatik Footer Sistemi */}
        <Footer />
      </div>
    </div>
  );
}
