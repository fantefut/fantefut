'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// TFF Resmi Planlama Takvimine göre yaklaşık hafta başlangıç tarihleri
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
  "10. Hafta": "30 Eki-02 Kas",
  "11. Hafta": "06-09 Kasım",
  "12. Hafta": "20-23 Kasım",
  "13. Hafta": "27-30 Kasım",
  "14. Hafta": "04-07 Aralık",
  "15. Hafta": "11-14 Aralık",
  "16. Hafta": "18-21 Aralık",
  "17. Hafta": "15-18 Ocak"
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
        <Navbar aktifSayfa="fikstur1" />
        
        {/* 💰 1. ÜST BÜYÜK REKLAM ALANI - REFERANS MİTMETRİK EŞİTLİK KURALI MİRAS ALINDI */}
        {renderReklamAlani()}
        
        {/* 🎯 SEO & ADASENSE DOSTU ORTAK H1 ANA BAŞLIK:
            Reklam alanından 16px aşağı kaçarak parmak tıklama güvenliği sağlandı.
            İçerik düzenini korumak adına boyutu 1.00rem olarak optimize edildi. */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig 1. Yarı Fikstürü ve Haftalık Maç Programı
          </h1>
        </div>

        {/* 🔄 AKILLI MOBİL GEÇİŞ KÖPRÜSÜ (Alt Sekme Kırılımı):
            Mobilde ve ileride üst menü daraldığında Fikstür 2. Yarı sayfasına kesintisiz 
            erişim sağlar. Bu sayfada 1. Yarı aktif/renkli olarak işaretlenmiştir. */}
        <div className="flex lg:hidden justify-center gap-2 mb-4">
          <Link href="/fikstur-ilk-yari" style={{
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
            1. Yarı
          </Link>
          <Link href="/fikstur-ikinci-yari" style={{
            fontSize: '11px',
            fontFamily: ICERIK_FONTU,
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            color: '#9d174d',
            fontWeight: '500',
            textDecoration: 'none',
            border: '1px solid #fce7f3'
          }}>
            2. Yarı
          </Link>
        </div>
        
        {/* 📅 HAFTALIK GRID YAPISI - İLK GRUP (1-9. HAFTALAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {hIsimleri.slice(0, 9).map((h) => renderHalta(h))}
        </div>
        
        {/* 💰 2. ORTA BÜYÜK REKLAM ALANI - REFERANS DEĞERE (`margin: '20px auto'`) EŞİTLENDİ */}
        {renderReklamAlani()}
        
        {/* 📅 HAFTALIK GRID YAPISI - İKİNCİ GRUP (10-17. HAFTALAR) */}
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
