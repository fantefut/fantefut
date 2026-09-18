'use client';
import { useState } from 'react';
import { Navbar, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';

const DATA = {
  "1. Hafta": ["Galatasaray 2-2 Çorum", "Kasımpaşa 1-1 Trabzon", "Konya 0-1 Rize", "Gaziantep 1-1 Alanya", "Gençlerbirliği 2-1 Fenerbahçe", "Başakşehir 2-0 Kocaeli", "Amed 3-0 Erzurum", "Beşiktaş 1-0 Eyüp", "Samsun 3-3 Göztepe"],
  "2. Hafta": ["Erzurum 0-4 Galatasaray", "Rize 0-2 Samsun", "Fenerbahçe 4-2 Konya", "Çorum 0-1 Kasımpaşa", "Eyüp 0-1 Gaziantep", "Trabzon 2-1 Başakşehir", "Alanya 1-0 Beşiktaş", "Göztepe 0-1 Gençlerbirliği", "Kocaeli 2-0 Amed"],
  "3. Hafta": ["Gençlerbirliği 1-1 Erzurum", "Gaziantep 1-2 Rize", "Galatasaray 3-2 Göztepe", "Konya 1-2 Kocaeli", "Eyüp 2-1 Alanya", "Başakşehir 1-1 Kasımpaşa", "Samsun 0-2 Fenerbahçe", "Amed 2-1 Trabzon", "Beşiktaş 6-2 Çorum"],
  "4. Hafta": ["Başakşehir 2-3 Galatasaray", "Erzurum 1-0 Konya", "Fenerbahçe 1-2 Beşiktaş", "Kocaeli 1-0 Samsun", "Çorum 3-0 Eyüp", "Trabzon 5-0 Gençlerbirliği", "Kasımpaşa 2-2 Amed", "Göztepe 2-4 Gaziantep", "Rize 0-1 Alanya"],
  "5. Hafta": ["Beşiktaş 3-0 Erzurum", "Samsun 1-5 Çorum", "Eyüp 0-2 Rize", "Alanya 2-2 Göztepe", "Konya 1-0 Trabzon", "Gençlerbirliği 1-2 Kasımpaşa", "Amed 5-0 Başakşehir", "Galatasaray 1-0 Kocaeli", "Gaziantep 0-0 Fenerbahçe"],
  "6. Hafta": ["Kasımpaşa-Konya", "Trabzon-Galatasaray", "Başakşehir-Gençlerbirliği", "Kocaeli-Gaziantep", "Çorum-Alanya", "Göztepe-Rize", "Fenerbahçe-Eyüp", "Amed-Beşiktaş", "Erzurum-Samsun"],
  "7. Hafta": ["Galatasaray-Kasımpaşa", "Gençlerbirliği-Amed", "Alanya-Erzurum", "Samsun-Trabzon", "Rize-Fenerbahçe", "Gaziantep-Çorum", "Konya-Başakşehir", "Beşiktaş-Kocaeli", "Eyüp-Göztepe"],
  "8. Hafta": ["Çorum-Rize", "Fenerbahçe-Alanya", "Erzurum-Eyüp", "Gençlerbirliği-Galatasaray", "Amed-Konya", "Kasımpaşa-Samsun", "Kocaeli-Göztepe", "Başakşehir-Gaziantep", "Trabzon-Beşiktaş"],
  "9. Hafta": ["Alanya-Kocaeli", "Samsun-Amed", "Eyüp-Kasımpaşa", "Gaziantep-Erzurum", "Göztepe-Çorum", "Konya-Gençlerbirliği", "Galatasaray-Fenerbahçe", "Rize-Trabzon", "Beşiktaş-Başakşehir"],
  "10. Hafta": ["Konya-Galatasaray", "Kocaeli-Rize", "Erzurum-Çorum", "Fenerbahçe-Göztepe", "Trabzon-Gaziantep", "Amed-Eyüp", "Samsun-Başakşehir", "Kasımpaşa-Beşiktaş", "Gençlerbirliği-Alanya"],
  "11. Hafta": ["Gaziantep-Kasımpaşa", "Galatasaray-Amed", "Göztepe-Başakşehir", "Samsun-Konya", "Eyüp-Kocaeli", "Beşiktaş-Gençlerbirliği", "Çorum-Fener", "Alanya-Trabzon", "Rize-Erzurum"],
  "12. Hafta": ["Amed-Rize", "Gençlerbirliği-Gaziantep", "Galatasaray-Samsun", "Kocaeli-Fenerbahçe", "Konya-Beşiktaş", "Trabzon-Eyüp", "Erzurum-Göztepe", "Kasımpaşa-Alanyaspor", "Başakşehir-Çorum"],
  "13. Hafta": ["Rize-Kasımpaşa", "Alanya-Konya", "Samsun-Gençlerbirliği", "Gaziantep-Amed", "Fenerbahçe-Erzurum", "Eyüp-Başakşehir", "Çorum-Kocaeli", "Beşiktaş-Galatasaray", "Göztepe-Trabzon"],
  "14. Hafta": ["Galatasaray-Rize", "Konya-Gaziantep", "Amed-Alanya", "Başakşehir-Fenerbahçe", "Beşiktaş-Samsun", "Gençlerbirliği-Eyüp", "Trabzon-Çorum", "Erzurum-Kocaeli", "Kasımpaşa-Göztepe"],
  "15. Hafta": ["Çorum-Amed", "Erzurum-Kasımpaşa", "Eyüp-Galatasaray", "Alanya-Samsun", "Fenerbahçe-Trabzon", "Göztepe-Konya", "Kocaeli-Gençlerbirliği", "Rize-Başakşehir", "Gaziantep-Beşiktaş"],
  "16. Hafta": ["Kasımpaşa-Fenerbahçe", "Amed-Göztepe", "Başakşehir-Erzurum", "Konya-Eyüp", "Galatasaray-Alanya", "Beşiktaş-Rize", "Gençlerbirliği-Çorum", "Samsun-Gaziantep", "Trabzon-Kocaeli"],
  "17. Hafta": ["Alanya-Başakşehir", "Fenerbahçe-Amed", "Kocaeli-Kasımpaşa", "Rize-Gençlerbirliği", "Gaziantep-Galatasaray", "Çorum-Konya", "Göztepe-Beşiktaş", "Erzurum-Trabzon", "Eyüp-Samsun"]
};

export default function FiksturIlkYariSayfasi() {
  const [formVerileri] = useState(DATA);
  const hIsimleri = Object.keys(formVerileri);

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
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU }}>Süper Lig</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="fikstur1" />

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
