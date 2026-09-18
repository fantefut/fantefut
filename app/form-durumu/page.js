'use client';

import { useState } from 'react';
import Link from 'next/link';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const FORM_VERILERI = {
  "Alanyaspor": "BGMGB", "Amed Sportif Faaliyetler": "GMGBG", "Başakşehir": "GMBMM", "Beşiktaş": "GMGGG", "Çorum FK": "BMMGG", 
  "Erzurumspor FK": "MMBGM", "Eyüpspor": "MMGMM", "Fenerbahçe": "MGGMB", "Galatasaray": "BGGGG", "Gaziantep FK": "BGMGB", 
  "Gençlerbirliği": "GGBMM", "Göztepe": "BMMMB", "Kasımpaşa": "BGBBG", "Kocaelispor": "MGGGM", "Konyaspor": "MMMMG", 
  "Rizespor": "GMGMG", "Samsunspor": "BGMMM", "Trabzonspor": "BGMGM"
};

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function FormDurumuSayfasi() {
  const [formVerileri] = useState(FORM_VERILERI);

  const getKutuStili = (harf) => {
    const anaStil = {
      width: '16px', height: '16px', textAlign: 'center', fontWeight: 'bold', borderRadius: '2px',
      border: '1px solid #cbd5e1', fontSize: '9px', textTransform: 'uppercase', fontFamily: ICERIK_FONTU,
      display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none'
    };
    if (harf === 'G' || harf === 'g') return { ...anaStil, backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#16a34a' };
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

  const getMenuButonStili = (sayfa, aktifMi) => {
    const tabanStil = {
      textDecoration: 'none', fontSize: '11px', fontWeight: aktifMi ? 'bold' : '500', fontFamily: ICERIK_FONTU,
      padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)', whiteSpace: 'nowrap'
    };
    if (sayfa === 'eksik') return { ...tabanStil, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: aktifMi ? '#1e40af' : '#dbeafe' };
    if (sayfa === 'form') return { ...tabanStil, backgroundColor: '#f0fdf4', color: '#166534', borderColor: aktifMi ? '#166534' : '#dcfce7' };
    if (sayfa === 'icdis') return { ...tabanStil, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: aktifMi ? '#9a3412' : '#ffedd5' };
    if (sayfa === 'fikstur1') return { ...tabanStil, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: aktifMi ? '#6b21a8' : '#f3e8ff' };
    if (sayfa === 'fikstur2') return { ...tabanStil, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: aktifMi ? '#9d174d' : '#fce7f3' };
    if (sayfa === 'puan') return { ...tabanStil, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: aktifMi ? '#115e59' : '#ccfbf1' };
    if (sayfa === 'krallik') return { ...tabanStil, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: aktifMi ? '#9f1239' : '#ffe4e6' };
    if (sayfa === 'yildiz') return { ...tabanStil, backgroundColor: '#fef3c7', color: '#92400e', borderColor: aktifMi ? '#92400e' : '#fef3c7' };
    return { ...tabanStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktifMi ? '#9f1239' : '#fecdd3' };
  };

  'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const FORM_VERILERI = {
  "Alanyaspor": "BGMGB", "Amed Sportif Faaliyetler": "GMGBG", "Başakşehir": "GMBMM", "Beşiktaş": "GMGGG", "Çorum FK": "BMMGG", 
  "Erzurumspor FK": "MMBGM", "Eyüpspor": "MMGMM", "Fenerbahçe": "MGGMB", "Galatasaray": "BGGGG", "Gaziantep FK": "BGMGB", 
  "Gençlerbirliği": "GGBMM", "Göztepe": "BMMMB", "Kasımpaşa": "BGBBG", "Kocaelispor": "MGGGM", "Konyaspor": "MMMMG", 
  "Rizespor": "GMGMG", "Samsunspor": "BGMMM", "Trabzonspor": "BGMGM"
};

export default function FormDurumuSayfasi() {
  const [formVerileri] = useState(FORM_VERILERI);

  const getKutuStili = (harf) => {
    const anaStil = {
      width: '16px', height: '16px', textAlign: 'center', fontWeight: 'bold', borderRadius: '2px',
      border: '1px solid #cbd5e1', fontSize: '9px', textTransform: 'uppercase', fontFamily: ICERIK_FONTU,
      display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none'
    };
    if (harf === 'G' || harf === 'g') return { ...anaStil, backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#16a34a' };
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

  const renderReklamAlani = (boyutTip) => {
    const h = boyutTip === 'ince' ? '60px' : '110px';
    const text = boyutTip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -';
    return (
      <div style={{ 
        width: '100%', height: h, backgroundColor: '#f8fafc', borderRadius: '8px', 
        border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0'
      }}>
        {text}
      </div>
    );
  };

  const renderFormSatiri = (takim) => {
    return (
      <div key={takim} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', gap: '6px' }}>
        <div style={{ fontSize: '0.95rem', color: '#1e293b', fontFamily: ICERIK_FONTU, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '2px' }}>
          {kutuAraligiOluştur(takim, 0, 17)}
          {kutuAraligiOluştur(takim, 17, 17)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* BAŞLIK ALANI */}
      <div style={{ width: '100%', padding: '15px 0 5px 0', textAlign: 'center', marginBottom: '10px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0', color: '#132444', fontFamily: BAŞLIK_FONTU, letterSpacing: '1px' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU, marginBottom: '4px' }}>Süper Lig</p>
        <p style={{ color: '#64748b', fontSize: '0.9rem', fontFamily: ICERIK_FONTU, margin: '0 auto', maxWidth: '320px', lineHeight: '1.3' }}>
          (G: Galibiyet B: Beraberlik M: Mağlubiyet)
        </p>
      </div>

      {/* 🎯 KAPSAYICI KUTU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Form Durumu aktif) */}
        <Navbar aktifSayfa="form" />

        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderFormSatiri(takim))}
        </div>
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderFormSatiri(takim))}
        </div>
        {renderReklamAlani('ince')}

      </div>
    </div>
  );
}
