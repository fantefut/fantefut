'use client';
import { useState } from 'react';
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// TFF Resmi 2026-2027 Planlama Takvimine göre yaklaşık hafta başlangıç tarihleri
const HAFTA_TARIHLERI = {
  "1. Hafta": "14-17 Ağus",
  "2. Hafta": "21-24 Ağus",
  "3. Hafta": "28-31 Ağus",
  "4. Hafta": "04-07 Eylül",
  "5. Hafta": "11-14 Eylül",
  "6. Hafta": "18-21 Eylül",
  "7. Hafta": "09-12 Ekim",
  "8. Hafta": "16-19 Ekim",
  "9. Hafta": "23-26 Ekim",
  "10. Hafta": "30 Okt-02 Kas",
  "11. Hafta": "06-09 Kasım",
  "12. Hafta": "20-23 Kasım",
  "13. Hafta": "27-30 Kasım",
  "14. Hafta": "04-07 Aralık",
  "15. Hafta": "11-14 Aralık",
  "16. Hafta": "18-21 Aralık",
  "17. Hafta": "25-28 Aralık"
};

const DATA = {
  "1. Hafta": ["Galatasaray 2-2 Çorum", "Kasımpaşa 1-1 Trabzon", "Konya 0-1 Rize", "Gaziantep 1-1 Alanya", "Gençlerbirliği 2-1 Fenerbahçe", "Başakşehir 2-0 Kocaeli", "Amed 3-0 Erzurum", "Beşiktaş 1-0 Eyüp", "Samsun 3-3 Göztepe"],
  "2. Hafta": ["Erzurum 0-4 Galatasaray", "Rize 0-2 Samsun", "Fenerbahçe 4-2 Konya", "Çorum 0-1 Kasımpaşa", "Eyüp 0-1 Gaziantep", "Trabzon 2-1 Başakşehir", "Alanya 1-0 Beşiktaş", "Göztepe 0-1 Gençlerbirliği", "Kocaeli 2-0 Amed"],
  "3. Hafta": ["Gençlerbirliği 1-1 Erzurum", "Gaziantep 1-2 Rize", "Galatasaray 3-2 Göztepe", "Konya 1-2 Kocaeli", "Eyüp 2-1 Alanya", "Başakşehir 1-1 Kasımpaşa", "Samsun 0-2 Fenerbahçe", "Amed 2-1 Trabzon", "Beşiktaş 6-2 Çorum"],
  "4. Hafta": ["Başakşehir 2-3 Galatasaray", "Erzurum 1-0 Konya", "Fenerbahçe 1-2 Beşiktaş", "Kocaeli 1-0 Samsun", "Çorum 3-0 Eyüp", "Trabzon 5-0 Gençlerbirliği", "Kasımpaşa 2-2 Amed", "Göztepe 2-4 Gaziantep", "Rize 0-1 Alanya"],
  "5. Hafta": ["Beşiktaş 3-0 Erzurum", "Samsun 1-5 Çorum", "Eyüp 0-2 Rize", "Alanya 2-2 Göztepe", "Konya 1-0 Trabzon", "Gençlerbirliği 1-2 Kasımpaşa", "Amed 5-0 Başakşehir", "Galatasaray 1-0 Kocaeli", "Gaziantep 0-0 Fenerbahçe"],
  "6. Hafta": ["Kasımpaşa 0-0 Konya", "Trabzon 4-0 Galatasaray", "Başakşehir 4-0 Gençlerbirliği", "Kocaeli 2-0 Gaziantep", "Çorum 1-2 Alanya", "Göztepe 2-2 Rize", "Fenerbahçe 8-0 Eyüp", "Amed 3-2 Beşiktaş", "Erzurum 1-0 Samsun"],
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
    <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '15px 0' }}>
      {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

  const renderHafta = (h) => (
    <div key={h} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      {/* 📅 HAFTA BAŞLIĞI VE TARİH KÖPRÜSÜ (PALATINO ETKİLİ) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px' }}>
        <h3 style={{ margin: '0', color: '#132444', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>
          {h}
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 'bold', fontFamily: ICERIK_FONTU, backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
          🗓️ {HAFTA_TARIHLERI[h] || ""}
        </span>
      </div>
      {/* ⚽ BÜYÜTÜLMÜŞ MAÇ/TAKIM SATIRLARI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {formVerileri[h].map((m, i) => (
          <div key={i} style={{ fontSize: '0.96rem', fontWeight: '500', color: '#1e293b', padding: '3px 0', borderBottom: i !== 8 ? '1px dashed #f1f5f9' : 'none', fontFamily: ICERIK_FONTU, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {m}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="Süper Lig Fikstür ve Maç Sonuçları 1. Yarı" />
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
