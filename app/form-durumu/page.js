'use client';
import { useState } from 'react';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, ICERIK_FONTU } from '../utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const FORM_VERILERI = {
  "Alanyaspor": "BGMGBG", "Amed Sportif Faaliyetler": "GMGBGG", "Başakşehir": "GMBMMG", "Beşiktaş": "GMGGGM", "Çorum FK": "BMMGGM", 
  "Erzurumspor FK": "MMBGMG", "Eyüpspor": "MMGMMM", "Fenerbahçe": "MGGMBG", "Galatasaray": "BGGGGM", "Gaziantep FK": "BGMGBM", 
  "Gençlerbirliği": "GGBMMM", "Göztepe": "BMMMBB", "Kasımpaşa": "BGBBGB", "Kocaelispor": "MGGGMG", "Konyaspor": "MMMMGB", 
  "Rizespor": "GMGMGB", "Samsunspor": "BGMMMM", "Trabzonspor": "BGMGMG"
};

export default function FormDurumuSayfasi() {
  const [formVerileri] = useState(FORM_VERILERI);

  const getKutuStili = (harf) => {
    const anaStil = {
      width: '16px', height: '16px', textAlign: 'center', fontWeight: 'bold', borderRadius: '2px',
      border: '1px solid #cbd5e1', fontSize: '9px', textTransform: 'uppercase', fontFamily: ICERIK_FONTU,
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
      kutular.push(<div key={gecerliIndex} style={{ display: 'flex', gap: '3px' }}><div style={getKutuStili(karakter)}>{karakter.trim()}</div></div>);
    }
    return <div style={{ display: 'flex', gap: '3px' }}>{kutular}</div>;
  };

  // 🎯 YENİ RESPONSIVE REKLAM MOTORU: Mobil ve Laptop uyumlu esnek kapsayıcı
  const renderReklamAlani = (boyutTip) => {
    const isAltSerit = boyutTip === 'ince';
    return (
      <div style={{
        width: '100%',
        minHeight: isAltSerit ? '50px' : '90px', // Reklam yüklenene kadar alan çökmesini engeller
        maxHeight: isAltSerit ? '100px' : '280px', // Mobilde kare/dikdörtgen reklamların taşmasını önler
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '15px auto', // Sayfada milimetrik ortalanması sağlandı
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          {isAltSerit ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
        </span>
      </div>
    );
  };

  const renderFormSatiri = (takim) => {
    return (
      <div key={takim} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', gap: '6px' }}>
        {/* Takım isimleri 1 tık dolgunlaştırıldı */}
        <div style={{ fontSize: '14px', color: '#1e293b', fontFamily: ICERIK_FONTU, fontWeight: '700', whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        {/* 
          lg:flex-row kuralı eklendi: 
          Mobilde iki satırı alt alta basar (flex-col), 
          Masaüstünde ise ara katmanı eritip tek bir düz sıra halinde yan yana dizilmesini sağlar!
        */}
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-1.5" style={{ paddingLeft: '2px' }}>
          {kutuAraligiOluştur(takim, 0, 17)}
          {kutuAraligiOluştur(takim, 17, 17)}
        </div>
      </div>
    );
  };
  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🚀 Yenilenmiş, milimetrik eşitlenen merkezi Header bileşenimiz */}
      <Header altBaslik="Süper Lig Form Durumu" />

      {/* 
        Tailwind v4 tabanlı responsive genişletme sarmalayıcısı:
        - Mobilde max-w-[650px] sınırıyla eski dar ve güvenli yapıyı korur.
        - Masaüstünde (lg:) max-w-[1024px] seviyesine açılarak form satırlarını ve reklamları genişletir.
      */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni */}
        <Navbar aktifSayfa="form" />

        {/* Üst Reklam Alanı */}
        {renderReklamAlani('buyuk')}
        
        {/* ℹ️ İstediğiniz Değişiklik: Form Açıklama Kılavuzu ilk reklamın altına, Alanyaspor'un tam üstüne taşındı! */}
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
          letterSpacing: '0.3px'
        }}>
          🎯 Form Gösterge Kılavuzu: <span style={{ color: '#16a34a', marginLeft: '4px' }}>G: Galibiyet</span> | <span style={{ color: '#475569', marginLeft: '4px' }}>B: Beraberlik</span> | <span style={{ color: '#dc2626', marginLeft: '4px' }}>M: Mağlubiyet</span>
        </div>
        
        {/* 🚀 FENERBAHÇE DAHİL ÜST GRUP (0'dan 8. takıma kadar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderFormSatiri(takim))}
        </div>
        
        {/* 💰 TAM FENERBAHÇE ALTI - GALATASARAY ÜSTÜ REKLAM ALANI */}
        {renderReklamAlani('buyuk')}
        
        {/* 🚀 GALATASARAY DAHİL ALT GRUP (8. takımdan sonrasına kadar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderFormSatiri(takim))}
        </div>
        
        {renderReklamAlani('ince')}

        {/* Merkezi ve Sadeleştirilmiş Yeni Otomatik Footer Sistemi */}
        <Footer />
      </div>
    </div>
  );
}
