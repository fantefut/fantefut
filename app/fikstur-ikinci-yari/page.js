'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

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

export default function FiksturIkinciYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

  const renderRek = (tip) => (
    <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
      {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

  const renderHafta = (h) => (
    <div key={h} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#132444', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU }}>{h}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {formVerileri[h].map((m, i) => (
          <div key={i} style={{ fontSize: '0.88rem', color: '#334155', padding: '2px 0', borderBottom: i !== 8 ? '1px dashed #e2e8f0' : 'none' }}>{m}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🎨 MERKEZİ LOGO VE MARKA ALANI */}
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            fontStyle: 'italic', 
            color: '#132444', 
            fontFamily: BAŞLIK_FONTU, 
            margin: '0', 
            letterSpacing: '1px' 
          }}>
            FanteFut
          </h1>
        </Link>
        <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU, marginBottom: '4px' }}>
          Süper Lig Fantezi Futbol Rehberi
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni */}
        <Navbar aktifSayfa="fikstur2" />

        {/* 🚀 SEO ODAKLI SAYFA ANA BAŞLIĞI */}
        <div style={{ textAlign: 'center', margin: '25px 0 15px 0' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#132444', 
            fontFamily: BAŞLIK_FONTU,
            letterSpacing: '0.5px'
          }}>
            Süper Lig Fikstür ve Maç Sonuçları 2. Yarı
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px', fontStyle: 'italic' }}>
            Sezonun İkinci Yarısında Oynanacak Karşılaşmalar ve Program
          </p>
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
