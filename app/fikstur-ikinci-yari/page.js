'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

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

  // 🎯 RESPONSIVE REKLAM MOTORU: Referans koda ve AdSense standartlarına tam eşitlendi
  const renderReklamAlani = () => {
    return (
      <div style={{
        width: '100%',
        minHeight: '90px',
        maxHeight: '280px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontSize: '11px',
        fontStyle: 'italic',
        margin: '20px auto', // 🎯 REFERANS MİTMETRİK EŞİTLİK DEĞERİ
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          - Reklam Alanı (Google AdSense) -
        </span>
      </div>
    );
  };

  const renderHalta = (h) => (
    <div key={h} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      {/* 📅 HAFTA BAŞLIĞI VE TARİH KÖPRÜSÜ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
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
      
      {/* 🌟 TS derleme hatasını engellemek için boş string kuralı uygulandı */}
      <Header altBaslik="" />
      {/* 
        Tailwind v4 tabanlı responsive genişletme sarmalayıcısı:
        - Mobilde max-w-[650px] sınırıyla eski dar ve güvenli yapıyı korur (tek sütun halinde iner).
        - Masaüstünde (lg:) max-w-[1024px] seviyesine açılarak reklamları ve 3'lü haftalık kartları yana esnetir.
      */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak Navbar Bileşeni */}
        <Navbar aktifSayfa="fikstur2" />
        
        {/* 💰 1. ÜST BÜYÜK REKLAM ALANI - REFERANS MİTMETRİK EŞİTLİK KURALI MİRAS ALINDI */}
        {renderReklamAlani()}
        
        {/* 🎯 SEO & ADASENSE DOSTU ORTAK H1 ANA BAŞLIK:
            Reklam alanından 16px aşağı kaçarak parmak tıklama güvenliği sağlandı.
            İçerik düzenini korumak adına boyutu 1.00rem olarak optimize edildi. */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig 2. Yarı Fikstür ve Maç Sonuçları
          </h1>
        </div>

        {/* 🔄 AKILLI MOBİL GEÇİŞ KÖPRÜSÜ (Alt Sekme Kırılımı):
            Mobilde ve ileride üst menü daraldığında Fikstür 1. Yarı sayfasına kesintisiz 
            erişim sağlar. Bu sayfada 2. Yarı aktif/renkli olarak işaretlenmiştir. */}
        <div className="flex lg:hidden justify-center gap-2 mb-4">
          <Link href="/fikstur-ilk-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#059669',
            fontWeight: '500',
            textDecoration: 'none',
            border: '1px solid #a7f3d0'
          }}>
            1. Yarı
          </Link>
          <Link href="/fikstur-ikinci-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#059669',
            color: '#ffffff',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #059669'
          }}>
            2. Yarı
          </Link>
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İLK GRUP (18-26. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHalta(h))}
        </div>
        
        {/* 💰 2. ORTA BÜYÜK REKLAM ALANI - REFERANS DEĞERE (`margin: '20px auto'`) EŞİTLENDİ */}
        {renderReklamAlani()}
        
        {/* 📅 HAFTALIK GRID YAPISI - İKİNCİ GRUP (27-34. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(9).map((h) => renderHalta(h))}
        </div>
        
        {/* 💰 3. EN ALT REKLAM ALANI - REKLAM METNİ STANDART `- Reklam Alanı (Google AdSense) -` OLARAK KİLİTLENDİ */}
        {renderReklamAlani()}

        {/* Central ve Sadeleştirilmiş Yeni Otomatik Footer Sistemi */}
        <Footer />
      </div>
    </div>
  );
}
