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
      // Mobilde w-4 h-4 (16px) kalır, masaüstünde lg:w-5 lg:h-5 (20px) boyutuna büyür!
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

  const renderReklamAlani = (boyutTip) => {
    const isAltSerit = boyutTip === 'ince';
    return (
      <div style={{
        width: '100%',
        minHeight: isAltSerit ? '50px' : '90px',
        maxHeight: isAltSerit ? '100px' : '280px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '15px auto',
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
        {/* Takım ismi: Mobilde 14px kalır, masaüstünde lg:text-[16px] seviyesine büyür */}
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
        
        {/* ℹ️ İstediğiniz Değişiklik: Kaba başlık silindi, sadece minimalist harf açıklamaları bırakıldı! */}
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
