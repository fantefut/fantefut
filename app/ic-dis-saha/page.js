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

const IC_DIS_SAHA_VERILERI = {
  "Alanyaspor": { icSaha: "GB", disSaha: "BMGG" }, 
  "Amed Sportif Faaliyetler": { icSaha: "GGGG", disSaha: "MB" }, 
  "Başakşehir": { icSaha: "GBMG", disSaha: "MM" }, 
  "Beşiktaş": { icSaha: "GGG", disSaha: "MGM" }, 
  "Çorum FK": { icSaha: "MGM", disSaha: "BMG" }, 
  "Erzurumspor FK": { icSaha: "MGG", disSaha: "MBM" }, 
  "Eyüpspor": { icSaha: "MGM", disSaha: "MMM" }, 
  "Fenerbahçe": { icSaha: "GMG", disSaha: "MGB" }, 
  "Galatasaray": { icSaha: "BGG", disSaha: "GGM" }, 
  "Gaziantep FK": { icSaha: "BMB", disSaha: "GGM" }, 
  "Gençlerbirliği": { icSaha: "GBM", disSaha: "GMM" }, 
  "Göztepe": { icSaha: "MMB", disSaha: "BMB" }, 
  "Kasımpaşa": { icSaha: "BBB", disSaha: "GBG" }, 
  "Kocaelispor": { icSaha: "GGG", disSaha: "MGM" }, 
  "Konyaspor": { icSaha: "MMG", disSaha: "MMB" }, 
  "Rizespor": { icSaha: "MM", disSaha: "GGGB" }, 
  "Samsunspor": { icSaha: "BMM", disSaha: "GMM" }, 
  "Trabzonspor": { icSaha: "GGG", disSaha: "BMM" }
};

export default function IcDisSahaSayfasi() {
  const [formVerileri] = useState(IC_DIS_SAHA_VERILERI);

  const getKutuStili = (harf) => {
    const anaStil = {
      textAlign: 'center', fontWeight: 'bold', borderRadius: '2px',
      border: '1px solid #cbd5e1', textTransform: 'uppercase', fontFamily: ICERIK_FONTU,
      display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none'
    };
    if (harf === 'G' || harf === 'g') return { ...anaStil, backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#16a34a' };
    if (harf === 'M' || harf === 'm') return { ...anaStil, backgroundColor: '#ef4444', color: '#ffffff', borderColor: '#dc2626' };
    if (harf === 'B' || harf === 'b') return { ...anaStil, backgroundColor: '#94a3b8', color: '#ffffff', borderColor: '#475569' };
    return { ...anaStil, backgroundColor: '#ffffff', color: '#e2e8f0' };
  };

  const kutuAraligiOluştur = (takim, tip, adet) => {
    const metin = formVerileri[takim]?.[tip] || '';
    const kutular = [];
    for (let i = 0; i < adet; i++) {
      const karakter = metin[i] || ' ';
      // Mobilde w-4 h-4 (16px), masaüstünde lg:w-5 lg:h-5 (20px) büyüklük atandı
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
        {/* Takım İsmi: Mobilde 14px, masaüstünde lg:text-[16px] seviyesine büyür */}
        <div className="text-[14px] lg:text-[16px] font-bold text-slate-800" style={{ fontFamily: ICERIK_FONTU, whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        {/* 
          lg:flex-row kuralı: 
          Mobilde iki grubu alt alta basar (flex-col), 
          Masaüstünde ise İç Saha ve Deplasman bloklarını yan yana tek sıra halinde bağlar!
        */}
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
      
      {/* 🚀 Yenilenmiş, milimetrik eşitlenen merkezi Header bileşenimiz */}
      <Header altBaslik="Süper Lig İç Saha - Deplasman İstatistikleri" />

      {/* 
        Tailwind v4 tabanlı responsive genişletme sarmalayıcısı:
        - Mobilde max-w-[650px] sınırıyla eski dar ve güvenli yapıyı korur.
        - Masaüstünde (lg:) max-w-[1024px] seviyesine açılarak form satırlarını ve reklamları genişletir.
      */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni */}
        <Navbar aktifSayfa="icdis" />

        {/* Üst Reklam Alanı */}
        {renderReklamAlani('buyuk')}
        
        {/* ℹ️ İstediğiniz Değişiklik: Kılavuz kutusu ilk reklamın altına, Alanyaspor'un tam üstüne eklendi */}
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
