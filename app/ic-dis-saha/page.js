'use client';

import { useState } from 'react';
import Link from 'next/link';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const IC_DIS_SAHA_VERILERI = {
  "Alanyaspor": { icSaha: "GB", disSaha: "BMG" }, 
  "Amed Sportif Faaliyetler": { icSaha: "GGG", disSaha: "MB" }, "Başakşehir": { icSaha: "GBM", disSaha: "MM" }, "Beşiktaş": { icSaha: "GGG", disSaha: "MG" }, "Çorum FK": { icSaha: "MG", disSaha: "BMG" }, "Erzurumspor FK": { icSaha: "MG", disSaha: "MBM" }, "Eyüpspor": { icSaha: "MGM", disSaha: "MM" }, "Fenerbahçe": { icSaha: "GM", disSaha: "MGB" }, "Galatasaray": { icSaha: "BGG", disSaha: "GG" }, "Gaziantep FK": { icSaha: "BMB", disSaha: "GG" }, "Gençlerbirliği": { icSaha: "GBM", disSaha: "GM" }, "Göztepe": { icSaha: "MM", disSaha: "BMB" }, "Kasımpaşa": { icSaha: "BB", disSaha: "GBG" }, "Kocaelispor": { icSaha: "GG", disSaha: "MGM" }, "Konyaspor": { icSaha: "MMG", disSaha: "MM" }, "Rizespor": { icSaha: "MM", disSaha: "GGG" }, "Samsunspor": { icSaha: "BMM", disSaha: "GM" }, "Trabzonspor": { icSaha: "GG", disSaha: "BMM" }
};

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function IcDisSahaSayfasi() {
  const [formVerileri] = useState(IC_DIS_SAHA_VERILERI);

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

  const kutuAraligiOluştur = (takim, tip, adet) => {
    const metin = formVerileri[takim]?.[tip] || '';
    const kutular = [];
    for (let i = 0; i < adet; i++) {
      const karakter = metin[i] || ' ';
      kutular.push(<div key={i} style={getKutuStili(karakter)}>{karakter.trim()}</div>);
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

  const renderIcDisSatiri = (takim) => {
    return (
      <div key={takim} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', gap: '6px' }}>
        <div style={{ fontSize: '0.95rem', color: '#1e293b', fontFamily: ICERIK_FONTU, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          {takim}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '2px' }}>
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
      
      {/* BAŞLIK ALANI */}
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#132444', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU, marginBottom: '4px' }}>İç - Dış Saha Form Durumu</p>
      </div>

      {/* 🎯 KAPSAYICI KUTU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* 📱 İÇ-DIŞ SAHA FORM SAYFASI İÇİN 3 SATIRLI PİRAMİT MENÜ */}
<div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
  {/* 1. Satır: 4 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/" style={getBtn('eksik', false)}>Eksik Listesi</Link>
    <Link href="/haftanin-yildizlari" style={{ ...getBtn('yildizlar', false), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: '#fbcfe8' }}>En İyiler</Link>
    <Link href="/haftanin-analizi" style={{ ...getBtn('analiz', false), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>Tüyolar</Link>
    <Link href="/puan-durumu" style={getBtn('puan', false)}>Puan Durumu</Link>
  </div>
  {/* 2. Satır: 3 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/kralliklar" style={getBtn('krallik', false)}>Gol & Asist</Link>
    <Link href="/form-durumu" style={getBtn('form', false)}>Form Durumu</Link>
    <Link href="/ic-dis-saha" style={getBtn('icdis', true)}>İç-Dış Saha Form</Link>
  </div>
  {/* 3. Satır: 2 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Link href="/fikstur-ilk-yari" style={{ ...getBtn('fiksturl', false), backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>Fikstür 1. Yarı</Link>
    <Link href="/fikstur-ikinci-yari" style={getBtn('fikstur2', false)}>Fikstür 2. Yarı</Link>
  </div>
</div>


        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderIcDisSatiri(takim))}
        </div>
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderIcDisSatiri(takim))}
        </div>
        {renderReklamAlani('ince')}

      </div>
    </div>
  );
}
