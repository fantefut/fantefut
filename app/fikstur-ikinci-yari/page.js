'use client';
import { useState } from 'react';
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// TFF Resmi 2026-2027 İkinci Yarı Planlama Takvimine göre yaklaşık hafta başlangıç tarihleri
const HAFTA_TARIHLERI = {
  "18. Hafta": "22-25 Ocak",
  "19. Hafta": "29 Oca-01 Şub",
  "20. Hafta": "05-08 Şubat",
  "21. Hafta": "12-15 Şubat",
  "22. Hafta": "19-22 Şubat",
  "23. Hafta": "26 Şub-01 Mar",
  "24. Hafta": "05-08 Mart",
  "25. Hafta": "12-15 Mart",
  "26. Hafta": "19-22 Mart",
  "27. Hafta": "02-05 Nisan",
  "28. Hafta": "09-12 Nisan",
  "29. Hafta": "16-19 Nisan",
  "30. Hafta": "23-26 Nisan",
  "31. Hafta": "30 Nis-03 May",
  "32. Hafta": "07-10 Mayıs",
  "33. Hafta": "14-17 Mayıs",
  "34. Hafta": "21-23 Mayıs"
};

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

  // 🎯 YENİ RESPONSIVE REKLAM MOTORU: Mobil ve Laptop uyumlu esnek kapsayıcı
  const renderReklamAlani = (boyutTip) => {
    const isAltSerit = boyutTip === 'ince';
    return (
      <div style={{
        width: '100%',
        maxWidth: '728px', // Laptop ekranlarında devasa yayılmayı ve düzen bozulmasını önler
        minHeight: isAltSerit ? '50px' : '90px', // Reklam yüklenene kadar alan çökmesini engeller
        maxHeight: isAltSerit ? '100px' : '280px', // Mobilde kare/dikdörtgen reklamların taşmasını önler
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '15px auto', // Sayfada milimetrik ortalanması sağlandı
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
  const renderHafta = (h) => (
    <div key={h} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      {/* 📅 HAFTA BAŞLIĞI VE TARİH KÖPRÜSÜ */}
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
      <Header altBaslik="Süper Lig Fikstür ve Maç Sonuçları 2. Yarı" />
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="fikstur2" />
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHafta(h))}
        </div>
        {renderReklamAlani('buyuk')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(9).map((h) => renderHafta(h))}
        </div>
        {renderReklamAlani('ince')}
      </div>
    </div>
  );
}
