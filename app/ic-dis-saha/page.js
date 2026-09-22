'use client';
import { useState } from 'react';
import { Navbar, Header, ICERIK_FONTU } from '../utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const IC_DIS_SAHA_VERILERI = {
  "Alanyaspor": { icSaha: "GB", disSaha: "BMG" }, 
  "Amed Sportif Faaliyetler": { icSaha: "GGG", disSaha: "MB" }, 
  "Başakşehir": { icSaha: "GBM", disSaha: "MM" }, 
  "Beşiktaş": { icSaha: "GGG", disSaha: "MG" }, 
  "Çorum FK": { icSaha: "MG", disSaha: "BMG" }, 
  "Erzurumspor FK": { icSaha: "MG", disSaha: "MBM" }, 
  "Eyüpspor": { icSaha: "MGM", disSaha: "MM" }, 
  "Fenerbahçe": { icSaha: "GM", disSaha: "MGB" }, 
  "Galatasaray": { icSaha: "BGG", disSaha: "GG" }, 
  "Gaziantep FK": { icSaha: "BMB", disSaha: "GG" }, 
  "Gençlerbirliği": { icSaha: "GBM", disSaha: "GM" }, 
  "Göztepe": { icSaha: "MM", disSaha: "BMB" }, 
  "Kasımpaşa": { icSaha: "BB", disSaha: "GBG" }, 
  "Kocaelispor": { icSaha: "GG", disSaha: "MGM" }, 
  "Konyaspor": { icSaha: "MMG", disSaha: "MM" }, 
  "Rizespor": { icSaha: "MM", disSaha: "GGG" }, 
  "Samsunspor": { icSaha: "BMM", disSaha: "GM" }, 
  "Trabzonspor": { icSaha: "GG", disSaha: "BMM" }
};

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

  const renderReklamAlani = (boyutTip) => {
    const h = boyutTip === 'ince' ? '60px' : '110px';
    const text = boyutTip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -';
    return (
      <div style={{ width: '100%', height: h, backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0' }}>
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
      
      <Header baslik="Süper Lig İç Saha - Deplasman İstatistikleri" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="icdis" />

        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 9).map((takim) => renderIcDisSatiri(takim))}
        </div>
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(9).map((takim) => renderIcDisSatiri(takim))}
        </div>
        {renderReklamAlani('ince')}
      </div>
    </div>
  );
}
