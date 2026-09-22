'use client';
import { useState } from 'react';
import { Navbar, Header, ICERIK_FONTU } from '../utils';

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
      <div style={{ width: '100%', height: h, backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0' }}>
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
      
      <Header baslik="Süper Lig Form Durumu" />
      <div style={{ textAlign: 'center', marginTop: '-10px', marginBottom: '15px' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem', fontFamily: ICERIK_FONTU, margin: '0 auto', fontWeight: 'bold' }}>
          (G: Galibiyet | B: Beraberlik | M: Mağlubiyet)
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="form" />

        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(0, 9).map((takim) => renderFormSatiri(takim))}
        </div>
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {SUPER_LIG_TAKIMLARI.slice(9).map((takim) => renderFormSatiri(takim))}
        </div>
        {renderReklamAlani('ince')}
      </div>
    </div>
  );
}
