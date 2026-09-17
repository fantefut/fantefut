'use client';
import { useState } from 'react';
import Link from 'next/link';

const DATA = {
  "18. Hafta": ["Göztepe - Samsun", "Eyüp - Beşiktaş", "Fenerbahçe - Gençlerbirliği", "Alanya - Gaziantep", "Rize - Konya", "Trabzon - Kasımpaşa", "Erzurum - Amed", "Kocaeli - Başakşehir", "Çorum - Galatasaray"],
  "19. Hafta": ["Samsun - Rize", "Kasımpaşa - Çorum", "Galatasaray - Erzurum", "Göztepe - Gençlerbirliği", "Beşiktaş - Alanya", "Gaziantep - Eyüp", "Fenerbahçe - Konya", "Başakşehir - Trabzon", "Kocaeli - Amed"],
  "20. Hafta": ["Erzurum - Gençlerbirliği", "Rize - Gaziantep", "Göztepe - Galatasaray", "Kocaeli - Konya", "Alanya - Eyüp", "Kasımpaşa - Başakşehir", "Fenerbahçe - Samsun", "Trabzon - Amed", "Çorum - Beşiktaş"],
  "21. Hafta": ["Galatasaray - Başakşehir", "Alanya - Rize", "Konya - Erzurum", "Eyüp - Çorum", "Gaziantep - Göztepe", "Amed - Kasımpaşa", "Beşiktaş - Fenerbahçe", "Gençlerbirliği - Trabzon", "Samsun - Kocaeli"],
  "22. Hafta": ["Erzurum - Beşiktaş", "Rize - Eyüp", "Göztepe - Alanya", "Trabzon - Konya", "Kasımpaşa - Gençlerbirliği", "Başakşehir - Amed", "Kocaeli - Galatasaray", "Çorum - Samsun", "Fenerbahçe - Gaziantep"],
  "23. Hafta": ["Konya - Kasımpaşa", "Galatasaray - Trabzon", "Gençlerbirliği - Başakşehir", "Gaziantep - Kocaeli", "Alanya - Çorum", "Rize - Göztepe", "Eyüp - Fenerbahçe", "Beşiktaş - Amed", "Samsun - Erzurum"],
  "24. Hafta": ["Kasımpaşa - Galatasaray", "Amed - Gençlerbirliği", "Erzurum - Alanya", "Trabzon - Samsun", "Fenerbahçe - Rize", "Çorum - Gaziantep", "Başakşehir - Konya", "Kocaeli - Beşiktaş", "Göztepe - Eyüp"],
  "25. Hafta": ["Rize - Çorum", "Alanya - Fenerbahçe", "Eyüp - Erzurum", "Galatasaray - Gençlerbirliği", "Konya - Amed", "Samsun - Kasımpaşa", "Göztepe - Kocaeli", "Gaziantep - Başakşehir", "Beşiktaş - Trabzon"],
  "26. Hafta": ["Kocaeli - Alanya", "Amed - Samsun", "Kasımpaşa - Eyüp", "Fenerbahçe - Galatasaray", "Gençlerbirliği - Konya", "Çorum - Göztepe", "Erzurum - Gaziantep", "Rize - Trabzon", "Başakşehir - Beşiktaş"],
  "27. Hafta": ["Galatasaray - Konya", "Rize - Kocaeli", "Çorum - Erzurum", "Göztepe - Fenerbahçe", "Gaziantep - Trabzon", "Eyüp - Amed", "Samsun - Başakşehir", "Beşiktaş - Kasımpaşa", "Alanya - Gençlerbirliği"],
  "28. Hafta": ["Kasımpaşa - Gaziantep", "Amed - Galatasaray", "Başakşehir - Göztepe", "Konya - Samsun", "Kocaeli - Eyüp", "Gençlerbirliği - Beşiktaş", "Fenerbahçe - Çorum", "Trabzon - Alanya", "Erzurum - Rize"],
  "29. Hafta": ["Rize - Amed", "Gaziantep - Gençlerbirliği", "Samsun - Galatasaray", "Fenerbahçe - Kocaeli", "Beşiktaş - Konya", "Eyüp - Trabzon", "Göztepe - Erzurum", "Alanya - Kasımpaşa", "Çorum - Başakşehir"],
  "30. Hafta": ["Gençlerbirliği - Samsun", "Galatasaray - Beşiktaş", "Erzurum - Fenerbahçe", "Başakşehir - Eyüp", "Konya - Alanya", "Trabzon - Göztepe", "Amed - Gaziantep", "Kocaeli - Çorum", "Kasımpaşa - Rize"],
  "31. Hafta": ["Fenerbahçe - Başakşehir", "Kocaeli - Erzurum", "Alanya - Amed", "Göztepe - Kasımpaşa", "Eyüp - Gençlerbirliği", "Gaziantep - Konya", "Rize - Galatasaray", "Samsun - Beşiktaş", "Çorum - Trabzon"],
  "32. Hafta": ["Trabzon - Fenerbahçe", "Galatasaray - Eyüp", "Samsun - Alanya", "Konya - Göztepe", "Kasımpaşa - Erzurum", "Amed - Çorum", "Başakşehir - Rize", "Beşiktaş - Gaziantep", "Gençlerbirliği - Kocaeli"],
  "33. Hafta": ["Erzurum - Başakşehir", "Göztepe - Amed", "Fenerbahçe - Kasımpaşa", "Çorum - Gençlerbirliği", "Alanya - Galatasaray", "Eyüp - Konya", "Rize - Beşiktaş", "Kocaeli - Trabzon", "Gaziantep - Samsun"],
  "34. Hafta": ["Amed - Fenerbahçe", "Samsun - Eyüp", "Beşiktaş - Göztepe", "Galatasaray - Gaziantep", "Gençlerbirliği - Rize", "Konya - Çorum", "Trabzon - Erzurum", "Kasımpaşa - Kocaeli", "Başakşehir - Alanya"]
};

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function FiksturIkinciYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

  const getBtn = (s, akt) => {
    const b = { textDecoration: 'none', fontSize: '11px', fontWeight: akt ? 'bold' : '500', fontFamily: ICERIK_FONTU, padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', whiteSpace: 'nowrap' };
    if (s === 'eksik') return { ...b, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: akt ? '#1e40af' : '#dbeafe' };
    if (s === 'form') return { ...b, backgroundColor: '#f0fdf4', color: '#166534', borderColor: akt ? '#166534' : '#dcfce7' };
    if (s === 'icdis') return { ...b, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: akt ? '#9a3412' : '#ffedd5' };
    if (s === 'fikstur1') return { ...b, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: akt ? '#6b21a8' : '#f3e8ff' };
    if (s === 'fikstur2') return { ...b, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: akt ? '#9d174d' : '#fce7f3' };
    if (s === 'puan') return { ...b, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: akt ? '#115e59' : '#ccfbf1' };
    if (s === 'krallik') return { ...b, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: akt ? '#9f1239' : '#ffe4e6' };
    if (s === 'yildiz') return { ...b, backgroundColor: '#fef3c7', color: '#92400e', borderColor: akt ? '#92400e' : '#fef3c7' };
    return { ...b, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: akt ? '#9f1239' : '#fecdd3' };
  };

  const renderRek = (tip) => (
    <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
      {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

  const renderHafta = (h) => (
    <div key={h} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#132444', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 'bold' }}>{h}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {formVerileri[h].map((m, i) => (
          <div key={i} style={{ fontSize: '0.88rem', color: '#334155', padding: '2px 0', borderBottom: i !== 8 ? '1px dashed #e2e8f0' : 'none' }}>{m}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#64748b', fontSize: '1.2rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>Sonuçlar ve Fikstür 2. Yarı</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* 📱 9 SEKMELİ YENİ MENÜ DÜZENİ */}
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
  {/* 1. Satır: 4 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Eksik Listesi</Link>
    <Link href="/haftanin-yildizlari" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #fbcfe8', backgroundColor: '#fdf2f8', color: '#db2777', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>En İyiler</Link>
    <Link href="/haftanin-analizi" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ddd6fe', backgroundColor: '#f5f3ff', color: '#7c3aed', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Tüyolar</Link>
    <Link href="/puan-durumu" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Puan Durumu</Link>
  </div>
  {/* 2. Satır: 3 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/kralliklar" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Gol & Asist</Link>
    <Link href="/form-durumu" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Form Durumu</Link>
    <Link href="/ic-dis-saha" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>İç-Dış Saha Form</Link>
  </div>
  {/* 3. Satır: 2 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Link href="/fikstur-ilk-yari" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #a7f3d0', backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Fikstür 1. Yarı</Link>
    <Link href="/fikstur-ikinci-yari" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #0f172a', backgroundColor: '#0f172a', color: '#fff', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>Fikstür 2. Yarı</Link>
  </div>
</div>


        {renderRek('buyuk')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHafta(h))}
        </div>

        {renderRek('buyuk')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(9).map((h) => renderHafta(h))}
        </div>
        {renderRek('ince')}
      </div>
    </div>
  );
}
